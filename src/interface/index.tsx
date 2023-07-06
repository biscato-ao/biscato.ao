import { Firestore } from "firebase/firestore";

export interface Post {
  completedBy?: any;
  id?: any; // Identificador único do post
  title: string; // Título do post
  description: string; // Descrição do post
  user_id: any; // Identificador único do usuário
  date: string; // Data do post (formato string)
  time: string; // Hora do post (formato string)
  location: string; // Localização do post
  value: number; // Valor do post
  skill: string[]; // Habilidade relacionada ao post
  publish_date: any; // Data de publicação do post (formato string)
  publish_time: any; // Hora de publicação do post (formato string)
}

export interface UserInfo {
  uid: string; // ID exclusivo do usuário, específico para o projeto.
  email: string | null; // O email do usuário.
  displayName: string | null; // O nome de exibição do usuário.
  phoneNumber: string | null; // O número de telefone normalizado no padrão E.164 (por exemplo, +16505550101) do usuário.
  photoURL: string | null; // O URL da foto de perfil do usuário.
  providerId: string; // O provedor usado para autenticar o usuário.
  skills: string[]; // Habilidades relacionadas ao usuário.
  status: string; // O status do usuário.
  location: string; // A localização do usuário.
  utolaCode: string; // O código Utola do usuário.
  verified: boolean; // Indica se o usuário está verificado ou não.
  about: string; // Biografia ou descrição do usuário.
  username: string; // O nome de usuário do usuário.
  clients: string[]; // Clientes associados ao usuário.
  coverPhotoURL: string | null; // O URL da foto de capa do usuário.
  isActive: boolean; // Indica se o usuário está ativo (true) como cliente ou profissional.
}


// export interface UserInfo {
//   uid: string; // ID único do usuário específico para o projeto.
//   email: string | null; // E-mail do usuário.
//   displayName: string | null; // Nome de exibição do usuário.
//   phoneNumber: string | null; // Número de telefone normalizado do usuário no formato E.164 (por exemplo, +16505550101).
//   photoURL: string | null; // URL da foto de perfil do usuário.
//   providerId: string; // O provedor usado para autenticar o usuário.
//   skills: string[]; // Habilidades relacionadas do usuário.
//   status: string; // Status do usuário.
//   location: string; // Localização do usuário.
//   utolaCode: string; // Código Utola do usuário.
//   verified: boolean; // Indica se o usuário está verificado ou não.
//   about: string; // Biografia ou descrição do usuário.
//   username: string; // Nome de usuário do usuário.
//   clients: string[]; // Clientes associados ao usuário.
//   coverPhotoURL: string | null; // URL da foto de capa do usuário.
//   isActive: boolean; // Indica se o usuário está ativo (true) como cliente ou profissional.
//   previousWorks: string[]; // Trabalhos anteriores do usuário (array).
//   certifications: string[]; // Certificações do usuário (array).
//   employmentHistory: string[]; // Histórico de emprego do usuário (array).
//   otherExperiences: string[]; // Outras experiências do usuário (array).
//   introductionVideoURL: string | null; // URL do vídeo de introdução do usuário.
//   education: string[]; // Educação do usuário (array).
// }



export interface Proposal {
  jobId: any; // ID do trabalho ao qual a proposta está sendo enviada.
  userId: any; // ID do usuário que está enviando a proposta.
  proposalText: any; // Texto da proposta em si, fornecido pelo usuário.
  proposalDate: Date; // Data em que a proposta foi enviada.
  status: "pendente" | "aceita" | "rejeitada"; // Status da proposta.
  acceptedBy?: string; // ID do usuário que aceitou a proposta (opcional).
  acceptedDate?: Date; // Data em que a proposta foi aceita (opcional).
  value: any; // Valor da proposta, que pode ser numérico ou string.
}

export interface Job {
  notificationId: any;
  isCreatedByUser: boolean;
  jobId: string; // ID exclusivo do trabalho.
  title: string; // Título do trabalho.
  description: string; // Descrição do trabalho.
  location: string; // Localização do trabalho.
  publishDate: Date; // Data de publicação do trabalho.
  publishTime: string; // Hora de publicação do trabalho.
  skillsRequired: string[]; // Lista de habilidades necessárias para o trabalho.
  createdBy: string; // ID do usuário que criou o trabalho.
  createdDate: Date; // Data de criação do trabalho.
  isCompleted: boolean; // Indica se o trabalho foi concluído ou não.
  completedBy?: any; // ID do usuário que concluiu o trabalho (opcional).
  completedDate?: any; // Data de conclusão do trabalho (opcional).
  proposedBy?: string[]; // Lista de IDs dos usuários que enviaram propostas para o trabalho.
  acceptedProposal?: string; // ID da proposta aceita para o trabalho (opcional).
  acceptedDate?: Date; // Data de aceitação da proposta (opcional).
  value: number; // Valor do trabalho.
}

export interface Notification {
  notificationId:string;
  rightRequest: boolean;
  userId:string; // ID do usuário a quem a notificação se destina.
  message: string; // Mensagem da notificação.
  timestamp: Date; // Data e hora em que a notificação foi gerada.
  isRead: boolean; // Indica se a notificação foi lida ou não.
  proposalId?: any; // ID da proposta associada à notificação (opcional).
  jobId?:any | string; // ID do trabalho associado à notificação (opcional).
  requesterName?:any,
  requesterId?:any,
  requesterPhoto?:any,
  requesterPhoneNumber?:any,
  
}


export interface Skill {
  id: string; // ID exclusivo da habilidade.
  name: string; // Nome da habilidade.
  description: string; // Descrição da habilidade.
  imageUrl: string; // URL da imagem associada à habilidade.
  category: string; // Categoria da habilidade.
  bannerImageUrl: string; // URL da imagem de banner associada à habilidade.
}

export interface Tag {
  id: string; // ID exclusivo da tag.
  name: string; // Nome da tag.
}
