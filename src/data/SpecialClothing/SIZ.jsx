
import  RespiratorImage1 from '../../assets/image/SpecialClothing/СИЗ/16.3.1.1.webp';
import  RespiratorImage2 from '../../assets/image/SpecialClothing/СИЗ/16.3.1.2.webp';





const SIZ =[
    {
        id: 170.1,
        name:  "Респиратор 95",
        pricePerUnit: {
            шт: 270,
            },
        // oldPrice: 270,
        image: RespiratorImage1,
        images: [RespiratorImage1, RespiratorImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "special-clothing", // Категория
        subCategory: "Средства защиты и респираторы", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
    },
    
]

export default SIZ;
