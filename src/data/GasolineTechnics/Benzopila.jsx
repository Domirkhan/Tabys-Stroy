import BenzopilaImage1 from '../../assets/image/GasolineTechnics/Бензопила/5.2.1.1.jpg';
import BenzopilaImage2 from '../../assets/image/GasolineTechnics/Бензопила/5.2.1.2.jpg';


const Benzopila =[
    {
        id: 78.1,
        name:  "Бензопила GRAD CS5820",
        pricePerUnit: {
            шт: 29990,
            },
        // oldPrice: 35000,
        image: BenzopilaImage1,
        images: [BenzopilaImage1, BenzopilaImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "gasoline-technics", // Категория
        subCategory: "Бензопилы", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
    },
    
]

export default Benzopila;