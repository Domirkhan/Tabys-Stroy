// Кран Маевского
import KranmaevskogolImage1 from '../../../assets/image/plumbing/Фитинги/1.5.1.8(1).jpg';
import KranmaevskogolImage2 from '../../../assets/image/plumbing/Фитинги/1.5.1.8(2).jpg';

const KranMaevskogo = [
      {
        id: 25.1,
        name: " Кран Маевского 1/2''",
        pricePerUnit: {
          шт: 250,
        },
        // oldPrice: 500,
        image: KranmaevskogolImage1,
        images: [KranmaevskogolImage1],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Фитинги", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 25.2,
        name: " Кран Маевского 3/4''",
        pricePerUnit: {
          шт: 500,
        },
        // oldPrice: 500,
        image: KranmaevskogolImage2,
        images: [KranmaevskogolImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Фитинги", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
];
export default KranMaevskogo;