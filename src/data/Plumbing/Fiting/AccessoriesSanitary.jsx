// Аксессуары Санузел
import AccessoriesSanitaryImage1 from '../../../assets/image/plumbing/Сифон, гофра/1.9.1.1.1.webp';


const AccessoriesSanitary = [
    {
        id: 39.1,
        name: "Планка с 2мя крючками Casela CL61915-2",
        pricePerUnit: {
            шт: 3800,
          },
        // oldPrice: 3800,
        image: AccessoriesSanitaryImage1,
        images: [AccessoriesSanitaryImage1],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "",
        specifications: { },
        category: "plumbing", // Категория
        subCategory: "Ванны и комплектующие", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
];

export default AccessoriesSanitary;
