import PrisoedinenieUnitazImage1 from '../../../assets/image/plumbing/Сифон, гофра/1.8.7.1.1.webp';
import PrisoedinenieUnitazImage2 from '../../../assets/image/plumbing/Сифон, гофра/1.8.7.1.2.webp';
import PrisoedinenieUnitazImage3 from '../../../assets/image/plumbing/Сифон, гофра/1.8.7.2.1.webp';
import PrisoedinenieUnitazImage4 from '../../../assets/image/plumbing/Сифон, гофра/1.8.7.2.2.webp';
import PrisoedinenieUnitazImage5 from '../../../assets/image/plumbing/Сифон, гофра/1.8.7.2.3.webp';
import PrisoedinenieUnitazImage6 from '../../../assets/image/plumbing/Сифон, гофра/1.8.7.3.1.jpg';
import PrisoedinenieUnitazImage7 from '../../../assets/image/plumbing/Сифон, гофра/1.8.7.3.2.jpg';

const PrisoedinenieUnitaz = [
    {
        id: 41.1,
        name: "Присоединение к унитазу 110/87 Политэк",
        pricePerUnit: {
            шт: 1700,
            },
        // oldPrice: 1700,
        image: PrisoedinenieUnitazImage3,
        images: [PrisoedinenieUnitazImage3, PrisoedinenieUnitazImage4, PrisoedinenieUnitazImage5],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 41.2,
        name: "Присоединение к унитазу 110/45 Политэк",
        pricePerUnit: {
            шт: 1700,
            },
        // oldPrice: 1700,
        image: PrisoedinenieUnitazImage1,
        images: [PrisoedinenieUnitazImage1, PrisoedinenieUnitazImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 41.3,
        name: "Присоединение к унитазу 110 Прямое. Политэк",
        pricePerUnit: {
            шт: 1500,
            },
        // oldPrice: 1500,
        image: PrisoedinenieUnitazImage6,
        images: [PrisoedinenieUnitazImage6, PrisoedinenieUnitazImage7],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
];
export default PrisoedinenieUnitaz;