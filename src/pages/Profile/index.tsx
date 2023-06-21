import React, { useState, useEffect } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import userS from "./../../asset/43.jpg";
import logo from "./../../asset/vector/logo.svg";
import "./style.scss";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Menu } from "../../components/menu";
import { error } from "console";

const Profile: React.FC = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<any>(null);
  const uid = auth.currentUser?.uid;
  const db = getFirestore();
  const navigate = useNavigate();
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Conta verificada
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

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <Menu />
      <main className="profile">
        <section>
          <div className="container pt-5">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card border shadow-none mt-5 ">
                  <div className="capa" />
                  <div className="card-body">
                    <div className="inforUser d-flex">
                      <div className="photoURL">
                        <img src={user?.photoURL || userS} alt="" />
                      </div>
                      <div className="ms-3">
                        <div className="d-flex">
                          <h4>{userData?.displayName}</h4>
                          {userData?.verified ? (
                            <div className="verified ms-3">
                              <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                              >
                                <img src={logo} alt="" />
                              </OverlayTrigger>
                            </div>
                          ) : null}
                        </div>
                        <div className="local">
                          <HiOutlineLocationMarker className="mr-2" />
                          {userData?.location}
                        </div>
                        <div className="sk">
                          <div className="badge me-2">Cabeleireira</div>
                          <div className="badge me-2">
                            Maquiadora Profissional
                          </div>
                          <div className="badge me-2">Modelo</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between border-top">
                    <div>Disponivel</div>
                    <div>
                      <button type="button" className="btn btn-primary">
                        editar perfil
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card card-about mt-4 border shadow-none">
                  <div className="card-header pb-0">
                    <b>Sobre</b>
                  </div>
                  <div className="card-body pb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dignissimos autem optio minus ullam eos architecto vel magni
                    vitae, quisquam quo iusto veritatis doloremque blanditiis
                    debitis deleniti eveniet perferendis quibusdam eaque?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
