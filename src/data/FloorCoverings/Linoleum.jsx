
import LinoleumImage1 from '../../assets/image/FloorCoverings/Линолеум/10.2.1.1.jpg';
import LinoleumImage2 from '../../assets/image/FloorCoverings/Линолеум/10.2.1.2.jpg';
import LinoleumImage3 from '../../assets/image/FloorCoverings/Линолеум/10.2.1.3.jpg';






const Linoleum =[
    {
        id: 125.1,
        name:  "Линолеум Стиму Пегас1 3.5 м",
        pricePerUnit: {
            шт: 2700,
            },
        // oldPrice: 2700,
        image: LinoleumImage1,
        images: [LinoleumImage1, LinoleumImage2, LinoleumImage3],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "floor-coverings", // Категория
        subCategory: "Линолеум", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
    },
    
]

export default Linoleum;