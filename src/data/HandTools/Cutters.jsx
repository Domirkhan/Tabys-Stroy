import BokorezImage1 from '../../assets/image/HandTools/БокорезВсерезы/2.6.1.1.jpg';
import BokorezImage2 from '../../assets/image/HandTools/БокорезВсерезы/2.6.1.2.jpg';
import BokorezImage3 from '../../assets/image/HandTools/БокорезВсерезы/2.6.2.1.png';
import BokorezImage4 from '../../assets/image/HandTools/БокорезВсерезы/2.6.3.1.png';

import BoltorezImage1 from '../../assets/image/HandTools/БокорезВсерезы/2.6.4.1.png';



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
                        {
                            id: 85.2,
                            name:  "БОКОРЕЗЫ КЛАССИК 200мм, СПАРТА 17562",
                            pricePerUnit: {
                                шт: 1950,
                                },
                            // oldPrice: 1950,
                            image: BokorezImage3,
                            images: [BokorezImage3],
                            // description: "Краска для окон и дверей Dulux",
                            detailedDescription: "",
                            specifications: { },
                            category: "tools", // Категория
                            subCategory: "Бокорезы, кабелерезы, тросорезы", // Подкатегория
                            availability: "Есть в наличии"  // Новое поле для статуса наличия
                          },
                        {
                            id: 85.3,
                            name:  "Бокорезы шлифованные, пластмассовые рукоятки 160мм Sparta 17558",
                            pricePerUnit: {
                                шт: 1890,
                                },
                            // oldPrice: 1900,
                            image: BokorezImage4,
                            images: [BokorezImage4],
                            // description: "Краска для окон и дверей Dulux",
                            detailedDescription: "",
                            specifications: { },
                            category: "tools", // Категория
                            subCategory: "Бокорезы, кабелерезы, тросорезы", // Подкатегория
                            availability: "Есть в наличии"  // Новое поле для статуса наличия
                          },

// Болторез
                        {
                            id: 85.4,
                            name:  "Болторез 450мм/18 ExProfil",
                            pricePerUnit: {
                                шт: 4790,
                                },
                            // oldPrice: 4800,
                            image: BoltorezImage1,
                            images: [BoltorezImage1],
                            // description: "Краска для окон и дверей Dulux",
                            detailedDescription: "",
                            specifications: { },
                            category: "tools", // Категория
                            subCategory: "Бокорезы, кабелерезы, тросорезы", // Подкатегория
                            availability: "Есть в наличии"  // Новое поле для статуса наличия
                          },
];

export default Cutters;