
import EnamelRadiatorImage1 from '../../assets/image/paint/Эмаль Радиатор/9.6.1.1.jpg';
import EnamelRadiatorImage2 from '../../assets/image/paint/Эмаль Радиатор/9.6.1.2.jpg';




const EnamelRadiator =[
    {
        id: 119.1,
        name:  "Эмаль для металла и радиаторов отопления Радуга-178 полуматовая акриловая 0,5кг",
        pricePerUnit: {
            шт: 2600,
            },
        // oldPrice: 2600,
        image: EnamelRadiatorImage1,
        images: [EnamelRadiatorImage1, EnamelRadiatorImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "Paint", // Категория
        subCategory: "Эмали акриловые, эмали для радиаторы", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
    },
    
]

export default EnamelRadiator;