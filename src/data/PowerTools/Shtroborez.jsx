import ShtroborezImage1 from '../../assets/image/PowerTool/Штроборез/3.10.1.1.webp';
import ShtroborezImage2 from '../../assets/image/PowerTool/Штроборез/3.10.1.2.webp';


const Shtroborez =[
    {
            id: 69.1,
            name:  "Электрический штроборез RICHDA RH-133 2700Вт",
            pricePerUnit: {
                шт: 0,
                },
            // oldPrice: 0,
            image: ShtroborezImage1,
            images: [ShtroborezImage1, ShtroborezImage2],
            // description: "Краска для окон и дверей Dulux",
            detailedDescription: "",
            specifications: { },
            category: "power-tools", // Категория
            subCategory: "Штроборезы", // Подкатегория
            availability: "Нет в наличии"  // Новое поле для статуса наличия
        },
];
export default Shtroborez;