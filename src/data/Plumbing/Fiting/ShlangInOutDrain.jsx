// Шланг залив, дренаж и др
import ShlangZalivImage1 from '../../../assets/image/plumbing/Сифон, гофра/1.8.9.1.1.jpg';
import ShlangZalivImage2 from '../../../assets/image/plumbing/Сифон, гофра/1.8.9.1.2.jpg';
import ShlangZalivImage3 from '../../../assets/image/plumbing/Сифон, гофра/1.8.9.2.1.webp';
import ShlangZalivImage4 from '../../../assets/image/plumbing/Сифон, гофра/1.8.9.2.2.webp';
import ShlangZalivImage5 from '../../../assets/image/plumbing/Сифон, гофра/1.8.9.3.1.webp';
import ShlangZalivImage6 from '../../../assets/image/plumbing/Сифон, гофра/1.8.9.3.2.jpg';
import ShlangZalivImage7 from '../../../assets/image/plumbing/Сифон, гофра/1.8.9.4.1.webp';
import ShlangSlivImage1 from '../../../assets/image/plumbing/Сифон, гофра/1.8.10.1.1.jpg';
import ShlangSlivImage2 from '../../../assets/image/plumbing/Сифон, гофра/1.8.10.1.2.webp';
import ShlangSlivImage3 from '../../../assets/image/plumbing/Сифон, гофра/1.8.10.2.1.jpg';
import ShlangSlivImage4 from '../../../assets/image/plumbing/Сифон, гофра/1.8.10.3.1.jpg';

const ShlangInOutDrain = [
    {
        id: 37.1,
        name: "Шланг заливной ТВХ 500 1,5м",
        pricePerUnit: {
          шт: 1400,
        },
        // oldPrice: 1400,
        image: ShlangZalivImage1,
        images: [ShlangZalivImage1, ShlangZalivImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 37.2,
        name: "Шланг заливной ТВХ 500 2м",
        pricePerUnit: {
          шт: 1600,
        },
        // oldPrice: 1600,
        image: ShlangZalivImage3,
        images: [ShlangZalivImage3, ShlangZalivImage4],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 37.3,
        name: "Шланг заливной ТВХ 500 2,5м",
        pricePerUnit: {
          шт: 1900,
        },
        // oldPrice: 1900,
        image: ShlangZalivImage5,
        images: [ShlangZalivImage5, ShlangZalivImage6],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 37.4,
        name: "Шланг заливной ТВХ 500 3м",
        pricePerUnit: {
          шт: 2100,
        },
        // oldPrice: 2100,
        image: ShlangZalivImage7,
        images: [ShlangZalivImage7, ShlangZalivImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id:  37.5,
        name: "Шланг сливной 2м",
        pricePerUnit: {
          шт: 1100,
        },
        // oldPrice: 1100,
        image: ShlangSlivImage1,
        images: [ShlangSlivImage1, ShlangSlivImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 37.6,
        name: "Шланг сливной 2,5м",
        pricePerUnit: {
          шт: 1300,
        },
        // oldPrice: 1300,
        image: ShlangSlivImage3,
        images: [ShlangSlivImage3, ShlangSlivImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 37.7,
        name: "Шланг сливной 3м",
        pricePerUnit: {
          шт: 1400,
        },
        // oldPrice: 1400,
        image: ShlangSlivImage4,
        images: [ShlangSlivImage4, ShlangSlivImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
];

export default ShlangInOutDrain;