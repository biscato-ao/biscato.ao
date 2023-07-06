import React, { useEffect, useState } from 'react';
import { Menu } from '../../components/menu';
import { getFirestore, collection, onSnapshot, query, getDocs, where, doc, updateDoc } from 'firebase/firestore';
import { Job } from "../../interface";
import { auth } from '../../services/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const db = getFirestore();
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  useEffect(() => {
    const qJobs = query(collection(db, 'jobs'));
    
    const unsubscribeJobs = onSnapshot(qJobs, async () => {
      const jobSnapshot = await getDocs(qJobs);
      const jobsData = jobSnapshot.docs.map((doc) => doc.data() as Job);

      const updatedJobs = jobsData.map((job) => {
        return {
          ...job,
          isCreatedByUser: job.createdBy === userId,
        };
      });

      setJobs(updatedJobs);
    });

    return () => {
      unsubscribeJobs();
    };
  }, [db, userId]);

  const markJobAsDone = async (jobId: string) => {
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, {
      isCompleted: true,
    });
  };

  return (
    <main className='mt-5 pt-5'>
      <Menu />
      <div className='mt-5 pt-5'>
        {jobs.length > 0 ? (
          <div>
            {jobs.map((job) => (
              <li key={job.jobId}>
                <p>{job.title}</p>
                <p>{job.description}</p>
                {job.isCreatedByUser && !job.isCompleted && (
                  <button onClick={() => markJobAsDone(job.jobId)}>Feito</button>
                )}
                {/* Renderizar outras informações do trabalho aqui */}
              </li>
            ))}
          </div>
        ) : (
          <p>Nenhum trabalho disponível.</p>
        )}
      </div>
    </main>
  );
}

export default Jobs;
