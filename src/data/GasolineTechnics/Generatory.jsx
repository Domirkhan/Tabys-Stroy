import GeneratoryImage1 from '../../assets/image/GasolineTechnics/Генераторы/5.1.1.1.jpg';
import GeneratoryImage2 from '../../assets/image/GasolineTechnics/Генераторы/5.1.2.1.jpg';


const Generatory =[
    {
        id: 77.1,
        name:  "Генератор Makute MK9500M DUAL 7.5 кВт",
        pricePerUnit: {
            шт: 359990,
            },
        // oldPrice: 445000,
        image: GeneratoryImage1,
        images: [GeneratoryImage1],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "gasoline-technics", // Категория
        subCategory: "Генераторы", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
    },
    {
        id: 77.2,
        name:  "Генератор Makute MK3500M 2.8 кВт",
        pricePerUnit: {
            шт: 135990,
            },
        // oldPrice: 196000,
        image: GeneratoryImage2,
        images: [GeneratoryImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "gasoline-technics", // Категория
        subCategory: "Генераторы", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
    },
]

export default Generatory;