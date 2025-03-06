import GofraUnitazImage1 from '../../../assets/image/plumbing/Сифон, гофра/1.8.6.1.1.jpg';
import GofraUnitazImage2 from '../../../assets/image/plumbing/Сифон, гофра/1.8.6.1.2.jpg';
import GofraUnitazImage3 from '../../../assets/image/plumbing/Сифон, гофра/1.8.6.1.3.jpg';
import GofraUnitazImage4 from '../../../assets/image/plumbing/Сифон, гофра/1.8.6.2.1.jpg';
import GofraUnitazImage5 from '../../../assets/image/plumbing/Сифон, гофра/1.8.6.2.2.jpg';
import GofraUnitazImage6 from '../../../assets/image/plumbing/Сифон, гофра/1.8.6.2.3.jpg';
import GofraUnitazImage7 from '../../../assets/image/plumbing/Сифон, гофра/1.8.6.3.1.jpg';
import GofraUnitazImage9 from '../../../assets/image/plumbing/Сифон, гофра/1.8.6.3.2.jpeg';
import GofraUnitazImage8 from '../../../assets/image/plumbing/Сифон, гофра/1.8.6.3.3.webp';

const GofraUnitaz = [
    {
            id: 40.1,
            name: "Гофра для унитаза NOVA 7012 500mm",
            pricePerUnit: {
                шт: 1700,
                },
            // oldPrice: 1700,
            image: GofraUnitazImage1,//suret jok import jok dobavit nado
            images: [GofraUnitazImage1, GofraUnitazImage2, GofraUnitazImage3],
            // description: "Краска для окон и дверей Dulux",
            detailedDescription: "",
            specifications: { },
            category: "plumbing", // Категория
            subCategory: "Ванны и комплектующие", // Подкатегория
            availability: "Есть в наличии"  // Новое поле для статуса наличия
          },
          {
            id: 40.2,
            name: "Гофра для унитаза NOVA 7013 350mm",
            pricePerUnit: {
                шт: 1600,
                },
            // oldPrice: 1600,
            image: GofraUnitazImage4,
            images: [GofraUnitazImage4, GofraUnitazImage5, GofraUnitazImage6],
            // description: "Краска для окон и дверей Dulux",
            detailedDescription: "",
            specifications: { },
            category: "plumbing", // Категория
            subCategory: "Ванны и комплектующие", // Подкатегория
            availability: "Есть в наличии"  // Новое поле для статуса наличия
          },
          {
            id: 40.3,
            name: "Гофрированный удлинитель для унитаза NOVA 7044 500mm",
            pricePerUnit: {
                шт: 2000,
                },
            // oldPrice: 2000,
            image: GofraUnitazImage7,
            images: [GofraUnitazImage7, GofraUnitazImage8, GofraUnitazImage9],
            // description: "Краска для окон и дверей Dulux",
            detailedDescription: "",
            specifications: { },
            category: "plumbing", // Категория
            subCategory: "Ванны и комплектующие", // Подкатегория
            availability: "Есть в наличии"  // Новое поле для статуса наличия
          },
];
export default GofraUnitaz;