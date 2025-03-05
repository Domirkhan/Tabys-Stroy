// Тросс канализация
import TrosKanalizImage1 from '../../../assets/image/plumbing/Сифон, гофра/1.8.11.1.2.jpg';
import TrosKanalizImage2 from '../../../assets/image/plumbing/Сифон, гофра/1.8.11.1.1.jpg';
import TrosKanalizImage3 from '../../../assets/image/plumbing/Сифон, гофра/1.8.11.2.1.jpg';
import TrosKanalizImage4 from '../../../assets/image/plumbing/Сифон, гофра/1.8.11.3.1.jpg';
import TrosKanalizImage5 from '../../../assets/image/plumbing/Сифон, гофра/1.8.11.4.1.jpg';

const TrosKanaliz = [
    {
        id: 38.1,
        name: "Тросс канализационный Exprofil 3м",
        pricePerUnit: {
            шт: 1050,
          },
        // oldPrice: 1050,
        image: TrosKanalizImage1,
        images: [TrosKanalizImage1, TrosKanalizImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 38.2,
        name: "Тросс канализационный 5м",
        pricePerUnit: {
            шт: 1650,
          },
        // oldPrice: 1650,
        image: TrosKanalizImage4,
        images: [TrosKanalizImage4],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 38.3,
        name: "Тросс канализационный Exprofil 7м",
        pricePerUnit: {
            шт: 2350,
          },
        // oldPrice: 2350,
        image: TrosKanalizImage5,
        images: [TrosKanalizImage5],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 38.4,
        name: "Тросс канализационный 10м",
        pricePerUnit: {
            шт: 3300,
          },
        // oldPrice: 3300,
        image: TrosKanalizImage3,
        images: [TrosKanalizImage3],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      
];
export default TrosKanaliz;