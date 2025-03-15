
import LustraImage1 from '../../assets/image/Lighting/Люстра/7.3.1.1.png';
import LustraImage2 from '../../assets/image/Lighting/Люстра/7.3.1.2.jpg';



const Lustra =[
    {
        id: 102.1,
        name:  "Люстра QS99651-600 L",
        pricePerUnit: {
            шт: 42500,
            },
        // oldPrice: 42500,
        image: LustraImage1,
        images: [LustraImage1, LustraImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "Lighting", // Категория
        subCategory: "Люстры", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
    },
    
]

export default Lustra;