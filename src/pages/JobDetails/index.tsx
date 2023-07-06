import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post, Proposal, Notification, Job } from "../../interface";
import { Menu } from "../../components/menu";
import { PageLoader } from "../../components/pageLoader";
import "./style.scss";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { auth } from "../../services/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  getFirestore,
  updateDoc,
  setDoc,
  getDoc,
  Firestore,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import firebaseConfig from "../../key";
import { initializeApp } from "firebase/app";

const firebaseConfigDB = initializeApp(firebaseConfig);
const JobDetails: React.FC = () => {
  const db = getFirestore(firebaseConfigDB);
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [job, setJob] = useState<Post | null>(null);
  const uid = auth.currentUser?.uid;
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const q = job
    ? query(collection(db, "proposals"), where("jobId", "==", job.id))
    : null;
  const [hasCompatibleProposal, setHasCompatibleProposal] =
    useState<boolean>(false);
  const [canSendProposal, setCanSendProposal] = useState(true);
  const textPropost = user?.uid
    ? query(collection(db, "proposals"), where("userId", "==", user.uid))
    : null;

  useEffect(() => {
    if (textPropost) {
      const unsubscribe = onSnapshot(textPropost, (snapshot) => {
        const proposals: Proposal[] = snapshot.docs.map(
          (doc) => doc.data() as Proposal
        );
        console.log("Proposals:", proposals);

        // Verificar se há propostas compatíveis
        const hasCompatibleProposal = proposals.some((proposal) => {
          return proposal.jobId === job?.id && proposal.status !== "rejeitada";
        });

        if (hasCompatibleProposal) {
          console.log("Usuário já enviou uma proposta compatível");
        } else {
          console.log("Usuário ainda não enviou uma proposta compatível");
        }

        // Atualizar o estado com a informação de proposta compatível
        setHasCompatibleProposal(hasCompatibleProposal);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [textPropost, job, user]);

  useEffect(() => {
    if (q) {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const updatedProposals: Proposal[] = snapshot.docs.map(
          (doc) => doc.data() as Proposal
        );
        setProposals(updatedProposals);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [q, job]);

  useEffect(() => {
    if (job && user && job.user_id === user.uid) {
      // Usuário é o dono da publicação, não permite enviar proposta
      setCanSendProposal(false);
    } else {
      // Usuário não é o dono da publicação, permite enviar proposta
      setCanSendProposal(true);
    }
  }, [job, user]);

  console.log("AQUI", proposals);
  useEffect(() => {
    const storagePost = localStorage.getItem("postList");
    if (storagePost) {
      const parsedPosts = JSON.parse(storagePost) as Post[];
      const JobData = parsedPosts.find((post) => post.id === id);
      if (JobData) {
        setJob(JobData);
      } else {
        console.log("Job not found");
      }
    } else {
      console.log("No data found in localStorage");
    }
  }, [id]);

  if (!job) {
    return <PageLoader />;
  }

  const proposal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      reset: () => void;
    };

    const proposalText = document.querySelector<HTMLInputElement>(
      'input[name="proposalText"]'
    );
    const proposalValue = document.querySelector<HTMLInputElement>(
      'input[name="proposalValue"]'
    );

    if (!proposalText || !proposalValue) {
      return;
    }

    const proposalData: Proposal = {
      jobId: job.id,
      userId: uid,
      proposalText: proposalText.value,
      proposalDate: new Date(),
      status: "pendente",
      value: proposalValue.value,
    };

    try {
      // Enviar proposta para a coleção "proposals"
      await addDoc(collection(db, "proposals"), proposalData);

      // Criar a notificação para a pessoa que fez a publicação
      const notification: Notification = {
        userId: job.user_id,
        message: "Você tem uma nova proposta na sua publicação.",
        timestamp: new Date(),
        isRead: false,
        proposalId: "",
        jobId: job.id,
        rightRequest: true,
        requesterName: user?.displayName,
        requesterId: user?.uid,
        requesterPhoto: user?.photoURL,
        requesterPhoneNumber: user?.phoneNumber,
        notificationId: uuidv4(),
      };

      // Enviar a notificação para a coleção "notifications"
      await addDoc(collection(db, "notifications"), notification);

      console.log(
        "Proposta enviada e notificação criada com sucesso:",
        proposalData
      );

      target.reset();
    } catch (error) {
      console.error("Erro ao enviar a proposta:", error);
    }
  };

  // const acceptProposal = async (proposal: Proposal) => {
  //   try {
  //     // Atualizar o status da proposta para "aceita"
  //     await updateDoc(doc(db, 'proposals', proposal.jobId), {
  //       status: 'aceita',
  //     });

  //     // Atualizar o trabalho com a proposta aceita
  //     await updateDoc(doc(db, 'jobs', job.id), {
  //       acceptedProposal: proposal.jobId,
  //       acceptedDate: new Date(),
  //     });

  //     // Criar uma notificação para o proponente
  //     const notification: Notification = {
  //       userId: proposal.userId,
  //       message: 'Sua proposta foi aceita para o trabalho.',
  //       timestamp: new Date(),
  //       isRead: false,
  //       proposalId: proposal.jobId,
  //       jobId: job.id,
  //       contactInfo: user?.displayName,
  //       notificationId: uuidv4(),
  //     };

  //     // Enviar a notificação para a coleção "notifications"
  //     await addDoc(collection(db, 'notifications'), notification);

  //     console.log('Proposta aceita com sucesso:', proposal);
  //   } catch (error) {
  //     console.error('Erro ao aceitar a proposta:', error);
  //   }
  // };

  //   const acceptProposal = async (proposal: Proposal) => {
  //   try {
  //     const jobRef = doc(db, 'jobs', job.id);
  //     const jobDoc = await getDoc(jobRef);

  //     if (jobDoc.exists()) {
  //       // Atualizar o trabalho com a proposta aceita
  //       await updateDoc(jobRef, {
  //         acceptedProposal: proposal.jobId,
  //         acceptedDate: new Date(),
  //         completedBy: new Date() || null, // Definir como null se não estiver definido
  //         completedDate: new Date() || null, // Definir como null se não estiver definido
  //       });
  //     } else {
  //       // Criar um novo trabalho com a proposta aceita
  //       const newJobData: Job = {
  //         jobId: job.id,
  //         title: job.title,
  //         description: job.description,
  //         location: job.location,
  //         publishDate: job.publish_date,
  //         publishTime: job.publish_time,
  //         skillsRequired: job.skill,
  //         createdBy: job.user_id,
  //         createdDate: job.publish_date,
  //         isCompleted: false,
  //         completedBy: proposal.userId,
  //         completedDate: new Date() || null,
  //         proposedBy: [],
  //         acceptedProposal: proposal.jobId,
  //         acceptedDate: new Date(),
  //         value: job.value,
  //         isCreatedByUser: false,
  //         notificationId: function (db: Firestore, arg1: string, notificationId: any): unknown {
  //           throw new Error("Function not implemented.");
  //         }
  //       };
  //       await setDoc(jobRef, newJobData);
  //     }

  //     // Criar uma notificação para o proponente
  //     const notification: Notification = {
  //       userId: proposal.userId,
  //       message: 'Sua proposta foi aceita para o trabalho.',
  //       timestamp: new Date(),
  //       isRead: false,
  //       proposalId: proposal.jobId,
  //       jobId: job.id,
  //       rightRequest: true,
  //       contactInfo: user?.displayName,
  //       notificationId: uuidv4(),
  //     };

  //     // Enviar a notificação para a coleção "notifications"
  //     await addDoc(collection(db, 'notifications'), notification);

  //     console.log('Proposta aceita com sucesso:', proposal);
  //   } catch (error) {
  //     console.error('Erro ao aceitar a proposta:', error);
  //   }
  // };

  const acceptProposal = async (proposal: Proposal) => {
    try {
      const jobRef = doc(db, "jobs", job.id);
      const jobDoc = await getDoc(jobRef);

      if (jobDoc.exists()) {
        // Atualizar o trabalho com a proposta aceita
        await updateDoc(jobRef, {
          acceptedProposal: proposal.jobId,
          acceptedDate: new Date(),
          completedBy: new Date() || null, // Definir como null se não estiver definido
          completedDate: new Date() || null, // Definir como null se não estiver definido
        });
      } else {
        // Criar um novo trabalho com a proposta aceita
        const newJobData: Job = {
          jobId: job.id,
          title: job.title,
          description: job.description,
          location: job.location,
          publishDate: job.publish_date,
          publishTime: job.publish_time,
          skillsRequired: job.skill,
          createdBy: job.user_id,
          createdDate: job.publish_date,
          isCompleted: false,
          completedBy: proposal.userId,
          completedDate: new Date() || null,
          proposedBy: [],
          acceptedProposal: proposal.jobId,
          acceptedDate: new Date(),
          value: job.value,
          isCreatedByUser: false,
          notificationId: uuidv4(), // Gerar um ID único para o campo notificationId
        };

        const newJobRef = doc(collection(db, "jobs"));
        const newJobId = newJobRef.id;
        newJobData.notificationId = newJobId; // Atribuir o ID único ao campo notificationId
        await setDoc(newJobRef, newJobData);
      }

      // Criar uma notificação para o proponente
      const notification: Notification = {
        userId: proposal.userId,
        message: "Sua proposta foi aceita para o trabalho.",
        timestamp: new Date(),
        isRead: false,
        proposalId: proposal.jobId,
        jobId: job.id,
        rightRequest: true,
        requesterName: user?.displayName,
        requesterId: user?.uid,
        requesterPhoto: user?.photoURL,
        requesterPhoneNumber: user?.phoneNumber,
        notificationId: uuidv4(), // Usar o mesmo valor atribuído ao campo notificationId do trabalho
      };

      // Enviar a notificação para a coleção "notifications"
      await addDoc(collection(db, "notifications"), notification);

      console.log("Proposta aceita com sucesso:", proposal);
    } catch (error) {
      console.error("Erro ao aceitar a proposta:", error);
    }
  };

  return (
    <main className="JobDetails">
      <Menu />
      <section>
        <div className="container pt-5 mt-5 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card border">
                <div className="card-body mt-2">
                  <h4>{job.title}</h4>
                  <div>
                    <HiOutlineLocationMarker /> {job.location} - Postado{" "}
                    {job.publish_time} de {job.publish_date}
                  </div>
                  <div className="mt-4">
                    <h6>
                      <b>Descrição do Serviço</b>
                    </h6>
                    <p className="mt-3">{job.description}</p>
                  </div>
                  <div className="mt-4">
                    <h6 className="mb-3">
                      <b>Habilidades Necessárias</b>
                    </h6>
                    {Array.isArray(job.skill) &&
                      job.skill.map((skill: string, index: number) => (
                        <span className="badge me-2" key={index}>
                          {skill}
                        </span>
                      ))}
                  </div>
                  <div className="mt-4">
                    <h6 className="mb-3">
                      <b>Detalhes do Serviço</b>
                    </h6>
                  </div>
                </div>
              </div>

              <div>
                <h1>Proposals</h1>
                <ul>
                  {proposals.map((proposal) => (
                    <li key={proposal.proposalDate.toString()}>
                      <div>
                        <p>{proposal.proposalText}</p>
                        <>{proposal.userId}</>
                        <button onClick={() => acceptProposal(proposal)}>
                          aceitar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {hasCompatibleProposal ? (
                <div className="alert alert-info mt-3">
                  Você já enviou uma proposta compatível para esta publicação.
                  Seu interesse já foi registrado e está sendo considerado.
                  Aguarde por possíveis atualizações ou novos contatos.
                </div>
              ) : (
                <>
                  {canSendProposal ? (
                    <div className="card">
                      <div className="card-body">
                        <form onSubmit={proposal}>
                          <input type="number" name="proposalValue" />
                          <input
                            type="text"
                            name="proposalText"
                            placeholder="Texto da proposta"
                          />
                          <button>Enviar proposta</button>
                        </form>
                      </div>
                    </div>
                  ) : proposals.length === 0 ? (
                    <div className="alert alert-info mt-3">
                      Aguardando Propowstas para esta publicação.
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default JobDetails;
