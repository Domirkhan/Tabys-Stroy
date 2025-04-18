import PushkaImage1 from '../../assets/image/PowerTool/Пушка/3.13.1.1.jpg';
import PushkaImage2 from '../../assets/image/PowerTool/Пушка/3.13.1.2.jpg';
import PushkaImage3 from '../../assets/image/PowerTool/Пушка/3.13.2.1.png';


const Pushka =[
    {
            id: 72.1,
            name:  "ТЕПЛОПУШКА ПИТ 50408",
            pricePerUnit: {
                шт: 54990,
                },
            // oldPrice: 60000,
            image: PushkaImage1,
            images: [PushkaImage1, PushkaImage2],
            // description: "Краска для окон и дверей Dulux",
            detailedDescription: "",
            specifications: { },
            category: "power-tools", // Категория
            subCategory: "Пушки", // Подкатегория
            availability: "Есть в наличии"  // Новое поле для статуса наличия
        },
    {
            id: 72.2,
            name:  "ТЕПЛОПУШКА ПИТ 50408",
            pricePerUnit: {
                шт: 43990,
                },
            // oldPrice: 45000,
            image: PushkaImage3,
            images: [PushkaImage3],
            // description: "Краска для окон и дверей Dulux",
            detailedDescription: "",
            specifications: { },
            category: "power-tools", // Категория
            subCategory: "Пушки", // Подкатегория
            availability: "Есть в наличии"  // Новое поле для статуса наличия
        },
];
export default Pushka;