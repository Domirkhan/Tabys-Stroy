import SvarkaapparatImage1 from '../../assets/image/PowerTool/СварочныйАппарат/3.11.1.1.jpg';


const Svarkaapparat =[
    {
            id: 70.1,
            name:  "Электрический штроборез RICHDA RH-133 2700Вт",
            pricePerUnit: {
                шт: 85000,
                },
            // oldPrice: 85000,
            image: SvarkaapparatImage1,
            images: [SvarkaapparatImage1],
            // description: "Краска для окон и дверей Dulux",
            detailedDescription: "",
            specifications: { },
            category: "power-tools", // Категория
            subCategory: "Сварочные аппараты", // Подкатегория
            availability: "Есть в наличии"  // Новое поле для статуса наличия
        },
];
export default Svarkaapparat;