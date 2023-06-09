import React, {useEffect, useState} from 'react';
import { initializeApp } from "firebase/app";
import {getFirestore, collection,  getDocs} from 'firebase/firestore'
import firebaseConfig from '../../key';
import { Post } from '../../interface';
import { CardRequests } from '../../components/cardRequests';

const firebaseConfigDB = initializeApp(firebaseConfig)
const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const db = getFirestore(firebaseConfigDB);
  const postCollection = collection(db, 'requests');
  
  useEffect(() => {
    const getPosts = async () => {
      const querySnapshot = await getDocs(postCollection);
      const postData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[];
      localStorage.setItem('postList', JSON.stringify(postData))
      const storedPosts  = localStorage.getItem ('postList')
      if(storedPosts){
        const parsedPosts = JSON.parse(storedPosts) as Post[]
        console.log('Data retrieved from localStorage:', parsedPosts);
        setPosts(parsedPosts)
      }else{
        console.log('No data found in localStorage');
        setPosts([]);
      }
      
    };  
    getPosts();
  }, []);
  
  return <main>
    <section>
      <div className="container pt-5 pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
          {posts.length > 0 ? (
              <div>
                {posts.map((post) => (
                  <div key={post.id} className='mb-3'>
                    {/* <h1>{post.description}</h1> */}
                    <CardRequests 
                    title={post.title} 
                    description={post.description}
                    date={''} 
                    location={post.location} 
                    details={''} 
                    value={post.value} 
                    skill={post.skill} 
                    publish_date={post.publish_date} 
                    publish_time={post.publish_time}/>
                  </div>
                ))}
              </div>
            ) : (
              <>Nenhum post encontrado.</>
            )}
          </div>
        </div>
      </div>
    </section>
  </main>
}

export default Dashboard;