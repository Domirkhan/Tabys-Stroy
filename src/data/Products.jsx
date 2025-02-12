import duluxImage from '../assets/image/dulux.png';

const Products = [
  {
    id: 1, 
    name: "Dulux: Окна и двери",
    price: 12000,
    oldPrice: 15000,
    image: duluxImage,
    description: "Краска для окон и дверей Dulux",
    detailedDescription: "Высококачественная полуматовая краска на водной основе для окон и дверей...",
    specifications: { "Объём": "5 л", "Цвет": "Белый" },
    category: "paint", // Категория
    subCategory: "dulux" // Подкатегория
  },
  {
    id: 2, 
    name: "Dulux: Полы и лестницы ",
    price: 19000,
    oldPrice: 15000,
    image: duluxImage,
    description: "Краска для окон и дверей Dulux",
    detailedDescription: "Высококачественная полуматовая краска на водной основе для окон и дверей...",
    specifications: { "Объём": "5 л", "Цвет": "Белый" },
    category: "paint", // Категория
    subCategory: "dulux" // Подкатегория
  },
  // Добавьте остальные товары с правильными category и subCategory
];

export default Products;