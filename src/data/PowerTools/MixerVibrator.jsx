import MixerImage1 from '../../assets/image/PowerTool/Миксер Вибратор/3.9.1.1.jpg';
import MixerImage2 from '../../assets/image/PowerTool/Миксер Вибратор/3.9.2.1.png';


const MixerVibrator =[
    {
            id: 68.1,
            name:  "Миксер Makute HM210 1300W",
            pricePerUnit: {
                шт: 43990,
                },
            // oldPrice: 47000,
            image: MixerImage1,
            images: [MixerImage1],
            // description: "Краска для окон и дверей Dulux",
            detailedDescription: "",
            specifications: { },
            category: "power-tools", // Категория
            subCategory: "Миксеры и вибратор", // Подкатегория
            availability: "Есть в наличии"  // Новое поле для статуса наличия
        },
    {
            id: 68.2,
            name:  "Миксер RICHDA 1200",
            pricePerUnit: {
                шт: 24990,
                },
            // oldPrice: 26500,
            image: MixerImage2,
            images: [MixerImage2],
            // description: "Краска для окон и дверей Dulux",
            detailedDescription: "",
            specifications: { },
            category: "power-tools", // Категория
            subCategory: "Миксеры и вибратор", // Подкатегория
            availability: "Уточнить наличие"  // Новое поле для статуса наличия
        },
];
export default MixerVibrator;