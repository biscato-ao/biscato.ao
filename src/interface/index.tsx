export interface Post {
  id: string; // Identificador único do post
  title: string; // Título do post
  description: string; // Descrição do post
  user_id: string; // Identificador único do usuário
  date: string; // Data do post (formato string)
  time: string; // Hora do post (formato string)
  location: string; // Localização do post
  details: string; // Detalhes do post
  value: number; // Valor do post
  skill: string[]; // Habilidade relacionada ao post
  publish_date: string; // Data de publicação do post (formato string)
  publish_time: string; // Hora de publicação do post (formato string)
}
