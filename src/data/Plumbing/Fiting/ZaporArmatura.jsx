import ZaporArmaturaImage1 from '../../../assets/image/plumbing/Сифон, гофра/1.8.4.1.1.jpg';
import ZaporArmaturaImage2 from '../../../assets/image/plumbing/Сифон, гофра/1.8.4.1.2.jpg';
import ZaporArmaturaImage3 from '../../../assets/image/plumbing/Сифон, гофра/1.8.4.2.1.jpg';
import ZaporArmaturaImage4 from '../../../assets/image/plumbing/Сифон, гофра/1.8.4.3.1.jpg';
import ZaporArmaturaImage5 from '../../../assets/image/plumbing/Сифон, гофра/1.8.5.1.1.jpg';
import ZaporArmaturaImage6 from '../../../assets/image/plumbing/Сифон, гофра/1.8.5.1.2.jpg';


const ZaporArmatura = [
    // Запорная Арматура
    {
        id: 36.1,
        name: "Арматура сантехническая с боковой подачей воды 1/2 Ани Пласт WC6050",
        pricePerUnit: {
            шт: 2700,
            },
        // oldPrice: 2700,
        image: ZaporArmaturaImage1,
        images: [ZaporArmaturaImage1, ZaporArmaturaImage2],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 36.2,// id nado
        name: "Арматура для смывного бочка с боковой подачей воды АО Уклад А105.56У1.3",
        pricePerUnit: {
            шт: 2850,
            }, // pomenyat nado 
        // oldPrice: 2850,
        image: ZaporArmaturaImage3,
        images: [ZaporArmaturaImage3],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 36.3,
        name: "Арматура для смывного бочка с нижней подачей воды АО Уклад А105.57.14.3",
        pricePerUnit: {
            шт: 2800,
            },
        // oldPrice: 2800,
        image: ZaporArmaturaImage4,
        images: [ZaporArmaturaImage4],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      {
        id: 36.4,
        name: "Клапан нижней подачи воды NOVA 4721",
        pricePerUnit: {
            шт: 1200,
            },
        // oldPrice: 1200,
        image: ZaporArmaturaImage5,
        images: [ZaporArmaturaImage5, ZaporArmaturaImage6],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
      
      
]

export default ZaporArmatura;