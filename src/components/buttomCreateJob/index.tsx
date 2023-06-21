import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { auth } from "../../services/firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  getDocs,
  where,
  getFirestore,
} from "firebase/firestore";
import firebaseConfig from "../../key";
import { Post } from "../../interface";
import { TagsInput } from "react-tag-input-component";
import { InputForm, InputFormTextArea } from "../../components/inputForm";
import {
  HiOutlineLightningBolt,
  HiOutlineNewspaper,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineHand,
} from "react-icons/hi";
import logo from "./../../asset/vector/logo.svg";
import "./style.scss";
import { useAuthState } from "react-firebase-hooks/auth";

export const ButtomCreateJob: React.FC = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const db = getFirestore();
  const uid = auth.currentUser?.uid;
  const [selected, setSelected] = useState([]);
  const [user] = useAuthState(auth);
  const app = initializeApp(firebaseConfig);
  const postsCollection = collection(db, "requests");
  const skillsCollection = collection(db, "skills");

  const [newPostData, setNewPostData] = useState<Post>({
    completedBy: false,
    id: "",
    title: "", 
    description: "",
    user_id: user?.uid,
    date: "",
    time: "",
    location: "",
    value: 0,
    skill: [],
    publish_date: new Date().toLocaleDateString(),
    publish_time: new Date().toLocaleTimeString(),
  });

  const addPost = async (postData: Post) => {
    try {
      if (user?.uid) {
        postData.user_id = user.uid;
        const docRef = await addDoc(postsCollection, postData);
        console.log("Post adicionado com sucesso! ID do documento:", docRef.id);
      } else {
        console.error("Erro ao adicionar o post: user_id é undefined");
      }
    } catch (error) {
      console.error("Erro ao adicionar o post:", error);
    }
  };

  const handleSkillChange = async (tags: string[]) => {
    const skillNames = tags.filter((tag) => !newPostData.skill.includes(tag));
    if (skillNames.length === 0) return; // Skip the query if there are no new skill names

    const skillQuery = query(skillsCollection, where("name", "in", skillNames));
    const querySnapshot = await getDocs(skillQuery);
    const skills = querySnapshot.docs.map((doc) => doc.data().name);

    setNewPostData((prevData) => ({
      ...prevData,
      skill: [...prevData.skill, ...skills],
    }));
  };

  const handleSkillRemove = (index: any) => {
    const updatedSelected = [...selected];
    updatedSelected.splice(index, 1);
    setSelected(updatedSelected);

    setNewPostData((prevData) => {
      const updatedSkill = [...prevData.skill];
      updatedSkill.splice(index, 1);
      return {
        ...prevData,
        skill: updatedSkill,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost(newPostData);
    // console.log(newPostData);
  };

  const [currentStep, setCurrentStep] = useState(0);
  function handleNext() {
    setCurrentStep((prevState) => prevState + 1);
  }

  const steps = [
    {
      id: "PERSONAL",
      title: "Dados pessoais",
    },
    {
      id: "SHIPPING",
      title: "Endereço de entrega",
    },
  ];

  const searchTooltip = (props: any) => (
    <Tooltip id="notification-tooltip" {...props}>
      Compartilhe seu trabalho com o mundo!
    </Tooltip>
  );

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

  return (
    <div className="buttomCreateJob">
      {userData?.isActive && (
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={searchTooltip}
        >
          <div className="div-btn position-absolute bottom-0 end-0">
            <button onClick={handleShow}>
              <img src={logo} alt="" className="img-fluid" />
            </button>
          </div>
        </OverlayTrigger>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="border-0"
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton className="border-0 pt-4">
            <h5 className="ms-2">
              <b>Formulário de Cadastro de Trabalho</b>
            </h5>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              {steps[currentStep].id === "PERSONAL" && (
                <div className="row">
                  <div className="col-12 mb-4">
                    <InputForm
                      type="text"
                      placeholder="..."
                      icon={<HiOutlineLightningBolt />}
                      value={undefined}
                      onChange={undefined}
                      rows={0}
                      title="Titulo do trabalho"
                    />
                  </div>
                  <div className="col-12 mb-4 mt-3">
                    <InputFormTextArea
                      type="text"
                      placeholder="..."
                      icon={<HiOutlineNewspaper />}
                      value={undefined}
                      onChange={undefined}
                      rows={5}
                      title="Descrição do trabalho"
                    />
                  </div>
                  <div className="col-6 mb-4 mt-3">
                    <InputForm
                      type="time"
                      placeholder="..."
                      icon={<HiOutlineClock />}
                      value={undefined}
                      onChange={undefined}
                      rows={0}
                      title="Hora"
                    />
                  </div>
                  <div className="col-6 mb-4 mt-3">
                    <InputForm
                      type="date"
                      placeholder="..."
                      icon={<HiOutlineCalendar />}
                      value={undefined}
                      onChange={undefined}
                      rows={0}
                      title="Dia"
                    />
                  </div>
                </div>
              )}
              {steps[currentStep].id === "SHIPPING" && (
                <div className="row">
                  <div className="col-12 mb-4">
                    <InputForm
                      type="text"
                      placeholder="..."
                      icon={<HiOutlineLocationMarker />}
                      value={undefined}
                      onChange={undefined}
                      rows={0}
                      title="Localização do trabalho"
                    />
                  </div>
                  <div className="col-12 mb-4 mt-3">
                    <InputForm
                      type="text"
                      placeholder="..."
                      icon={<HiOutlineHand />}
                      value={undefined}
                      onChange={undefined}
                      rows={5}
                      title="Quanto pretendo pagar"
                    />
                  </div>
                  <div className="col-12 mb-4 mt-1">
                    <label htmlFor="">Habilidades </label>
                    <TagsInput
                      value={selected}
                      onChange={handleSkillChange}
                      onRemoved={handleSkillRemove}
                      name="skills"
                      placeHolder="Enter skills"
                    />
                    {/* Render the selected skills */}
                    {newPostData.skill.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </Modal.Body>
          <Modal.Footer className="border-top">
            <button className="btn">Cancelar</button>
            {currentStep < steps.length - 1 && (
              <button
                className="btn button-btn"
                type="button"
                onClick={handleNext} 
              >
                Próximo
              </button>
            )}
            {currentStep === steps.length - 1 && (
              <button className="btn button-submit">Enviar</button>
            )}
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};
