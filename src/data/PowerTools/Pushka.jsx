import PushkaImage1 from '../../assets/image/PowerTool/Пушка/3.13.1.1.jpg';
import PushkaImage2 from '../../assets/image/PowerTool/Пушка/3.13.1.2.jpg';


const Pushka =[
    {
            id: 72.1,
            name:  "Электрический штроборез RICHDA RH-133 2700Вт",
            pricePerUnit: {
                шт: 60000,
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
];
export default Pushka;