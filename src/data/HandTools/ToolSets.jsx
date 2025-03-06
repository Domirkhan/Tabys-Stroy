import ToolSetImage1 from '../../../src/assets/image/HandTools/Набор Инструмент/2.1.1.1.jpg';




const ToolSets = [
    //  Набор Инструмент
                        {
                            id: 50.1,
                            name:  "Набор универсальный 6 в 1 SPARTA 13540",
                            pricePerUnit: {
                                шт: 5250,
                                },
                            // oldPrice: 5250,
                            image: ToolSetImage1,
                            images: [ToolSetImage1],
                            // description: "Краска для окон и дверей Dulux",
                            detailedDescription: "",
                            specifications: { },
                            category: "tools", // Категория
                            subCategory: "Наборы инструментов", // Подкатегория
                            availability: "Есть в наличии"  // Новое поле для статуса наличия
                          },
];

export default ToolSets;