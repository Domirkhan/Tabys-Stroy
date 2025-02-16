import trubaImage1 from '../assets/image/plumbing/Трубы/1.1.1.png';
import duluxImage1 from '../assets/image/paint/dulux/dulux.png';
import duluxImage2 from '../assets/image/paint/dulux/dulux-poli.png';
import sanMaritoImage1 from '../assets/image/paint/san-marito/san-marito-ottocenture.png';
import sanMaritoImage2 from '../assets/image/paint/san-marito/san-marito-perfetto.png';


const Products = [
  //Сантехника
  //Трубы
  {
    id: 1,
    name: "Труба ППР  белый Jakko 20 мм",
    price: 280,
    // oldPrice: 300,
    image: trubaImage1,
    images: [trubaImage1, trubaImage1],
    // description: "Краска для окон и дверей Dulux",
    detailedDescription: "Трубы и фасонные изделия из полипропилена (ПП — Полипропилен) предназначены для прокладки внутренних систем холодного и горячего водоснабжения, а также отопления. Трубы ППР отличаются высокой прочностью, устойчивостью к воздействию агрессивных сред, долговечностью и простотой монтажа.",
    specifications: { "Наружный диаметр": "20 mm", "Длина отрезка": "4 м", "Цвет": "Белый", "Толщина стенки (мм)": "2.8" },
    category: "plumbing", // Категория
    subCategory: "Трубы", // Подкатегория
    availability: "Есть в наличии"  // Новое поле для статуса наличия
  },
  {
    id: 2,
    name: "Труба ППР  белый Jakko 25 мм",
    price: 470,
    // oldPrice: 300,
    image: trubaImage1,
    images: [trubaImage1, trubaImage1],
    // description: "Краска для окон и дверей Dulux",
    detailedDescription: "Трубы и фасонные изделия из полипропилена (ПП — Полипропилен) предназначены для прокладки внутренних систем холодного и горячего водоснабжения, а также отопления. Трубы ППР отличаются высокой прочностью, устойчивостью к воздействию агрессивных сред, долговечностью и простотой монтажа.",
    specifications: { "Наружный диаметр": "25 mm", "Длина отрезка": "4 м", "Цвет": "Белый", "Толщина стенки (мм)": "3.5" },
    category: "plumbing", // Категория
    subCategory: "Трубы", // Подкатегория
    availability: "Есть в наличии"  // Новое поле для статуса наличия
  },
  {
    id: 3,
    name: "Труба ППР  белый Jakko 32 мм",
    price: 720,
    // oldPrice: 300,
    image: trubaImage1,
    images: [trubaImage1, trubaImage1],
    // description: "Краска для окон и дверей Dulux",
    detailedDescription: "Трубы и фасонные изделия из полипропилена (ПП — Полипропилен) предназначены для прокладки внутренних систем холодного и горячего водоснабжения, а также отопления. Трубы ППР отличаются высокой прочностью, устойчивостью к воздействию агрессивных сред, долговечностью и простотой монтажа.",
    specifications: { "Наружный диаметр": "32 mm", "Длина отрезка": "4 м", "Цвет": "Белый", "Толщина стенки (мм)": "4.4" },
    category: "plumbing", // Категория
    subCategory: "Трубы", // Подкатегория
    availability: "Есть в наличии"  // Новое поле для статуса наличия
  },
  {
    id: 4,
    name: "Труба ППР  белый Jakko 40 мм",
    price: 1360,
    // oldPrice: 300,
    image: trubaImage1,
    images: [trubaImage1, trubaImage1],
    // description: "Краска для окон и дверей Dulux",
    detailedDescription: "Трубы и фасонные изделия из полипропилена (ПП — Полипропилен) предназначены для прокладки внутренних систем холодного и горячего водоснабжения, а также отопления. Трубы ППР отличаются высокой прочностью, устойчивостью к воздействию агрессивных сред, долговечностью и простотой монтажа.",
    specifications: { "Наружный диаметр": "40 mm", "Длина отрезка": "4 м", "Цвет": "Белый", "Толщина стенки (мм)": "5.5" },
    category: "plumbing", // Категория
    subCategory: "Трубы", // Подкатегория
    availability: "Есть в наличии"  // Новое поле для статуса наличия
  },
];

export default Products;