import duluxImage1 from '../assets/image/dulux.png';
import duluxImage2 from '../assets/image/dulux-poli.png';
import sanMaritoImage1 from '../assets/image/san-marito-ottocenture.png';

const Products = [
  {
    id: 1, 
    name: "Dulux: Окна и двери",
    price: 12000,
    oldPrice: 15000,
    image: duluxImage1,
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
    image: duluxImage2,
    description: "Краска для окон и дверей Dulux",
    detailedDescription: "Высококачественная полуматовая краска на водной основе для окон и дверей...",
    specifications: { "Объём": "5 л", "Цвет": "Белый" },
    category: "paint", // Категория
    subCategory: "dulux" // Подкатегория
  },
  {
    id: 3, 
    name: " San-Marito OTTOCENTURE BIANCO",
    price: 14500,
    oldPrice: 15000,
    image: sanMaritoImage1,
    description: "Краска для стен Эффект белого шёлка",
    detailedDescription: "Глубокая необычная структура краски Ottocenture Bianco подчеркнет элегантность классического интерьера, добавит изысканности шелковыми переливами",
    specifications: { "Базовый цвет": "белый (колеруется в светлые и темные тона)", 
    "Основа для нанесения": "декоративное покрытие наносится на идеально ровную поверхность.",
    "Время высыхания": "1-2 ч при t°С от +20°С и влажности до 65%. Полная полимеризация через 7 суток с момента высыхания при соблюдении условий применения."},
    category: "paint", // Категория
    subCategory: "san-marito" // Подкатегория
  },
];

export default Products;