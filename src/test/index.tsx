import React, { useState, useEffect, ChangeEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { TagsInput } from "react-tag-input-component";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { InputFormSelectLocation } from "../components/inputForm";

const Test: React.FC = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<any>(null);
  const uid = auth.currentUser?.uid;
  const db = getFirestore();

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const [skills, setSkills] = useState<string[]>([]);
  const skillsCollection = collection(db, "skills");
  const [isActive, setIsActive] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aboutText, setAboutText] = useState("");

  const [imgURL, setImgURL] = useState("");
  const [progressPorcent, setPorgessPorcent] = useState(0);

  const [coverURL, setCoverURL] = useState("");
  const [progressPorcentCover, setPorgessPorcentCover] = useState(0);
  const [utolaCode, setUtolaCode] = useState("");
  const [introductionVideoURL, setIntroductionVideoURL] = useState("");

  type Certification = {
    title: string;
    description: string;
    date: string;
    pdfURL: string;
  };

  const [certifications, setCertifications] = useState<Certification[]>([]);

  const [certificationTitle, setCertificationTitle] = useState("");
  const [certificationDescription, setCertificationDescription] = useState("");
  const [certificationDate, setCertificationDate] = useState("");
  const [certificationPdfURL, setCertificationPdfURL] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      if (uid) {
        try {
          const userDoc = doc(db, "users", uid);
          const docSnapshot = await getDoc(userDoc);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            console.log("Dados do usuário:", userData);
            setUserData(userData);
            setIsActive(userData.isActive);
          } else {
            console.log('Usuário não encontrado na coleção "users"');
          }
        } catch (error) {
          console.error("Erro ao obter dados do usuário:", error);
        }
      }
    };

    getUserData();
  }, [uid, db]);

  const handleDisplayNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
          displayName: displayName,
        });
        console.log("Display Name updated successfully!");
      }
    } catch (error) {
      console.error("Error updating Display Name:", error);
    }
  };

  const handlePhotoURLUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
          photoURL: photoURL,
        });
        console.log("Photo URL updated successfully!");
      }
    } catch (error) {
      console.error("Error updating Photo URL:", error);
    }
  };

  const handleSkillChange = async (tags: string[]) => {
    const newSkills = tags.filter((tag) => !skills.includes(tag));

    if (newSkills.length === 0) {
      return; // Skip the query if there are no new skill names
    }

    try {
      const skillQuery = query(
        skillsCollection,
        where("name", "in", newSkills)
      );
      const querySnapshot = await getDocs(skillQuery);
      const existingSkills = querySnapshot.docs.map((doc) => doc.data().name);

      setSkills((prevSkills) => [...prevSkills, ...existingSkills]);
    } catch (error) {
      console.error("Error retrieving skills:", error);
    }
  };

  const handleSkillRemove = (tag: string) => {
    const updatedSkills = skills.filter((skill) => skill !== tag);
    setSkills(updatedSkills);
  };

  const handleSkillsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
          skills: skills,
        });
        console.log("Photo URL and Skills updated successfully!");
      }
    } catch (error) {
      console.error("Error updating Photo URL and Skills:", error);
    }
  };

  const handleSwitchChange = async () => {
    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
          isActive: !isActive,
        });
        setIsActive((prevIsActive) => !prevIsActive);
        console.log("isActive updated successfully!");
      }
    } catch (error) {
      console.error("Error updating isActive:", error);
    }
  };

  // const handleSubmitAvatar = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const fileInput = event.currentTarget.elements.namedItem(
  //     'fileInput'
  //   ) as HTMLInputElement | null;
  //   const file = fileInput?.files?.[0];
  //   if (!file) return;

  //   const storageRef = ref(storage, `images/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setPorgessPorcent(progress);
  //     },
  //     (error) => {
  //       alert(error);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setImgURL(downloadURL);
  //       });
  //     }
  //   );
  // };

  const handleSubmitAvatar = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const fileInput = event.currentTarget.elements.namedItem(
      "fileInput"
    ) as HTMLInputElement | null;
    const file = fileInput?.files?.[0];
    if (!file) return;

    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPorgessPorcent(progress);
        },
        (error) => {
          alert(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Atualiza o campo "photoURL" do usuário na coleção "users"
            if (uid) {
              const userDocRef = doc(db, "users", uid);
              await updateDoc(userDocRef, { photoURL: downloadURL });

              setImgURL(downloadURL);
              console.log("Photo URL updated successfully!");
            }
          } catch (error) {
            console.error("Error updating Photo URL:", error);
          }
        }
      );
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
  };
  const handleSubmitcover = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fileInput = event.currentTarget.elements.namedItem(
      "fileInputCover"
    ) as HTMLInputElement | null;
    const file = fileInput?.files?.[0];
    if (!file) return;

    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPorgessPorcentCover(progress);
        },
        (error) => {
          alert(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Atualiza o campo "coverPhotoURL" do usuário na coleção "users"
            if (uid) {
              const userDocRef = doc(db, "users", uid);
              await updateDoc(userDocRef, { coverPhotoURL: downloadURL });

              setCoverURL(downloadURL);
              console.log("Photo URL updated successfully!");
            }
          } catch (error) {
            console.error("Error updating Photo URL:", error);
          }
        }
      );
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
  };

  const handlePhoneNumberUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
          phoneNumber: phoneNumber,
        });
        console.log("Phone Number updated successfully!");
      }
    } catch (error) {
      console.error("Error updating Phone Number:", error);
    }
  };

  const handleUtolaCodeUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
          utolaCode: utolaCode,
        });
        console.log("Utola Code updated successfully!");
      }
    } catch (error) {
      console.error("Error updating Utola Code:", error);
    }
  };

  const handleIntroductionVideoURLUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
          introductionVideoURL: introductionVideoURL,
        });
        console.log("Introduction Video URL updated successfully!");
      }
    } catch (error) {
      console.error("Error updating Introduction Video URL:", error);
    }
  };

  const handleAddCertification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        const newCertification = {
          title: certificationTitle,
          description: certificationDescription,
          date: certificationDate,
          pdfURL: certificationPdfURL,
        };
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const updatedCertifications = [
            ...(userData?.certifications || []),
            newCertification,
          ];
          await updateDoc(userDocRef, {
            certifications: updatedCertifications,
          });
          console.log("Certification added successfully!");
          resetCertificationForm();
        }
      }
    } catch (error) {
      console.error("Error adding certification:", error);
    }
  };

  const handleDeleteCertification = async (index: number) => {
    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const updatedCertifications = [...(userData?.certifications || [])];
          updatedCertifications.splice(index, 1);

          await updateDoc(userDocRef, {
            certifications: updatedCertifications,
          });
          console.log("Certification deleted successfully!");
        }
      }
    } catch (error) {
      console.error("Error deleting certification:", error);
    }
  };

  const resetCertificationForm = () => {
    setCertificationTitle("");
    setCertificationDescription("");
    setCertificationDate("");
    setCertificationPdfURL("");
  };

  const handleAboutUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
          about: aboutText,
        });
        console.log("About updated successfully!");
      }
    } catch (error) {
      console.error("Error updating About:", error);
    }
  };

  interface SelectLocation {
    selectedMunicipio: any;
    selectedProvincia: any;
  }

  interface Provincia {
    nome: any;
    municipios: any[];
  }
  const provincias: Provincia[] = [
    {
      nome: "Bengo",
      municipios: [
        "Ambriz",
        "Bula Atumba",
        "Dande",
        "Dembos",
        "Nambuangongo",
        "Pango Aluquém",
      ],
    },
    {
      nome: "Benguela",
      municipios: [
        "Baía Farta",
        "Balombo",
        "Benguela",
        "Bocoio",
        "Caimbambo",
        "Catumbela",
        "Chongoroi",
        "Cubal",
        "Ganda",
        "Lobito",
      ],
    },
    {
      nome: "Bié",
      municipios: [
        "Andulo",
        "Bailundo",
        "Camacupa",
        "Catabola",
        "Chinguar",
        "Chitembo",
        "Cuemba",
        "Cunhinga",
        "Cuito",
        "Nharea",
        "Nhârea",
      ],
    },
    {
      nome: "Cabinda",
      municipios: ["Belize", "Buco-Zau", "Cabinda", "Cacongo"],
    },
    {
      nome: "Cuando Cubango",
      municipios: [
        "Calai",
        "Cuangar",
        "Cuchi",
        "Cuito Cuanavale",
        "Dirico",
        "Longa",
        "Mavinga",
        "Menongue",
        "Nancova",
        "Rivungo",
      ],
    },
    {
      nome: "Cuanza Norte",
      municipios: [
        "Ambaca",
        "Bolongongo",
        "Cambambe",
        "Cazengo",
        "Golungo Alto",
        "Gonguembo",
        "Lucala",
        "Quiculungo",
        "Samba Cajú",
      ],
    },
    {
      nome: "Cuanza Sul",
      municipios: [
        "Amboim",
        "Cela",
        "Conda",
        "Ebo",
        "Libolo",
        "Mussende",
        "Porto Amboim",
        "Quibala",
        "Quilenda",
        "Seles",
      ],
    },
    {
      nome: "Cunene",
      municipios: [
        "Cahama",
        "Curoca",
        "Cuanhama",
        "Cuvelai",
        "Namacunde",
        "Ombadja",
      ],
    },
    {
      nome: "Huambo",
      municipios: [
        "Bailundo",
        "Cachiungo",
        "Caála",
        "Chicala-Cholohanga",
        "Chinhama",
        "Ecunha",
        "Huambo",
        "Londuimbali",
        "Longonjo",
        "Mungo",
        "Tchicala-Tcholohanga",
        "Ukuma",
      ],
    },
    {
      nome: "Huíla",
      municipios: [
        "Caconda",
        "Cacula",
        "Caluquembe",
        "Chibia",
        "Chicomba",
        "Chipindo",
        "Cuvango",
        "Gambos",
        "Humpata",
        "Jamba",
        "Lubango",
        "Matala",
        "Quilengues",
      ],
    },
    {
      nome: "Luanda",
      municipios: [
        "Belas",
        "Cacuaco",
        "Cazenga",
        "Icolo e Bengo",
        "Quiçama",
        "Luanda",
        "Talatona",
        "Viana",
      ],
    },
    {
      nome: "Lunda Norte",
      municipios: [
        "Cambulo",
        "Capenda Camulemba",
        "Caungula",
        "Chitato",
        "Cuango",
        "Cuílo",
        "Lubalo",
        "Lucapa",
        "Xá-Muteba",
      ],
    },
    {
      nome: "Lunda Sul",
      municipios: ["Cacolo", "Dala", "Muconda", "Saurimo"],
    },
    {
      nome: "Malanje",
      municipios: [
        "Calandula",
        "Cambundi-Catembo",
        "Cangandala",
        "Caombo",
        "Cunda-Dia-Baze",
        "Luquembo",
        "Malanje",
        "Marimba",
        "Massango",
        "Mucari",
        "Quela",
      ],
    },
    {
      nome: "Moxico",
      municipios: [
        "Alto Zambeze",
        "Bundas",
        "Cameia",
        "Camanongue",
        "Léua",
        "Luacano",
        "Luau",
        "Luchazes",
        "Luena",
        "Luimbale",
        "Lutembo",
      ],
    },
    {
      nome: "Namibe",
      municipios: ["Bibala", "Camucuio", "Moçâmedes", "Tômbwa", "Virei"],
    },
    {
      nome: "Uíge",
      municipios: [
        "Ambuila",
        "Bembe",
        "Buengas",
        "Bungo",
        "Damba",
        "Maquela do Zombo",
        "Mucaba",
        "Negage",
        "Puri",
        "Quitexe",
        "Quimbele",
        "Sanza Pombo",
        "Songo",
        "Uíge",
        "Zombo",
      ],
    },
    {
      nome: "Zaire",
      municipios: [
        "Cuimba",
        "M'banza Congo",
        "N'zeto",
        "Noqui",
        "Soyo",
        "Tomboco",
      ],
    },
  ];

  const [selectedProvincia, setSelectedProvincia] = useState<string>("");
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>("");

  const handleProvinciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvincia(e.target.value);
    setSelectedMunicipio("");
  };
  const handleMunicipioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMunicipio(e.target.value);
  };

  const handleLocationUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
          location: {
            selectedProvincia,
            selectedMunicipio,
          },
        });
        console.log("Location updated successfully!");
      }
    } catch (error) {
      console.error("Error updating Location:", error);
    }
  };

  return (
    <div>
      <img src={userData?.photoURL || null} alt="" width={200}/>
      <video src={userData?.introductionVideoURL || null} controls />
      <form onSubmit={handleDisplayNameUpdate}>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
        />
        <button type="submit">Update Display Name</button>
      </form>
      <form onSubmit={handleAboutUpdate}>
        <textarea
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          placeholder="About"
        />
        <button type="submit">Update About</button>
      </form>
      <form onSubmit={handleSkillsUpdate}>
        <TagsInput
          value={skills}
          onChange={handleSkillChange}
          onRemoved={handleSkillRemove}
          name="skills"
          placeHolder="Enter skills"
        />
        <div className="mt-2">
          {skills.map((skill, index) => (
            <span key={index} className="me-3">
              {skill}
            </span>
          ))}
        </div>
        <button type="submit">Update Skills</button>
      </form>
      <form>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={isActive}
            onChange={handleSwitchChange}
          />
          <label className="form-check-label">Sim ativo</label>
        </div>
      </form>
      <div>
        <form onSubmit={handleSubmitAvatar} encType="multipart/form-data">
          <input type="file" name="fileInput" />
          <button type="submit">Enviar</button>
        </form>

        {!imgURL && <p>{progressPorcent}%</p>}
      </div>
      <div>
        <form onSubmit={handleSubmitcover} encType="multipart/form-data">
          <input type="file" name="fileInputCover" />
          <button type="submit">Enviar</button>
        </form>

        {!coverURL && <p>{progressPorcentCover}%</p>}
      </div>
      <form onSubmit={handlePhoneNumberUpdate}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
        />
        <button type="submit">Update Phone Number</button>
      </form>
      <form onSubmit={handleUtolaCodeUpdate}>
        <input
          type="text"
          value={utolaCode}
          onChange={(e) => setUtolaCode(e.target.value)}
          placeholder="Utola Code"
        />
        <button type="submit">Update Utola Code</button>
      </form>
      <form onSubmit={handleIntroductionVideoURLUpdate}>
        <input
          type="text"
          value={introductionVideoURL}
          onChange={(e) => setIntroductionVideoURL(e.target.value)}
          placeholder="Introduction Video URL"
        />
        <button type="submit">Update Introduction Video URL</button>
      </form>
      <form onSubmit={handleAddCertification}>
        <input
          type="text"
          value={certificationTitle}
          onChange={(e) => setCertificationTitle(e.target.value)}
          placeholder="Certification Title"
        />
        <input
          type="text"
          value={certificationDescription}
          onChange={(e) => setCertificationDescription(e.target.value)}
          placeholder="Certification Description"
        />
        <input
          type="text"
          value={certificationDate}
          onChange={(e) => setCertificationDate(e.target.value)}
          placeholder="Certification Date"
        />
        <input
          type="text"
          value={certificationPdfURL}
          onChange={(e) => setCertificationPdfURL(e.target.value)}
          placeholder="Certification PDF URL"
        />
        <button type="submit">Add Certification</button>
      </form>
      <div>
        <h1>Certifications</h1>
        {userData?.certifications?.map(
          (certification: Certification, index: number) => (
            <div key={index}>
              <h3>{certification.title}</h3>
              <p>{certification.description}</p>
              <p>{certification.date}</p>
              <iframe src="https://drive.google.com/file/d/1X_LZL2vTEg6psuSKDCMEYYBSIENKOYh7/preview"></iframe>

              <a
                href={certification.pdfURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View PDF
              </a>
              <button onClick={() => handleDeleteCertification(index)}>
                Delete
              </button>
            </div>
          )
        )}
      </div>
      <form onSubmit={handleLocationUpdate} className="mb-5 mt-5">
        <h3>Provincia: {selectedProvincia}</h3>
        <select value={selectedProvincia} onChange={handleProvinciaChange}>
          <option value="">Selecione uma província</option>
          {provincias.map((provincia, index) => (
            <option key={index} value={provincia.nome}>
              {provincia.nome}
            </option>
          ))}
        </select>
        <h3>Município:{selectedMunicipio}</h3>
        <select value={selectedMunicipio} onChange={handleMunicipioChange}>
          <option value="">Selecione um município</option>
          {provincias
            .find((provincia) => provincia.nome === selectedProvincia)
            ?.municipios.map((municipio, index) => (
              <option key={index} value={municipio}>
                {municipio}
              </option>
            ))}
        </select>
        <button type="submit">Update Location</button>
      </form>
    </div>
  );
};

export default Test;
