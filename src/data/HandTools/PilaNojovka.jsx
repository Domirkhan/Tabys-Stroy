import NojovkaImage1 from '../../assets/image/HandTools/Пила, Ножовка/2.9.1.1.jpg';




const PilaNojovka = [
    // Ключи, Головки
                        {
                            id: 89.1,
                            name:  "Ножовка по дереву 500мм MATRIX 23542",
                            pricePerUnit: {
                                шт: 3850,
                                },
                            // oldPrice: 3850,
                            image: NojovkaImage1,
                            images: [NojovkaImage1],
                            // description: "Краска для окон и дверей Dulux",
                            detailedDescription: "",
                            specifications: { },
                            category: "tools", // Категория
                            subCategory: "Пилы и ножовки", // Подкатегория
                            availability: "Есть в наличии"  // Новое поле для статуса наличия
                          },
];

export default PilaNojovka;