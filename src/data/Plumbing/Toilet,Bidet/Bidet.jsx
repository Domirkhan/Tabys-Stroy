import BidetImage1 from "../../../assets/image/plumbing/Унитаз и биде/1.11.2.1.1.png";
import BidetImage2 from "../../../assets/image/plumbing/Унитаз и биде/1.11.2.1.2.png";
import BidetImage4 from "../../../assets/image/plumbing/Унитаз и биде/1.11.2.1.4.jpg";
import BidetImage5 from "../../../assets/image/plumbing/Унитаз и биде/1.11.2.1.5.jpg";
import BidetImage6 from "../../../assets/image/plumbing/Унитаз и биде/1.11.2.2.1.jpg";
import BidetImage7 from "../../../assets/image/plumbing/Унитаз и биде/1.11.2.2.2.jpg";
import BidetImage8 from "../../../assets/image/plumbing/Унитаз и биде/1.11.2.2.3.jpg";
import BidetImage9 from "../../../assets/image/plumbing/Унитаз и биде/1.11.2.2.4.jpg";

const Bidet = [
    //  Биде
                {
                    id: 48.1,
                    name: "Биде подвесное Grossman GR-5583 + Монтажная рама",
                    pricePerUnit: {
                        шт: 120000,
                        },
                    // oldPrice: 120000,
                    image: BidetImage1,
                    images: [BidetImage1, BidetImage2, BidetImage4, BidetImage5],
                    // description: "Краска для окон и дверей Dulux",
                    detailedDescription: "",
                    specifications: { },
                    category: "plumbing", // Категория
                    subCategory: "Унитазы и биде", // Подкатегория
                    availability: "Есть в наличии"  // Новое поле для статуса наличия
                  },
                {
                    id: 48.2,
                    name: "Рамная инсталляция для биде Alcaplast A105/1120",
                    pricePerUnit: {
                        шт: 75000,
                        },
                    // oldPrice: 75000,
                    image: BidetImage6,
                    images: [BidetImage6, BidetImage7, BidetImage8, BidetImage9],
                    // description: "Краска для окон и дверей Dulux",
                    detailedDescription: "",
                    specifications: { },
                    category: "plumbing", // Категория
                    subCategory: "Унитазы и биде", // Подкатегория
                    availability: "Есть в наличии"  // Новое поле для статуса наличия
                  },
];
export default Bidet;