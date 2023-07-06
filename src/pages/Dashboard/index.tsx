import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from "../../key";
import { Post } from "../../interface";
import { CardRequests } from "../../components/cardRequests";
import { Menu } from "../../components/menu";
import { HiOutlineSearch } from "react-icons/hi";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./style.scss";
import { ButtomCreateJob } from "../../components/buttomCreateJob";

const firebaseConfigDB = initializeApp(firebaseConfig);

const searchTooltip = (props: any) => (
  <Tooltip id="notification-tooltip" {...props}>
    Pesquisar
  </Tooltip>
);

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const db = getFirestore(firebaseConfigDB);
  const postCollection = collection(db, "requests");
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  useEffect(() => {
    const getPosts = async () => {
      const querySnapshot = await getDocs(postCollection);
      const postData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Post[];
      localStorage.setItem("postList", JSON.stringify(postData));
      const storedPosts = localStorage.getItem("postList");
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts) as Post[];
        console.log("Data retrieved from localStorage:", parsedPosts);
        setPosts(parsedPosts);
      } else {
        console.log("No data found in localStorage");
        setPosts([]);
      }
    };
    getPosts();
  }, []);

  const handleSearch = () => {
    const storedPosts = localStorage.getItem("postList");
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts) as Post[];
      const filteredPosts = parsedPosts.filter(
        (post) =>
          post.title &&
          post.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredPosts(filteredPosts);
      setShowNoResults(filteredPosts.length === 0);
    } else {
      console.log("No data found in localStorage");
      setFilteredPosts([]);
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
                    placeholder="Procurar trabalho"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={searchTooltip}
                  >
                    <button className="btn-search p-0" onClick={handleSearch}>
                      <HiOutlineSearch />
                    </button>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-7">
              {showNoResults && (
                <div
                  className="alert alert-light border-0 text-center"
                  role="alert"
                >
                  Nenhum post encontrado.
                </div>
              )}
              {posts.length > 0 ? (
                <div>
                  {(searchValue !== "" ? filteredPosts : posts).map((post) => (
                    <div key={post.id} className="mb-3">
                      {/* <h1>{post.description}</h1> */}
                      <CardRequests
                        title={post.title}
                        description={post.description}
                        date={""}
                        location={post.location}
                        details={""}
                        value={post.value}
                        skill={post.skill}
                        publish_date={post.publish_date}
                        publish_time={post.publish_time}
                        link={post.id}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="alert alert-light border-0 text-center"
                  role="alert"
                >
                  Nenhum post encontrado.
                </div>
              )}
            </div>
          </div>
        </div>
        <ButtomCreateJob />
      </section>
    </main>
  );
};

export default Dashboard;
