import React, { useState, useEffect } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useNavigate, NavLink, Navigate } from "react-router-dom";
import logo from "./../../asset/vector/logo_text.svg";
import userw from "./../../asset/43.jpg";
import "./style.scss";
import {
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineBriefcase,
  HiOutlineArchive,
} from "react-icons/hi";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";

export const Menu: React.FC = () => {
  const [user] = useAuthState(auth);
  const userAut = useAuthState(auth);
  const [userData, setUserData] = useState<any>(null);
  const uid = auth.currentUser?.uid;
  const db = getFirestore();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem("user");
    navigate("/login");
  };
  const notificationTooltip = (props: any) => (
    <Tooltip id="notification-tooltip" {...props}>
      Notificação
    </Tooltip>
  );

  const workTooltip = (props: any) => (
    <Tooltip id="work-tooltip" {...props}>
      Meus trabalhos
    </Tooltip>
  );

  const savedTooltip = (props: any) => (
    <Tooltip id="saved-tooltip" {...props}>
      Trabalhos Guardados
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
  
  const defaultProfileImage = "/path/to/default/profile/image.jpg";
  return (
    <nav className="navbar border-bottom fixed-top">
      <div className="container">
        <Link to="/dashboard" className="navbar-brand">
          <img src={logo} alt="" width={80} />
        </Link>
        <div className="nav-menu">
          <nav className="nav">
            <NavLink className="nav-link" to="/dashboard">
              Encontrar trabalho
            </NavLink>
            <Link className="nav-link" to="/professionals">
              Procurar proficionais
            </Link>
            <Link className="nav-link" to="/proposals">
              Propostas
            </Link>
            {userData && userData.isActive ? (
              <Link className="nav-link" to="#">
                Publicar serviço
              </Link>
            ) : userData && userData.isActive === undefined ? null : undefined}
          </nav>
        </div>
        <div className="d-flex search " role="search">
          <div
            className="btn-group me-4"
            role="group"
            aria-label="Basic example"
          >
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={savedTooltip}
            >
              <Link to="/savedJobs" className="btn button">
                <HiOutlineArchive />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={workTooltip}
            >
              <Link to={"/jobs"} className="btn button">
                <HiOutlineBriefcase />
              </Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={notificationTooltip}
            >
              <Link to={"/notifications"} className="btn button">
                <HiOutlineBell />
              </Link>
            </OverlayTrigger>
          </div>

          {userAut[0] === null || userAut === null ? (
            <div className="pt-2">
              <Link to="/login" className="a-link">
                Entrar
              </Link>
            </div>
          ) : (
            <div className="d-flex">
              {userData && userData.isActive ? (
                <div className="badge badge-statu-user me-3">Sou Cliente</div>
              ) : userData && userData.isActive === false ? (
                <div className="badge badge-statu-user me-3">
                  Sou profissional
                </div>
              ) : null}

              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic-button">
                  <div className="avatar">
                    <img src={userData?.photoURL || defaultProfileImage} alt="" />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-sm border-0">
                  {userData?.displayName}
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Perfil
                    </Link>
                  </li>
                  <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
