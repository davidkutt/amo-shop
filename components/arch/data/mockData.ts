export interface Product {
  id: string;
  name: string;
  price: number;
  imageSource: any;
  description: string;
  category: string;
}
export interface CartItemData extends Product {
    quantity: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '28',
    name: 'Veganes Mandel-Croissant (Stück)',
    price: 3.49,
    imageSource: require('../my-app/assets/images/products/product17.png'),
    description: 'Feine Backwaren',
    category: 'Feine Backwaren'
  },
  {
    id: '4',
    name: 'Vegane Salsiccia nach italienischer Art (200g)',
    price: 5.49,
    imageSource: require('../my-app/assets/images/products/product3.png'),
    description: 'Bestseller',
    category: 'Bestseller'
  },
  // Neuheiten (New Arrivals)
  {
    id: '1',
    name: 'Fermentierter Cashew-Camembert mit Trüffelöl',
    price: 8.99,
    imageSource: require('../my-app/assets/images/products/product2.png'),
    description: 'Neuheit',
    category: 'Neuheiten'
  },
  {
    id: '2',
    name: 'Vegane Steak-Alternative (150g)',
    price: 7.49,
    imageSource: require('../my-app/assets/images/products/product5.png'),
    description: 'Neuheit',
    category: 'Neuheiten'
  },
  {
    id: '3',
    name: 'Pflanzliche Mozzarella-Kugeln in Lake (200g)',
    price: 6.99,
    imageSource: require('../my-app/assets/images/products/product3.png'),
    description: 'Neuheit',
    category: 'Neuheiten'
  },

  // Bestseller (Best Sellers)

  {
    id: '5',
    name: 'Vegane Bratwurst "Original" (4 Stk.)',
    price: 4.99,
    imageSource: require('../my-app/assets/images/products/product3.png'),
    description: 'Bestseller',
    category: 'Bestseller'
  },
  {
    id: '6',
    name: 'Pflanzliche Nuggets "Crispy" (250g)',
    price: 5.99,
    imageSource: require('../my-app/assets/images/products/product2.png'),
    description: 'Bestseller',
    category: 'Bestseller'
  },

  // Angebote (On Sale)
  {
    id: '7',
    name: 'Geräuchertes Paprika-Mandel Pesto (180g)',
    price: 4.79,
    imageSource: require('../my-app/assets/images/products/product3.png'),
    description: 'Angebot',
    category: 'Angebote'
  },
  {
    id: '8',
    name: 'Vegane Bolognese-Sauce (350g)',
    price: 3.99,
    imageSource: require('../my-app/assets/images/products/product4.png'),
    description: 'Angebot',
    category: 'Angebote'
  },
  {
    id: '9',
    name: 'Pflanzlicher Frischkäse mit Kräutern (150g)',
    price: 2.99,
    imageSource: require('../my-app/assets/images/products/product1.png'),
    description: 'Angebot',
    category: 'Angebote'
  },

  // Pflanzliches Fleisch & Meeresfrüchte
  {
    id: '10',
    name: 'Veganes "Thunfisch"-Steak aus Erbsenprotein (180g)',
    price: 7.99,
    imageSource: require('../my-app/assets/images/products/product4.png'),
    description: 'Pflanzliches Fleisch',
    category: 'Pflanzliches Fleisch & Meeresfrüchte'
  },
  {
    id: '11',
    name: 'Vegane "Lachs"-Filets aus Algen (200g)',
    price: 8.49,
    imageSource: require('../my-app/assets/images/products/product2.png'),
    description: 'Pflanzliches Fleisch',
    category: 'Pflanzliches Fleisch & Meeresfrüchte'
  },
  {
    id: '12',
    name: 'Pflanzliche Burger-Patties "Classic" (4 Stk.)',
    price: 6.99,
    imageSource: require('../my-app/assets/images/products/product3.png'),
    description: 'Pflanzliches Fleisch',
    category: 'Pflanzliches Fleisch & Meeresfrüchte'
  },

  // Pflanzlicher Käse
  {
    id: '13',
    name: 'Handgemachte Blauschimmel-Alternative auf Mandelbasis (150g)',
    price: 9.49,
    imageSource: require('../my-app/assets/images/products/product1.png'),
    description: 'Pflanzlicher Käse',
    category: 'Pflanzlicher Käse'
  },
  {
    id: '14',
    name: 'Vegane Gouda-Alternative "Aged" (200g)',
    price: 7.99,
    imageSource: require('../my-app/assets/images/products/product4.png'),
    description: 'Pflanzlicher Käse',
    category: 'Pflanzlicher Käse'
  },
  {
    id: '15',
    name: 'Pflanzlicher Feta-Style auf Kokosbasis (150g)',
    price: 6.49,
    imageSource: require('../my-app/assets/images/products/product2.png'),
    description: 'Pflanzlicher Käse',
    category: 'Pflanzlicher Käse'
  },

  // Geschenke & Körbe
  {
    id: '16',
    name: 'Vegane Pralinen-Selektion "V-Luxe Edition" (12 Stk.)',
    price: 14.95,
    imageSource: require('../my-app/assets/images/products/product2.png'),
    description: 'Geschenkidee',
    category: 'Geschenke & Körbe'
  },
  {
    id: '17',
    name: 'Vegane Genuss-Box "Deluxe"',
    price: 29.99,
    imageSource: require('../my-app/assets/images/products/product3.png'),
    description: 'Geschenkidee',
    category: 'Geschenke & Körbe'
  },
  {
    id: '18',
    name: 'Pflanzlicher Käse-Sortiment "Gourmet"',
    price: 24.99,
    imageSource: require('../my-app/assets/images/products/product1.png'),
    description: 'Geschenkidee',
    category: 'Geschenke & Körbe'
  },

  // Für Gäste & Platten
  {
    id: '19',
    name: 'Champignon-Walnuss Pastete (150g)',
    price: 6.49,
    imageSource: require('../my-app/assets/images/products/product3.png'),
    description: 'Für Gäste',
    category: 'Für Gäste & Platten'
  },
  {
    id: '20',
    name: 'Vegane Antipasti-Platte (250g)',
    price: 12.99,
    imageSource: require('../my-app/assets/images/products/product4.png'),
    description: 'Für Gäste',
    category: 'Für Gäste & Platten'
  },
  {
    id: '21',
    name: 'Pflanzliche Tapas-Auswahl (300g)',
    price: 15.99,
    imageSource: require('../my-app/assets/images/products/product2.png'),
    description: 'Für Gäste',
    category: 'Für Gäste & Platten'
  },

  // Glutenfrei
  {
    id: '22',
    name: 'Glutenfreies Sauerteigbrot mit Saaten (500g)',
    price: 5.99,
    imageSource: require('../my-app/assets/images/products/product4.png'),
    description: 'Glutenfrei',
    category: 'Glutenfrei'
  },
  {
    id: '23',
    name: 'Glutenfreie Pizza-Basis (2 Stk.)',
    price: 4.99,
    imageSource: require('../my-app/assets/images/products/product1.png'),
    description: 'Glutenfrei',
    category: 'Glutenfrei'
  },
  {
    id: '24',
    name: 'Glutenfreie Nudeln aus Linsen (250g)',
    price: 3.99,
    imageSource: require('../my-app/assets/images/products/product3.png'),
    description: 'Glutenfrei',
    category: 'Glutenfrei'
  },

  // Schokolade & Süßes
  {
    id: '25',
    name: 'Dunkle Schokolade 85% mit Fleur de Sel (100g)',
    price: 4.99,
    imageSource: require('../my-app/assets/images/products/product1.png'),
    description: 'Schokolade',
    category: 'Schokolade & Süßes'
  },
  {
    id: '26',
    name: 'Vegane Karamell-Pralinen (8 Stk.)',
    price: 6.99,
    imageSource: require('../my-app/assets/images/products/product2.png'),
    description: 'Schokolade',
    category: 'Schokolade & Süßes'
  },
  {
    id: '27',
    name: 'Pflanzliche Nougat-Creme (200g)',
    price: 5.49,
    imageSource: require('../my-app/assets/images/products/product4.png'),
    description: 'Schokolade',
    category: 'Schokolade & Süßes'
  },

  // Feine Backwaren

  {
    id: '29',
    name: 'Pflanzliche Zimtschnecke (Stück)',
    price: 3.99,
    imageSource: require('../my-app/assets/images/products/product3.png'),
    description: 'Feine Backwaren',
    category: 'Feine Backwaren'
  },
  {
    id: '30',
    name: 'Veganes Apfelstrudel (Stück)',
    price: 4.49,
    imageSource: require('../my-app/assets/images/products/product1.png'),
    description: 'Feine Backwaren',
    category: 'Feine Backwaren'
  }
];
export const MOCK_CART_ITEMS: CartItemData[] = [
    {
      ...MOCK_PRODUCTS[0],
        quantity: 2
    },
    {
        ...MOCK_PRODUCTS[1],
            quantity: 1
        },

];
