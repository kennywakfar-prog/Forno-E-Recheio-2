import { PotatoMenu, DrinkOption, ExtraOption } from '../types';

export const RESTAURANT_INFO = {
  name: 'Forno & Recheio',
  tagline: 'Batatas Recheadas Artesanais a 220°C',
  address: 'Rua Infante Dom Henrique, Nº 26, Creixomil, Guimarães',
  postalCode: '4835-059',
  city: 'Guimarães',
  phone: '+351 939 975 314',
  whatsappRaw: '351939975314',
  glovoUrl: 'https://glovoapp.com/pt/pt/guimaraes/',
  kitchenCoords: {
    lat: 41.4426,
    lng: -8.3075,
  },
  ovenTemp: '220°C',
  deliveryHours: 'Terça a Domingo: 18h30 - 23h00',
  adminPin: '1234',
};

export const POTATO_MENUS: PotatoMenu[] = [
  {
    id: 'aerochicken',
    name: 'AeroChicken',
    tagline: 'Sucesso absoluto com requeijão cremoso e crocância',
    price: 12.90,
    description: 'Frango suculento desfiado temperado com ervas finas, molho especial da casa, farto requeijão cremoso e finalizado com batata palha super crocante.',
    ingredients: [
      'Batata inglesa grande assada a 220°C',
      'Frango suculento desfiado',
      'Molho especial artesanal da casa',
      'Requeijão cremoso tipo catupiry',
      'Batata palha crocante',
      'Manteiga de alho e ervas'
    ],
    image: '/assets/aistudio/aerochicken_63b5b3f9.jpg',
    badge: 'Mais Pedido ★',
    bestseller: true,
  },
  {
    id: 'meatlove',
    name: 'MeatLove',
    tagline: 'Para os verdadeiros amantes de carne e bacon fumado',
    price: 13.90,
    description: 'Carne moída nobre selecionada estufada lentamente em molho artesanal de tomate e especiarias, cubos dourados de bacon fumado crocante e batata palha estaladiça assada a 220°C.',
    ingredients: [
      'Batata assada com crosta dourada a 220°C',
      'Carne picada de novilho apurada ao molho artesanal',
      'Cubos de bacon crocante fumado',
      'Queijo gratinado derretido',
      'Batata palha super crocante'
    ],
    image: '/assets/aistudio/hero-potato_e5f2646f.jpg',
    badge: 'Favorito do Chef 🔥',
    bestseller: true,
  },
  {
    id: 'baconcrisp',
    name: 'BaconCrisp (Neon Bacon)',
    tagline: 'Cheddar cremoso irresistível e farto bacon estaladiço',
    price: 12.90,
    description: 'Generosa porção de cubos de bacon crocante estaladiço, derretido em cheddar cremoso legítimo, queijo fundido e batata palha.',
    ingredients: [
      'Batata assada fumegante a 220°C',
      'Cubos generosos de bacon crocante',
      'Cheddar cremoso legítimo',
      'Queijo fundido artesanal',
      'Batata palha crocante'
    ],
    image: '/assets/aistudio/neon-bacon_34c83e60.jpg',
    badge: 'Ultra Crocante 🥓',
  },
  {
    id: 'queijosnobres',
    name: '4 Queijos Nobres',
    tagline: 'Fusão irresistível de queijos derretidos no forno',
    price: 11.90,
    description: 'Combinação nobre e equilibrada de mussarela de alta fusão, queijo da ilha açoriano, creme de queijos fundidos e crocância de batata palha.',
    ingredients: [
      'Batata rústica assada a 220°C',
      'Mussarela de alta fusão derretida',
      'Queijo da Ilha de São Jorge DOP',
      'Creme de 4 queijos artesanal',
      'Batata palha crocante'
    ],
    image: '/assets/aistudio/4-queijos_3b5de55e.jpg',
    badge: '4 Queijos 🧀',
  },
  {
    id: 'atlantida-prime',
    name: 'Atlântida Prime',
    tagline: 'Receita especial prime da casa com recheio cremoso farto',
    price: 13.90,
    description: 'Exclusiva receita artesanal prime assada a 220°C, farto recheio cremoso especial, queijo fundido derretido e farta cobertura de batata palha fininha super crocante.',
    ingredients: [
      'Batata assada a 220°C',
      'Recheio cremoso prime da casa',
      'Queijo fundido derretido',
      'Batata palha fina estaladiça',
      'Toque de ervas finas'
    ],
    image: '/assets/aistudio/atlantida-prime_c147f9e3.jpg',
    badge: 'Exclusivo Prime ✨',
  },
];

export const INCLUDED_DRINKS: DrinkOption[] = [
  { id: 'coca-cola', name: 'Coca-Cola Original (Lata 33cl)', brand: 'Coca-Cola', category: 'refrigerante', icon: '🥤' },
  { id: 'coca-cola-zero', name: 'Coca-Cola Zero (Lata 33cl)', brand: 'Coca-Cola', category: 'refrigerante', icon: '🥤' },
  { id: 'guarana', name: 'Guaraná Antarctica (Lata 33cl)', brand: 'Antarctica', category: 'refrigerante', icon: '🥤' },
  { id: '7up-zero', name: '7Up Zero Açúcar (Lata 33cl)', brand: '7Up', category: 'refrigerante', icon: '🍋' },
  { id: 'icetea-limao', name: 'Lipton Ice Tea Limão (Lata 33cl)', brand: 'Lipton', category: 'cha', icon: '🍋' },
  { id: 'icetea-pessego', name: 'Lipton Ice Tea Pêssego (Lata 33cl)', brand: 'Lipton', category: 'cha', icon: '🍑' },
  { id: 'agua-lisa', name: 'Água Mineral Natural (50cl)', brand: 'Luso', category: 'agua', icon: '💧' },
  { id: 'agua-gas', name: 'Água com Gás Castelo (25cl)', brand: 'Castelo', category: 'agua', icon: '🫧' },
  { id: 'super-bock', name: 'Cerveja Super Bock (Mini 20cl)', brand: 'Super Bock', category: 'cerveja', icon: '🍺' },
];

export const EXTRA_TOPPINGS: ExtraOption[] = [
  { id: 'extra-bacon', name: 'Extra Bacon Crocante', price: 1.50 },
  { id: 'extra-queijo', name: 'Extra Queijo da Ilha Gratinado', price: 1.50 },
  { id: 'extra-cheddar', name: 'Extra Cheddar Cremoso', price: 1.20 },
  { id: 'extra-palha', name: 'Extra Batata Palha Crocante', price: 1.00 },
];

export const MONTHS_LIST = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const GUIMARAES_PRESETS = [
  { name: 'Creixomil (Cozinha Forno & Recheio)', distanceKm: 0.5, freguesia: 'Creixomil' },
  { name: 'Oliveira do Castelo (Centro Histórico)', distanceKm: 1.6, freguesia: 'Oliveira do Castelo' },
  { name: 'São Paio (Largo do Toural / Centro)', distanceKm: 1.5, freguesia: 'São Paio' },
  { name: 'São Sebastião (Alameda)', distanceKm: 2.0, freguesia: 'São Sebastião' },
  { name: 'Urgezes (Estação CP Guimarães)', distanceKm: 1.9, freguesia: 'Urgezes' },
  { name: 'Azurém (Campus UMinho)', distanceKm: 2.4, freguesia: 'Azurém' },
  { name: 'Silvares (Espaço Guimarães)', distanceKm: 2.9, freguesia: 'Silvares' },
  { name: 'Fermentões', distanceKm: 3.4, freguesia: 'Fermentões' },
  { name: 'Costa / Teleférico da Penha', distanceKm: 3.5, freguesia: 'Costa' },
  { name: 'Mesão Frio', distanceKm: 3.7, freguesia: 'Mesão Frio' },
  { name: 'Polvoreira', distanceKm: 4.3, freguesia: 'Polvoreira' },
  { name: 'Candoso (São Tiago / São Martinho)', distanceKm: 3.8, freguesia: 'Candoso' },
  { name: 'Pevidém (Selho São Jorge)', distanceKm: 5.1, freguesia: 'Pevidém' },
  { name: 'Brito', distanceKm: 6.7, freguesia: 'Brito' },
  { name: 'Caldas das Taipas (Caldelas)', distanceKm: 7.4, freguesia: 'Caldas das Taipas' },
  { name: 'Ronfe', distanceKm: 7.6, freguesia: 'Ronfe' },
  { name: 'São Torcato', distanceKm: 7.9, freguesia: 'São Torcato' },
  { name: 'Moreira de Cónegos', distanceKm: 8.4, freguesia: 'Moreira de Cónegos' },
];
