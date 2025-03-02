import otvodskrepleniemImage from '../../../assets/image/plumbing/Фитинги/1.1.22.1.jpg';

const OtvodSKrepleniem = [
     {
        id: 17.1,
        name: "Отвод с вн. резьбой 20x1/2'' креплением. ППР белый Jakko",
        pricePerUnit: {
          шт: 300,
      },
        // oldPrice: 300,
        image: otvodskrepleniemImage,
        images: [otvodskrepleniemImage],
        // description: "Краска для окон и дверей Dulux",
        detailedDescription: "Монтажная планка с угловыми полипропиленовыми фитингами (водорозетками), предназначенными для подключения сантехнического смесителя со стандартным межосевым расстоянием к водопроводу из полипропиленовых труб.",
        specifications: { "Материал муфты": "Полипропилен", "Диаметр соединения полипропилена": "20 mm", "Диаметр соединяемой резьбы": "1/2''", "Тип резьбы": "Наружная", "Рабочая среда": "Вода"},
        category: "plumbing", // Категория
        subCategory: "Фитинги", // Подкатегория
        availability: "Есть в наличии"  // Новое поле для статуса наличия
      },
];

export default OtvodSKrepleniem;