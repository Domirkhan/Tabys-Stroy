
import  RuchkaVhodnImage1 from '../../assets/image/Doors/РучкиДверь/14.4.1.1.jpg';
import  RuchkaVhodnImage2 from '../../assets/image/Doors/РучкиДверь/14.4.1.2.jpg';





const RuchkaVhodn =[
    {
        id: 159.1,
        name:  "Ручка дверная STR-412 SN/CP",
        pricePerUnit: {
            шт: 2590,
            },
        // oldPrice: 2900,
        image: RuchkaVhodnImage1,
        images: [RuchkaVhodnImage1, RuchkaVhodnImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "doors", // Категория
        subCategory: "Ручки для входных дверей", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
    },
    
]

export default RuchkaVhodn;