// Кранбукса
import KranbuxaImage1 from '../../../assets/image/plumbing/Фитинги/1.7.1.21.1.jpg';
import KranbuxaImage2 from '../../../assets/image/plumbing/Фитинги/1.7.1.21.2.jpg';
import KranbuxaImage3 from '../../../assets/image/plumbing/Фитинги/1.7.1.22.1.jpg';
import KranbuxaImage4 from '../../../assets/image/plumbing/Фитинги/1.7.1.23.1.jpg';

const KranBox = [
     // Кран букса
      {
        id: 31.1,
        name: "Кран-букса для смесителя 1/2''",
        pricePerUnit: {
            шт: 1000,
          },
        // oldPrice: 0,
        image: KranbuxaImage2,
        images: [KranbuxaImage2, KranbuxaImage1],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Смесители для ванной и кухни", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 31.2,
        name: "Кран-букса для смесителя прозрачный''",
        pricePerUnit: {
            шт: 1000,
          },
        // oldPrice: 0,
        image: KranbuxaImage3,
        images: [KranbuxaImage3],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Смесители для ванной и кухни", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 31.3,
        name: "Кран-букса для смесителя синий''",
        pricePerUnit: {
            шт: 1000,
          },
        // oldPrice: 0,
        image: KranbuxaImage4,
        images: [KranbuxaImage4],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Фитинги", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
];
export default KranBox;