
import LaminatImage1 from '../../assets/image/FloorCoverings/Ламинат/10.1.1.1.jpg';
import LaminatImage2 from '../../assets/image/FloorCoverings/Ламинат/10.1.1.2.jpg';





const Laminat =[
    {
        id: 124.1,
        name:  "Ламинат Дуб Маелла, Кроностар, 8 мм, 33 класс",
        pricePerUnit: {
            шт: 4900,
            },
        // oldPrice: 4900,
        image: LaminatImage1,
        images: [LaminatImage1, LaminatImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "floor-coverings", // Категория
        subCategory: "Ламинат", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
    },
    
]

export default Laminat;