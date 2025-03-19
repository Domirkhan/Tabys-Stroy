
import  VhodDoorImage1 from '../../assets/image/Doors/МеталВходДвери/14.2.1.1.jpg';
import  VhodDoorImage2 from '../../assets/image/Doors/МеталВходДвери/14.2.1.2.jpg';




const VhodDoor =[
    {
        id: 157.1,
        name:  "Дверь металлическая Аргус 3К Феникс блек 870",
        pricePerUnit: {
            шт: 199900,
            },
        // oldPrice: 200000,
        image: VhodDoorImage1,
        images: [VhodDoorImage1, VhodDoorImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "doors", // Категория
        subCategory: "Металлические входные двери", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
    },
    
]

export default VhodDoor;