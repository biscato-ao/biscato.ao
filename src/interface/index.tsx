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
//   uid: string; // Unique user ID specific to the project.
//   email: string | null; // User's email.
//   displayName: string | null; // User's display name.
//   phoneNumber: string | null; // User's normalized phone number in E.164 format (e.g., +16505550101).
//   photoURL: string | null; // User's profile photo URL.
//   providerId: string; // The provider used to authenticate the user.
//   skills: string[]; // User's related skills.
//   status: string; // User's status.
//   location: string; // User's location.
//   utolaCode: string; // User's Utola code.
//   verified: boolean; // Indicates whether the user is verified or not.
//   about: string; // User's biography or description.
//   username: string; // User's username.
//   clients: string[]; // Clients associated with the user.
//   coverPhotoURL: string | null; // User's cover photo URL.
//   isActive: boolean; // Indicates whether the user is active (true) as a client or professional.
//   previousWorks: string[]; // User's previous works (array).
//   certifications: string[]; // User's certifications (array).
//   employmentHistory: string[]; // User's employment history (array).
//   otherExperiences: string[]; // User's other experiences (array).
//   introductionVideoURL: string | null; // User's introduction video URL.
//   education: string[]; // User's education (array).
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
  notificationId:any;
  userId: any; // ID do usuário a quem a notificação se destina.
  message: string; // Mensagem da notificação.
  timestamp: Date; // Data e hora em que a notificação foi gerada.
  isRead: boolean; // Indica se a notificação foi lida ou não.
  proposalId?: any; // ID da proposta associada à notificação (opcional).
  jobId?:any | string; // ID do trabalho associado à notificação (opcional).
  contactInfo?: any; // Informações de contato (opcional).
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
