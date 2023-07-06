import React from 'react';
import firebaseConfig from '../../key';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const Terms: React.FC = () => {
  const enviarDadosParaColecao = async () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();

    const Skill = [
      {
        id: "1",
        name: "Cabeleireiro/Cabeleireira",
        description: "Profissional especializado(a) em cortes e cuidados com o cabelo.",
        imageUrl: "url_da_imagem_cabeleireiro",
        category: "Beleza",
        bannerImageUrl: "url_da_imagem_banner_cabeleireiro"
      },
        {
        id: "2",
        name: "Cabeleireira",
        description: "Profissional especializado(a) em cortes e cuidados com o cabelo.",
        imageUrl: "url_da_imagem_cabeleireiro",
        category: "Beleza",
        bannerImageUrl: "url_da_imagem_banner_cabeleireiro"
      },
      {
        id: "3",
        name: "Babá",
        description: "Profissional responsável por cuidar de crianças e auxiliar com suas necessidades.",
        imageUrl: "url_da_imagem_baba",
        category: "Cuidados Pessoais",
        bannerImageUrl: "url_da_imagem_banner_baba"
      },
      {
        id: "4",
        name: "Diarista",
        description: "Profissional que realiza serviços domésticos em residências, como limpeza e organização.",
        imageUrl: "url_da_imagem_diarista",
        category: "Limpeza",
        bannerImageUrl: "url_da_imagem_banner_diarista"
      },
      {
        id: "5",
        name: "Faxineiro/Faxineira",
        description: "Profissional que realiza serviços de faxina e limpeza em diversos ambientes.",
        imageUrl: "url_da_imagem_faxineiro",
        category: "Limpeza",
        bannerImageUrl: "url_da_imagem_banner_faxineiro"
      },
      {
        id: "6",
        name: "Faxineiro",
        description: "Profissional que realiza serviços de faxina e limpeza em diversos ambientes.",
        imageUrl: "url_da_imagem_faxineiro",
        category: "Limpeza",
        bannerImageUrl: "url_da_imagem_banner_faxineiro"
      },
      {
        id: "7",
        name: "Mecânico",
        description: "Profissional especializado(a) em consertos e manutenção de veículos automotivos.",
        imageUrl: "url_da_imagem_mecanico",
        category: "Automotivo",
        bannerImageUrl: "url_da_imagem_banner_mecanico"
      },
      {
        id: "8",
        name: "Mecânica",
        description: "Profissional especializado(a) em consertos e manutenção de veículos automotivos.",
        imageUrl: "url_da_imagem_mecanico",
        category: "Automotivo",
        bannerImageUrl: "url_da_imagem_banner_mecanico"
      },
      {
        id: "9",
        name: "Pintor",
        description: "Profissional que realiza serviços de pintura em paredes, móveis e outras superfícies.",
        imageUrl: "url_da_imagem_pintor",
        category: "Construção",
        bannerImageUrl: "url_da_imagem_banner_pintor"
      },
       {
        id: "10",
        name: "Pintora",
        description: "Profissional que realiza serviços de pintura em paredes, móveis e outras superfícies.",
        imageUrl: "url_da_imagem_pintor",
        category: "Construção",
        bannerImageUrl: "url_da_imagem_banner_pintor"
      },
      {
        id: "11",
        name: "Eletricista",
        description: "Profissional especializado(a) em instalação e reparo de sistemas elétricos.",
        imageUrl: "url_da_imagem_eletricista",
        category: "Elétrica",
        bannerImageUrl: "url_da_imagem_banner_eletricista"
      },
      {
        id: "12",
        name: "Encanador",
        description: "Profissional especializado(a) em instalação e reparo de sistemas hidráulicos.",
        imageUrl: "url_da_imagem_encanador",
        category: "Hidráulica",
        bannerImageUrl: "url_da_imagem_banner_encanador"
      },
      {
        id: "13",
        name: "Encanadora",
        description: "Profissional especializado(a) em instalação e reparo de sistemas hidráulicos.",
        imageUrl: "url_da_imagem_encanador",
        category: "Hidráulica",
        bannerImageUrl: "url_da_imagem_banner_encanador"
      },
      {
        id: "14",
        name: "Jardineiro",
        description: "Profissional responsável pela manutenção e cuidado de jardins e áreas verdes.",
        imageUrl: "url_da_imagem_jardineiro",
        category: "Jardinagem",
        bannerImageUrl: "url_da_imagem_banner_jardineiro"
      },
      {
        id: "15",
        name: "Jardineira",
        description: "Profissional responsável pela manutenção e cuidado de jardins e áreas verdes.",
        imageUrl: "url_da_imagem_jardineiro",
        category: "Jardinagem",
        bannerImageUrl: "url_da_imagem_banner_jardineiro"
      },
      {
        id: "16",
        name: "Cozinheiro",
        description: "Profissional especializado(a) na preparação de alimentos e culinária em geral.",
        imageUrl: "url_da_imagem_cozinheiro",
        category: "Gastronomia",
        bannerImageUrl: "url_da_imagem_banner_cozinheiro"
      },
      {
        id: "17",
        name: "Cozinheira",
        description: "Profissional especializado(a) na preparação de alimentos e culinária em geral.",
        imageUrl: "url_da_imagem_cozinheiro",
        category: "Gastronomia",
        bannerImageUrl: "url_da_imagem_banner_cozinheiro"
      },
      {
        id: "18",
        name: "Costureiro",
        description: "Profissional especializado(a) em costura e reparos de roupas e tecidos.",
        imageUrl: "url_da_imagem_costureiro",
        category: "Moda",
        bannerImageUrl: "url_da_imagem_banner_costureiro"
      },
    {
        id: "19",
        name: "Costureira",
        description: "Profissional especializado(a) em costura e reparos de roupas e tecidos.",
        imageUrl: "url_da_imagem_costureiro",
        category: "Moda",
        bannerImageUrl: "url_da_imagem_banner_costureiro"
      },
      {
        id: "20",
        name: "Pedreiro",
        description: "Profissional especializado(a) em construção e reforma de estruturas.",
        imageUrl: "url_da_imagem_pedreiro",
        category: "Construção",
        bannerImageUrl: "url_da_imagem_banner_pedreiro"
      },
      {
        id: "21",
        name: "Pedreira",
        description: "Profissional especializado(a) em construção e reforma de estruturas.",
        imageUrl: "url_da_imagem_pedreiro",
        category: "Construção",
        bannerImageUrl: "url_da_imagem_banner_pedreiro"
      },
      {
        id: "22",
        name: "Pedicure",
        description: "Profissional especializado(a) em cuidados estéticos das unhas das mãos e pés.",
        imageUrl: "url_da_imagem_manicure",
        category: "Beleza",
        bannerImageUrl: "url_da_imagem_banner_manicure"
      },
      {
        id: "23",
        name: "Manicure",
        description: "Profissional especializado(a) em cuidados estéticos das unhas das mãos e pés.",
        imageUrl: "url_da_imagem_manicure",
        category: "Beleza",
        bannerImageUrl: "url_da_imagem_banner_manicure"
      },
      {
        id: "24",
        name: "Vendedor",
        description: "Profissional responsável por vendas de produtos ou serviços.",
        imageUrl: "url_da_imagem_vendedor",
        category: "Vendas",
        bannerImageUrl: "url_da_imagem_banner_vendedor"
      },
      {
        id: "25",
        name: "Vendedora",
        description: "Profissional responsável por vendas de produtos ou serviços.",
        imageUrl: "url_da_imagem_vendedor",
        category: "Vendas",
        bannerImageUrl: "url_da_imagem_banner_vendedor"
      },
      {
        id: "26",
        name: "Entregadora",
        description: "Profissional responsável por realizar entregas de produtos ou encomendas.",
        imageUrl: "url_da_imagem_entregador",
        category: "Entregas",
        bannerImageUrl: "url_da_imagem_banner_entregador"
      },
      {
        id: "27",
        name: "Entregador",
        description: "Profissional responsável por realizar entregas de produtos ou encomendas.",
        imageUrl: "url_da_imagem_entregador",
        category: "Entregas",
        bannerImageUrl: "url_da_imagem_banner_entregador"
      },
      {
        id: "28",
        name: "Técnico de Refrigeraçãoefrigerista",
        description: "Profissional especializado(a) em consertos e manutenção de sistemas de refrigeração.",
        imageUrl: "url_da_imagem_tecnico_refrigeracao",
        category: "Refrigeração",
        bannerImageUrl: "url_da_imagem_banner_tecnico_refrigeracao"
      },
    {
        id: "29",
        name: "Refrigerista",
        description: "Profissional especializado(a) em consertos e manutenção de sistemas de refrigeração.",
        imageUrl: "url_da_imagem_tecnico_refrigeracao",
        category: "Refrigeração",
        bannerImageUrl: "url_da_imagem_banner_tecnico_refrigeracao"
      },
      {
        id: "30",
        name: "Serralheira",
        description: "Profissional especializado(a) em trabalhos de serralheria e fabricação de estruturas metálicas.",
        imageUrl: "url_da_imagem_serralheiro",
        category: "Serralheria",
        bannerImageUrl: "url_da_imagem_banner_serralheiro"
      },
      {
        id: "31",
        name: "Serralheiro",
        description: "Profissional especializado(a) em trabalhos de serralheria e fabricação de estruturas metálicas.",
        imageUrl: "url_da_imagem_serralheiro",
        category: "Serralheria",
        bannerImageUrl: "url_da_imagem_banner_serralheiro"
      },
      {
        id: "32",
        name: "Maquiador Profissional",
        description: "Profissional especializado(a) em maquiagem para eventos, festas e produções.",
        imageUrl: "url_da_imagem_maquiador",
        category: "Beleza",
        bannerImageUrl: "url_da_imagem_banner_maquiador"
      },
      {
        id: "33",
        name: "Maquiadora Profissional",
        description: "Profissional especializado(a) em maquiagem para eventos, festas e produções.",
        imageUrl: "url_da_imagem_maquiador",
        category: "Beleza",
        bannerImageUrl: "url_da_imagem_banner_maquiador"
      },
      {
        id: "34",
        name: "Lavadeiro",
        description: "Profissional que realiza serviços de lavagem e cuidados com roupas e tecidos.",
        imageUrl: "url_da_imagem_lavadeiro",
        category: "Limpeza",
        bannerImageUrl: "url_da_imagem_banner_lavadeiro"
      },
      {
        id: "35",
        name: "Lavadeira",
        description: "Profissional que realiza serviços de lavagem e cuidados com roupas e tecidos.",
        imageUrl: "url_da_imagem_lavadeiro",
        category: "Limpeza",
        bannerImageUrl: "url_da_imagem_banner_lavadeiro"
      },
      {
        id: "36",
        name: "Engomadeiro",
        description: "Profissional especializado(a) em engomar e passar roupas.",
        imageUrl: "url_da_imagem_engomadeiro",
        category: "Limpeza",
        bannerImageUrl: "url_da_imagem_banner_engomadeiro"
      },
      {
        id: "37",
        name: "Engomadeira",
        description: "Profissional especializado(a) em engomar e passar roupas.",
        imageUrl: "url_da_imagem_engomadeiro",
        category: "Limpeza",
        bannerImageUrl: "url_da_imagem_banner_engomadeiro"
      },
      {
        id: "38",
        name: "Marceneira",
        description: "Profissional especializado(a) em trabalhos de marcenaria e fabricação de móveis de madeira.",
        imageUrl: "url_da_imagem_marceneiro",
        category: "Marcenaria",
        bannerImageUrl: "url_da_imagem_banner_marceneiro"
      },
      {
        id: "39",
        name: "Marceneiro",
        description: "Profissional especializado(a) em trabalhos de marcenaria e fabricação de móveis de madeira.",
        imageUrl: "url_da_imagem_marceneiro",
        category: "Marcenaria",
        bannerImageUrl: "url_da_imagem_banner_marceneiro"
      },
      {
        id: "40",
        name: "Garçom",
        description: "Profissional responsável por servir clientes em bares e restaurantes.",
        imageUrl: "url_da_imagem_garcom",
        category: "Gastronomia",
        bannerImageUrl: "url_da_imagem_banner_garcom"
      },
      {
        id: "41",
        name: "Garçonete",
        description: "Profissional responsável por servir clientes em bares e restaurantes.",
        imageUrl: "url_da_imagem_garcom",
        category: "Gastronomia",
        bannerImageUrl: "url_da_imagem_banner_garcom"
      },
      {
        id: "42",
        name: "Barman",
        description: "Profissional especializado(a) em preparar e servir bebidas em bares e eventos.",
        imageUrl: "url_da_imagem_bartender",
        category: "Gastronomia",
        bannerImageUrl: "url_da_imagem_banner_bartender"
      },
      {
        id: "43",
        name: "Bartender",
        description: "Profissional especializado(a) em preparar e servir bebidas em bares e eventos.",
        imageUrl: "url_da_imagem_bartender",
        category: "Gastronomia",
        bannerImageUrl: "url_da_imagem_banner_bartender"
      },
      {
        id: "44",
        name: "Fotógrafo",
        description: "Profissional especializado(a) em capturar e registrar momentos através da fotografia.",
        imageUrl: "url_da_imagem_fotografo",
        category: "Fotografia",
        bannerImageUrl: "url_da_imagem_banner_fotografo"
      },
      {
        id: "45",
        name: "Fotógrafa",
        description: "Profissional especializado(a) em capturar e registrar momentos através da fotografia.",
        imageUrl: "url_da_imagem_fotografo",
        category: "Fotografia",
        bannerImageUrl: "url_da_imagem_banner_fotografo"
      },
      {
        id: "46",
        name: "Modelo",
        description: "Profissional que atua como modelo para fotos, desfiles, publicidade, entre outros.",
        imageUrl: "url_da_imagem_modelo",
        category: "Moda",
        bannerImageUrl: "url_da_imagem_banner_modelo"
      },
      {
        id: "47",
        name: "Pasteleiro",
        description: "Profissional especializado(a) em fazer e vender pasteis de diversos sabores.",
        imageUrl: "url_da_imagem_pasteleiro",
        category: "Gastronomia",
        bannerImageUrl: "url_da_imagem_banner_pasteleiro"
      },
      {
        id: "48",
        name: "Pasteleira",
        description: "Profissional especializado(a) em fazer e vender pasteis de diversos sabores.",
        imageUrl: "url_da_imagem_pasteleiro",
        category: "Gastronomia",
        bannerImageUrl: "url_da_imagem_banner_pasteleiro"
      },
      {
        id: "49",
        name: "Promotor de Marketing",
        description: "Profissional responsável por promover produtos ou serviços através de estratégias de marketing.",
        imageUrl: "url_da_imagem_promotor_marketing",
        category: "Marketing",
        bannerImageUrl: "url_da_imagem_banner_promotor_marketing"
      },
      {
        id: "48",
        name: "Promotar de Marketing",
        description: "Profissional responsável por promover produtos ou serviços através de estratégias de marketing.",
        imageUrl: "url_da_imagem_promotor_marketing",
        category: "Marketing",
        bannerImageUrl: "url_da_imagem_banner_promotor_marketing"
      }
    ];

    try {
      for (const skill of Skill) {
        await db.collection('skills').add(skill);
      }
      console.log('Dados enviados com sucesso para a coleção "skills".');
    } catch (error) {
      console.error('Erro ao enviar dados para a coleção "skills":', error);
    }
  };

  return (
    <>
      <button onClick={enviarDadosParaColecao}>Enviar</button>
    </>
  );
};

export default Terms;
