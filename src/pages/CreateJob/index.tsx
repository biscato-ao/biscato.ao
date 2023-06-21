import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import firebaseConfig from "../../key";
import { Post } from "../../interface";
import { Menu } from "../../components/menu";
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
import "./style.scss";

const CreateJob: React.FC = () => {
  const [selected, setSelected] = useState([]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const postsCollection = collection(db, "requests");
  const skillsCollection = collection(db, "skills");

  const [newPostData, setNewPostData] = useState<Post>({
    id: "",
    title: "",
    description: "",
    user_id: "",
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
      const docRef = await addDoc(postsCollection, postData);
      console.log("Post adicionado com sucesso! ID do documento:", docRef.id);
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
    // addPost(newPostData);
    console.log(newPostData);
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
  return (
    <main className="createJob">
      <Menu />
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 pt-3">
            {/* {currentStep + 1} de {steps.length} */}
            <form onSubmit={handleSubmit}>
              <div className="container">
                <h4 className="mb-5">
                  <b>Formulário de Cadastro de Trabalho</b>
                </h4>
                {steps[currentStep].id === "PERSONAL" && (
                  <div className="row">
                    <div className="col-12 mb-4">
                      <InputForm
                        type={"text"}
                        placeholder={"..."}
                        icon={<HiOutlineLightningBolt />}
                        value={undefined}
                        onChange={undefined}
                        rows={0}
                        title={"Titulo do trabalho"}
                      />
                    </div>
                    <div className="col-12 mb-4 mt-3">
                      <InputFormTextArea
                        type={"text"}
                        placeholder={"..."}
                        icon={<HiOutlineNewspaper />}
                        value={undefined}
                        onChange={undefined}
                        rows={5}
                        title={"Descrição do trabalho"}
                      />
                    </div>
                    <div className="col-6 mb-4 mt-3">
                      <InputForm
                        type={"time"}
                        placeholder={"..."}
                        icon={<HiOutlineClock />}
                        value={undefined}
                        onChange={undefined}
                        rows={0}
                        title={"Hora"}
                      />
                    </div>
                    <div className="col-6 mb-4 mt-3">
                      <InputForm
                        type={"date"}
                        placeholder={"..."}
                        icon={<HiOutlineCalendar />}
                        value={undefined}
                        onChange={undefined}
                        rows={0}
                        title={"Dia"}
                      />
                    </div>
                  </div>
                )}
                {steps[currentStep].id === "SHIPPING" && (
                  <div className="row">
                    <div className="col-12 mb-4">
                      <InputForm
                        type={"text"}
                        placeholder={"..."}
                        icon={<HiOutlineLocationMarker />}
                        value={undefined}
                        onChange={undefined}
                        rows={0}
                        title={"Localização do trabalho"}
                      />
                    </div>
                    <div className="col-12 mb-4 mt-3">
                      <InputForm
                        type={"text"}
                        placeholder={"..."}
                        icon={<HiOutlineHand />}
                        value={undefined}
                        onChange={undefined}
                        rows={5}
                        title={"Quanto pretendo pagar"}
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

                <div className="row">
                  <div className="col-12 mt-3 d-flex justify-content-between">
                    <div className="mt-2">
                      <b>
                        {currentStep + 1} de {steps.length}
                      </b>
                    </div>
                    <div>
                      <button className="btn">Cancelar</button>
                      {currentStep < steps.length - 1 && (
                        <button
                          className="btn button-btn"
                          type="button"
                          onClick={handleNext}
                        >
                          Next
                        </button>
                      )}
                      {currentStep === steps.length - 1 && (
                        <button className="btn button-submit">Postar</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateJob;
