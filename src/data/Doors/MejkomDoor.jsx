
import  MejkomDoorImage1 from '../../assets/image/Doors/МежкомДвери/14.1.1.1.jpg';
import  MejkomDoorImage2 from '../../assets/image/Doors/МежкомДвери/14.1.1.2.jpg';



const MejkomDoor =[
    {
        id: 156.1,
        name:  "Дверь межком. Скандия Белый шелк 800мм",
        pricePerUnit: {
            шт: 30000,
            },
        // oldPrice: 30000,
        image: MejkomDoorImage1,
        images: [MejkomDoorImage1, MejkomDoorImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "doors", // Категория
        subCategory: "Межкомнатные двери", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
    },
    
]

export default MejkomDoor;