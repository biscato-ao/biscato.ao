import React, { useState } from "react";
import logo from "./../../asset/vector/logo.svg";
import "./style.scss";
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import { Google } from "../../components/Google";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PageLoader } from "../../components/pageLoader";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../key";
import { UserInfo } from "../../interface";

const Register: React.FC = () => {
  // const [phone, setPhone] = useState('');
  // const handlePhoneChange = (event: { target: { value: any; }; }) => {
  //   const { value } = event.target;
  //   if (value.length <= 9) {
  //     setPhone(value);
  //   }
  // };
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Ir para a página inicial
    </Tooltip>
  );
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLocal = localStorage.getItem("user");

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const usersCollection = collection(db, "users");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleRegister = async () => {
    if (auth.currentUser) {
      navigate("/dashboard");
      const newUserData: UserInfo = {
        uid: auth.currentUser.uid,
        displayName: "",
        email: auth.currentUser.email,
        phoneNumber: null,
        photoURL: null,
        providerId: "",
        skills: [],
        status: "",
        location: "",
        utolaCode: "",
        verified: false,
        about: "",
        username: "",
        clients: [],
        coverPhotoURL: null,
        isActive: false,
      };

      try {
        // Crie um documento com o UID do usuário e defina os dados
        const userDocRef = doc(collection(db, "users"), auth.currentUser.uid);
        await setDoc(userDocRef, newUserData);

        console.log(
          "Dados do usuário adicionados com sucesso:",
          auth.currentUser.uid
        );
      } catch (error) {
        console.error("Erro ao adicionar dados do usuário:", error);
      }
    }
  };

  handleRegister();
  // if (auth.currentUser) {
  //   navigate('/dashboard');
  //   const newUserData: UserInfo = {
  //     uid: auth.currentUser?.uid,
  //     displayName: '',
  //     email: auth.currentUser?.email,
  //     phoneNumber: null,
  //     photoURL: null,
  //     providerId: '',
  //     skills: [],
  //     status: '',
  //     location: '',
  //     utolaCode: '',
  //     verified: false,
  //     about: '',
  //     username: '',
  //     clients: [],
  //     coverPhotoURL: null,
  //     isActive: false
  //   };

  //   try {
  //     const docRef = await addDoc(usersCollection, newUserData);
  //     console.log("Dados do usuário adicionados com sucesso:", docRef.id);
  //   } catch (error) {
  //     console.error("Erro ao adicionar dados do usuário:", error);
  //   }
  // }

  if (error) {
    toast.error("Erro ao cadastrar. Por favor, tente novamente.");
  }
  if (loading) {
    toast.info("Realizando cadastro...");
  }
  if (user) {
    toast.success("Cadastro realizado com sucesso!");
    localStorage.setItem("users", JSON.stringify(user.user.uid));
    navigate("/");
  }
  if (userLocal !== null) {
    window.location.href = "/dashboard";
    return <PageLoader />;
  }
  return (
    <>
      <section className="p-4 pb-5 d-flex justify-content-center align-items-center">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-3">
                <div className="text-img text-center mt-5 pb-4">
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <Link to="/dashboard">
                      <img src={logo} alt="" className="mb-3" />
                    </Link>
                  </OverlayTrigger>
                  <h4>Criar conta no Biscato</h4>
                </div>
                {/* <div className='input-group border mb-3'>
              <span className='input-group-text'>
                <HiOutlinePhone/>
              </span>
              <input type="number" className='form-control' name="" id="" value={phone} onChange={handlePhoneChange} placeholder='Número de celular'/>
            </div>
            <div className="text-border mb-3 mt-3 d-flex justify-content-center">
              <span className="text">ou</span>
            </div> */}
                {/* <div className='input-group border mb-3'>
              <span className='input-group-text'>
                <HiOutlineUser/>
              </span>
              <input type="text" className='form-control' name="" id="" placeholder='Nome completo'/>
            </div> */}
                <div className="input-group border mb-3">
                  <span className="input-group-text">
                    <HiOutlineUser />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>

                <div className="input-group border mb-3">
                  <span className="input-group-text">
                    <HiOutlineLockClosed />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                  />
                </div>
                <div className="text-termo">
                  Ao criar uma conta no biscato, você está concordando com os
                  nossos{" "}
                  <Link to="/" className="a-link">
                    termos e condições
                  </Link>
                  .
                </div>
                <button
                  className="btn btn-primary mt-3 mb-3"
                  onClick={() =>
                    createUserWithEmailAndPassword(email, password)
                  }
                >
                  Criar conta
                </button>
                <div className="text-border mb-4 mt-2 d-flex justify-content-center">
                  <span className="text">ou criar conta com o google</span>
                </div>
                <Google />
                <div className="mt-5 text-center">
                  Ja tenho conta?{" "}
                  <Link className="a-link" to="/login">
                    Entrar
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
      <ToastContainer />
    </>
  );
};

export default Register;
