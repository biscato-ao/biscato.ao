import React, { useEffect, useState } from "react";
import { Menu } from "../../components/menu";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  where,
  query,
} from "firebase/firestore";
import firebaseConfig from "../../key";
import { UserInfo, Notification } from "../../interface";
import { HiOutlineSearch } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

const firebaseConfigDB = initializeApp(firebaseConfig);

const Professionals: React.FC = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const currentUser = auth.currentUser;

  const [users, setUsers] = useState<UserInfo[]>([]);
  const db = getFirestore(firebaseConfigDB);
  const usersCollection = collection(db, "users");
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<UserInfo[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersQuery = query(usersCollection, where("isActive", "==", false));
        const querySnapshot = await getDocs(usersQuery);
        const userData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as unknown as UserInfo[];

        const filteredUsers = userData.filter(
          (user) => user.uid !== currentUser?.uid
        ); // Ignora o usuário autenticado
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };
    getUsers();
  }, [currentUser, usersCollection]);

  const handleSearch = () => {
    const filteredUsers = users.filter(
      (user) =>
        user.displayName &&
        user.displayName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
    setShowNoResults(filteredUsers.length === 0);
  };

  const sendWorkRequest = async (user: UserInfo) => {
    const uid = user.uid;
    const lastRequestTime = localStorage.getItem(`lastRequestTime_${uid}`);

    if (lastRequestTime) {
      const twentyFourHours = 24 * 60 * 60 * 1000;
      const currentTime = new Date().getTime();
      const lastRequestTimestamp = parseInt(lastRequestTime, 10);

      if (currentTime - lastRequestTimestamp < twentyFourHours) {
        console.log("Aguarde 24 horas antes de enviar uma nova solicitação.");
        return;
      }
    }

    const notification: Notification = {
      userId: uid,
      message:
        "Olá! Você recebeu uma solicitação de serviço de um cliente. Confira os detalhes da solicitação e avalie se você está disponível para realizar o trabalho. Fique à vontade para entrar em contato com o cliente para discutir mais detalhes, se necessário.",
      timestamp: new Date(),
      isRead: false,
      proposalId: "",
      jobId: "",
      contactInfo: currentUser?.displayName,
      notificationId: uuidv4(), // Gerar um novo UUID para o notificationId
    };

    try {
      const notificationsCollection = collection(db, "notifications");
      await addDoc(notificationsCollection, notification);

      // Salvar a data e hora atual como a última solicitação enviada
      localStorage.setItem(
        `lastRequestTime_${uid}`,
        new Date().getTime().toString()
      );

      console.log("Notificação enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar a notificação:", error);
    }
  };

  return (
    <main>
      <Menu />
      <section>
        <div className="container pt-5 mt-5 pb-5">
          <div className="row pt-1 pb-4 justify-content-center">
            <div className="col-lg-7">
              <div className="card card-search border shadow-none">
                <div className="card-body input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Procurar profissionais"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button className="btn-search p-0" onClick={handleSearch}>
                    <HiOutlineSearch />
                  </button>
                </div>
              </div>

              {showNoResults && <p>Nenhum resultado encontrado.</p>}
              {users.length > 0 ? (
                <div>
                  {(searchValue !== "" ? filteredUsers : users).map((user) => (
                    <div key={user.uid} className="mb-3">
                      <div>
                        <img src={user.photoURL || ""} alt="" />
                        <p>{user.displayName}</p>
                        <button onClick={() => sendWorkRequest(user)}>
                          Enviar pedido de serviço
                        </button>
                        <Link to={user.uid}>Ver</Link>
                        <p>{user.uid}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-light mt-4 border-0 text-center" role="alert">
                  Nenhum profissional encontrado.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Professionals;
