import MuftametalllImage1 from '../../../assets/image/plumbing/Фитинги/1.5.1.10(1).jpg';
import MuftametalllImage2 from '../../../assets/image/plumbing/Фитинги/1.5.1.10(2).jpg';
import MuftametalllImage5 from '../../../assets/image/plumbing/Фитинги/1.5.1.12(1).jpg';
import MuftametalllImage6 from '../../../assets/image/plumbing/Фитинги/1.5.1.12(2).jpg';

const MuftaMetall = [
    {
        id: 24.1,
        name: "Муфта внутр. резьба 20''",
        pricePerUnit: {
          шт: 660,
        },
        // oldPrice: 660,
        image: MuftametalllImage1,
        images: [MuftametalllImage1, MuftametalllImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Переходники, ниппеля", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 24.2,
        name: "Муфта внутр. резьба 25''",
        pricePerUnit: {
          шт: 750,
        },
        // oldPrice: 750,
        image: MuftametalllImage5,
        images: [MuftametalllImage5, MuftametalllImage6],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Переходники, ниппеля", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
];

export default MuftaMetall;