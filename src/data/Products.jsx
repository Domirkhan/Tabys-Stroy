import duluxImage1 from '../assets/image/paint/dulux/dulux.png';
import duluxImage2 from '../assets/image/paint/dulux/dulux-poli.png';
import sanMaritoImage1 from '../assets/image/paint/san-marito/san-marito-ottocenture.png';
import sanMaritoImage2 from '../assets/image/paint/san-marito/san-marito-perfetto.png';


const Products = [
  //Краска
  //Dulux
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
    subCategory: "Dulux"// Подкатегория
  },
  {
    id: 2, 
    name: "Dulux: Полы и лестницы ",
    price: 19000,
    oldPrice: 15000,
    image: duluxImage2,
    description: "Краска для пола и лестницы Dulux",
    detailedDescription: "Высококачественная полуматовая краска на водной основе для окон и дверей...",
    specifications: { "Объём": "5 л", "Цвет": "Белый" },
    category: "paint", // Категория
    subCategory: "Dulux" // Подкатегория
  },
  //San-Marito
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
    subCategory: "San Marito" // Подкатегория
  },
  {
    id: 4, 
    name: "San Marito Sahara Perfetto Argento",
    price: 25000,
    oldPrice: 15000,
    image: sanMaritoImage2,
    description: "Краска для стен Эффект белого шёлка",
    detailedDescription: "Купить Краска San Marito Sahara Perfetto Argento Z216CK03 декоративная с эффектом светоотражающего песка (3 кг), которая легко наносится, укрывается одним слоем и идеально подходит для покрытий стен и потолков. Краска San Marito Sahara Perfetto Argento Z216CK03 декоративная с эффектом светоотражающего песка (3 кг) в наличии с доставкой в ​​СПб и Москве. Характеристики позволяют использовать ее в любом интерьере — от детской до гостиной.",
    specifications: { "Помещения": "Ванная, Гостиная, Офис, Спальня, Холл", 
    "Основа для нанесения": "декоративное покрытие наносится на идеально ровную поверхность.",
    "Время высыхания": "1-2 ч при t°С от +20°С и влажности до 65%. Полная полимеризация через 7 суток с момента высыхания при соблюдении условий применения."},
    category: "paint", // Категория
    subCategory: "San Marito" // Подкатегория
  },
];

export default Products;