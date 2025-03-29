import StripperImage1 from '../../assets/image/HandTools/Мультитул/2.12.1.1.jpg';
import StripperImage2 from '../../assets/image/HandTools/Мультитул/2.12.2.1.png';
import StripperImage3 from '../../assets/image/HandTools/Мультитул/2.12.2.2.png';




const Multytool = [
    // Мультитул
{
    id: 91.1,
    name:  "Стриппер многофункциональный Эксперт ХР-MFS004",
    pricePerUnit: {
        шт: 2690,
        },
    // oldPrice: 2700,
    image: StripperImage2,
    images: [StripperImage2,StripperImage3],
    // description: "Краска для окон и дверей Dulux",
    detailedDescription: "",
    specifications: { },
    category: "tools", // Категория
    subCategory: "Мультитулы", // Подкатегория
    availability: "Есть в наличии"  // Новое поле для статуса наличия
  },
  {
    id: 91.2,
    name:  "Набор губцевого инструмента Пасатиж 5в1 Эксперт",
    pricePerUnit: {
        шт: 5500,
        },
    // oldPrice: 5500,
    image: StripperImage1,
    images: [StripperImage1],
    // description: "Краска для окон и дверей Dulux",
    detailedDescription: "",
    specifications: { },
    category: "tools", // Категория
    subCategory: "Мультитулы", // Подкатегория
    availability: "Есть в наличии"  // Новое поле для статуса наличия
  },


];

export default Multytool;