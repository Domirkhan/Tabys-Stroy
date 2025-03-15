import BokorezImage1 from '../../assets/image/HandTools/БокорезВсерезы/2.6.1.1.jpg';
import BokorezImage2 from '../../assets/image/HandTools/БокорезВсерезы/2.6.1.2.jpg';



const Cutters = [
    // Бокорезы Всерезы
                        {
                            id: 85.1,
                            name:  "БОКОРЕЗЫ КЛАССИК 180 мм, СПАРТА 17560",
                            pricePerUnit: {
                                шт: 1700,
                                },
                            // oldPrice: 1700,
                            image: BokorezImage1,
                            images: [BokorezImage1, BokorezImage2],
                            // description: "Краска для окон и дверей Dulux",
                            detailedDescription: "",
                            specifications: { },
                            category: "tools", // Категория
                            subCategory: "Бокорезы, кабелерезы, тросорезы", // Подкатегория
                            availability: "Есть в наличии"  // Новое поле для статуса наличия
                          },
];

export default Cutters;