import FaucetShowerImage1 from "../../../assets/image/plumbing/Смеситель/Смеситель Душ/TRIGOR A10-TT-341 (1).jpeg";
import FaucetShowerImage2 from "../../../assets/image/plumbing/Смеситель/Смеситель Душ/TRIGOR A10-TT-341 (2).jpeg";
import FaucetShowerImage3 from "../../../assets/image/plumbing/Смеситель/Смеситель Душ/TRIGOR A10-TT-341 (3).jpeg";
import FaucetShowerImage4 from "../../../assets/image/plumbing/Смеситель/Смеситель Душ/TRIGOR A10-TT-341 (4).jpeg";
import FaucetShowerImage5 from "../../../assets/image/plumbing/Смеситель/Смеситель Душ/TRIGOR A10-TT-341 (5).jpeg";
import FaucetShowerImage6 from "../../../assets/image/plumbing/Смеситель/Смеситель Душ/TRIGOR A10-TT-341 (6).jpeg";
import FaucetShowerImage7 from "../../../assets/image/plumbing/Смеситель/Смеситель Душ/TRIGOR A10-TT-341 (7).jpeg";
import FaucetShowerImage8 from "../../../assets/image/plumbing/Смеситель/Смеситель Душ/1.10.4.1.1.jpg";
import FaucetShowerImage9 from "../../../assets/image/plumbing/Смеситель/Смеситель Душ/1.10.4.1.2.jpg";

const FaucetShower = [
    // Cмеситель Душ
            {
                id: 45.1,
                name: "Смеситель для душа TRIGOR A10-TT-341",
                pricePerUnit: {
                    шт: 57000,
                    },
                // oldPrice: 57000,
                image: FaucetShowerImage1,
                images: [FaucetShowerImage1, FaucetShowerImage2, FaucetShowerImage3, FaucetShowerImage4, FaucetShowerImage5, FaucetShowerImage6, FaucetShowerImage7],
                // description: "Краска для окон и дверей Dulux",
                detailedDescription: "",
                specifications: { },
                category: "plumbing", // Категория
                subCategory: "Смесители для ванной и кухни", // Подкатегория
                availability: "Есть в наличии"  // Новое поле для статуса наличия
              },
            {
                id: 45.2,
                name: "Смеситель для душа Trigor А10-ТТ-341 золотистый",
                pricePerUnit: {
                    шт: 57000,
                    },
                // oldPrice: 57000,
                image: FaucetShowerImage8,
                images: [FaucetShowerImage8, FaucetShowerImage9],
                // description: "Краска для окон и дверей Dulux",
                detailedDescription: "",
                specifications: { },
                category: "plumbing", // Категория
                subCategory: "Смесители для ванной и кухни", // Подкатегория
                availability: "Есть в наличии"  // Новое поле для статуса наличия
              },
];
export default FaucetShower;