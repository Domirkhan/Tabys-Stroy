import KluchImage1 from '../../assets/image/HandTools/Ключи, Головки/2.8.1.1.jpg';




const KluchGolovka = [
    // Ключи, Головки
                        {
                            id: 87.1,
                            name:  "Нож Канцелярский 18мм ХР-СК189",
                            pricePerUnit: {
                                шт: 3990,
                                },
                            // oldPrice: 4000,
                            image: KluchImage1,
                            images: [KluchImage1],
                            // description: "Краска для окон и дверей Dulux",
                            detailedDescription: "",
                            specifications: { },
                            category: "tools", // Категория
                            subCategory: "Ключи и головки", // Подкатегория
                            availability: "Есть в наличии"  // Новое поле для статуса наличия
                          },
];

export default KluchGolovka;