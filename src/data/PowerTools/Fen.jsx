import FenImage1 from '../../assets/image/PowerTool/Фены/3.8.1.1.jpg';
import FenImage2 from '../../assets/image/PowerTool/Фены/3.8.2.1.png';
import FenImage3 from '../../assets/image/PowerTool/Фены/3.8.3.1.png';


const Fen =[
    {
            id: 67.1,
            name:  "Фен Makute HG002 600C 2000W",
            pricePerUnit: {
                шт: 28000,
                },
            // oldPrice: 28000,
            image: FenImage1,
            images: [FenImage1],
            // description: "Краска для окон и дверей Dulux",
            detailedDescription: "",
            specifications: { },
            category: "power-tools", // Категория
            subCategory: "Фены строительные", // Подкатегория
            availability: "Есть в наличии"  // Новое поле для статуса наличия
        },
    {
            id: 67.2,
            name:  "Фен Makute HG001 550с 1800W",
            pricePerUnit: {
                шт: 17990,
                },
            // oldPrice: 18000,
            image: FenImage2,
            images: [FenImage2],
            // description: "Краска для окон и дверей Dulux",
            detailedDescription: "",
            specifications: { },
            category: "power-tools", // Категория
            subCategory: "Фены строительные", // Подкатегория
            availability: "Есть в наличии"  // Новое поле для статуса наличия
        },
    {
            id: 67.3,
            name:  "Фен Makute HG121",
            pricePerUnit: {
                шт: 10990,
                },
            // oldPrice: 11000,
            image: FenImage3,
            images: [FenImage3],
            // description: "Краска для окон и дверей Dulux",
            detailedDescription: "",
            specifications: { },
            category: "power-tools", // Категория
            subCategory: "Фены строительные", // Подкатегория
            availability: "Есть в наличии"  // Новое поле для статуса наличия
        },
];
export default Fen;