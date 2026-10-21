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
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    badge: 'Mais Pedido ★',
    bestseller: true,
  },
  {
    id: 'meatlove',
    name: 'MeatLove',
    tagline: 'Para os verdadeiros amantes de carne e queijo gratinado',
    price: 13.90,
    description: 'Carne moída nobre selecionada estufada lentamente em molho artesanal de tomate e especiarias, fatias de bacon fumado crocante e capa dourada de queijo gratinado a 220°C.',
    ingredients: [
      'Batata assada com crosta dourada',
      'Carne picada de novilho apurada ao molho artesanal',
      'Fatias de bacon crocante fumado',
      'Mussarela e queijo gratinado no forno a 220°C',
      'Toque de orégãos aromáticos'
    ],
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
    badge: 'Favorito do Chef 🔥',
    bestseller: true,
  },
  {
    id: 'baconcrisp',
    name: 'BaconCrisp',
    tagline: 'Cheddar cremoso irresistível e dobro de bacon',
    price: 12.90,
    description: 'Generosa porção de dobro de bacon crocante estaladiço, derretido em cheddar legítimo aveludado e salpicado com cebolinho fresco acabado de colher.',
    ingredients: [
      'Batata assada fumegante a 220°C',
      'Dobro de bacon crocante fatiado',
      'Cheddar cremoso legítimo',
      'Queijo fundido artesanal',
      'Cebolinho fresco picado'
    ],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    badge: 'Ultra Crocante 🥓',
  },
  {
    id: 'queijosnobres',
    name: 'Queijos Nobres',
    tagline: 'Fusão irresistível de mussarela e queijo da ilha açoriano',
    price: 11.90,
    description: 'Combinação nobre e equilibrada de mussarela derretida em abundância, queijo curado da Ilha de São Jorge ralado na hora e orégãos aromáticos do campo.',
    ingredients: [
      'Batata rústica assada a 220°C',
      'Mussarela de alta fusão derretida',
      'Queijo da Ilha de São Jorge DOP ralado',
      'Creme de queijos da quinta',
      'Orégãos silvestres aromáticos'
    ],
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    badge: 'Sabor Tradicional 🧀',
  },
];

export const INCLUDED_DRINKS: DrinkOption[] = [
  { id: 'coca-cola', name: 'Coca-Cola Original (Lata 33cl)', brand: 'Coca-Cola', category: 'refrigerante', icon: '🥤' },
  { id: 'coca-cola-zero', name: 'Coca-Cola Zero (Lata 33cl)', brand: 'Coca-Cola', category: 'refrigerante', icon: '🥤' },
  { id: 'guarana', name: 'Guaraná Antarctica (Lata 33cl)', brand: 'Antarctica', category: 'refrigerante', icon: '🥤' },
  { id: 'icetea-pessego', name: 'Ice Tea Pêssego (Lata 33cl)', brand: 'Lipton', category: 'cha', icon: '🍑' },
  { id: 'icetea-limao', name: 'Ice Tea Limão (Lata 33cl)', brand: 'Lipton', category: 'cha', icon: '🍋' },
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
