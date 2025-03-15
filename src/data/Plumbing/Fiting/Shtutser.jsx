// Штуцер
import ShtutserImage1 from '../../../assets/image/plumbing/Фитинги/1.7.1.18.1.jpg';
import ShtutserImage2 from '../../../assets/image/plumbing/Фитинги/1.7.1.18.2.jpg';
import ShtutserImage3 from '../../../assets/image/plumbing/Фитинги/1.7.1.19.1.jpg';
import ShtutserImage4 from '../../../assets/image/plumbing/Фитинги/1.7.1.19.2.jpg';
import ShtutserImage5 from '../../../assets/image/plumbing/Фитинги/1.7.1.20.1.jpg';
import ShtutserImage6 from '../../../assets/image/plumbing/Фитинги/1.7.1.20.2.jpg';

const Shtutser = [
     // Штуцер
      {
        id: 30.1,
        name: "Штуцер 15 наруж. резьба (2000)",
        pricePerUnit: {
            шт: 100,
          },
        // oldPrice: 100,
        image: ShtutserImage1,
        images: [ShtutserImage1, ShtutserImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Переходники, ниппеля", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 30.2,
        name: "Штуцер 15 внутр. резьба",
        pricePerUnit: {
            шт: 100,
          },
        // oldPrice: 100,
        image: ShtutserImage3,
        images: [ShtutserImage3, ShtutserImage4],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Переходники, ниппеля", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 30.3,
        name: "Штуцер 15 внутр. резьба белый",
        pricePerUnit: {
            шт: 350,
          },
        // oldPrice: 350,
        image: ShtutserImage5,
        images: [ShtutserImage5, ShtutserImage6],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Переходники, ниппеля", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
];

export default Shtutser;