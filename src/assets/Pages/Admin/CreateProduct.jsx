import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  // Вместо одного фото используем массив
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState([{ key: "", value: "" }]);

  // Новые состояния для задания цены по единицам измерения
  const [pricePerUnit, setPricePerUnit] = useState({});
  const [unitKey, setUnitKey] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [availability, setAvailability] = useState("Есть в наличии");

  // Получение всех категорий
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  // Получение всех подкатегорий
  const getAllSubcategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/subcategory/get-subcategory`
      );
      if (data?.success) {
        setSubcategories(data?.subcategories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting subcategories");
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllSubcategories();
  }, []);

  // Функция добавления новой единицы измерения с ценой
  const addUnitPrice = () => {
    if (unitKey.trim() && unitPrice.trim()) {
      setPricePerUnit(prev => ({ ...prev, [unitKey.trim()]: Number(unitPrice) }));
      setUnitKey("");
      setUnitPrice("");
    } else {
      toast.error("Введите корректные данные для единицы и цены");
    }
  };

  // Обработка выбора нескольких фотографий
  const handlePhotosChange = (e) => {
    setPhotos([...e.target.files]);
  };

  // Создание продукта
  const handleCreate = async (e) => {
    e.preventDefault();
    
    // Проверка обязательных полей
    if (!name) {
      return toast.error('Название товара обязательно');
    }
    if (!description) {
      return toast.error('Описание товара обязательно');
    }
    if (!category) {
      return toast.error('Категория товара обязательна');
    }
    if (Object.keys(pricePerUnit).length === 0) {
      return toast.error('Добавьте хотя бы одну цену с единицей измерения');
    }
    if (!availability) {
      return toast.error('Статус наличия обязателен');
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("category", category);
      if (subcategory) {
        productData.append("subcategory", subcategory);
      }
      
      // Добавляем фото
      if (photos && photos.length > 0) {
        photos.forEach((file) => {
          productData.append("photos", file);
        });
      }

      // Добавляем characteristics если они есть
      if (characteristics && characteristics.length > 0) {
        productData.append("characteristics", JSON.stringify(characteristics));
      }

      // Добавляем pricePerUnit
      productData.append("pricePerUnit", JSON.stringify(pricePerUnit));

      // Добавляем availability
      productData.append("availability", availability);

      // Добавляем shipping
      productData.append("shipping", shipping);

      // Добавляем quantity по умолчанию
      productData.append("quantity", "1");

      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/product/create-product`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.success) {
        toast.success('Товар успешно создан');
        navigate('/dashboard/admin/products');
      }
    } catch (error) {
      console.error('Ошибка при создании товара:', error);
      toast.error(error.response?.data?.error || 'Ошибка при создании товара');
    }
};
  // Добавление новой характеристики
  const handleAddCharacteristic = () => {
    setCharacteristics([...characteristics, { key: "", value: "" }]);
  };

  // Удаление характеристики
  const handleRemoveCharacteristic = (index) => {
    const updatedCharacteristics = characteristics.filter((_, i) => i !== index);
    setCharacteristics(updatedCharacteristics);
  };

  // Обновление значения характеристики
  const handleCharacteristicChange = (index, field, value) => {
    const updatedCharacteristics = [...characteristics];
    updatedCharacteristics[index][field] = value;
    setCharacteristics(updatedCharacteristics);
  };

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Создать продукт</h1>
          <div className="m-1 w-75">
            {/* Выбор категории */}
            <Select
              placeholder="Выберите категорию"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            {/* Выбор подкатегории */}
            <Select
              placeholder="Выберите подкатегорию"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setSubcategory(value);
              }}
            >
              {subcategories
                ?.filter((sc) => sc.category?._id === category)
                .map((sc) => (
                  <Option key={sc._id} value={sc._id}>
                    {sc.name}
                  </Option>
                ))}
            </Select>

            {/* Загрузка фотографий */}
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photos.length > 0 ? `${photos.length} file(s) selected` : "Загрузите фото"}
                <input
                  type="file"
                  name="photos"
                  accept="image/*"
                  multiple
                  onChange={handlePhotosChange}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photos.length > 0 && (
                <div className="text-center">
                  {photos.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`preview ${index}`}
                      height="100px"
                      className="me-2 mb-2"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Поля для ввода данных */}
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Название продукта"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="Описание продукта"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="mb-3">
              <Select
                placeholder="Статус наличия"
                size="large"
                className="form-select mb-3"
                onChange={(value) => setAvailability(value)}
                value={availability}
              >
                <Option value="Есть в наличии">Есть в наличии</Option>
                <Option value="Нет в наличии">Нет в наличии</Option>
                <Option value="Под заказ">Под заказ</Option>
                <Option value="Уточнить наличие">Уточнить наличие</Option>
              </Select>
            </div>
            <div className="mb-3">
              <Select
                placeholder="Доставка"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">нет</Option>
                <Option value="1">да</Option>
              </Select>
            </div>

            {/* Добавление единиц измерения с ценами */}
            <div className="mb-3">
              <h5>Добавление единиц измерения с ценами</h5>
              <div className="d-flex mb-2">
                <input
                  type="text"
                  placeholder="Единица (например, кг или мешок)"
                  value={unitKey}
                  className="form-control me-2"
                  onChange={(e) => setUnitKey(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Цена для единицы"
                  value={unitPrice}
                  className="form-control me-2"
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
                <button type="button" className="btn btn-secondary" onClick={addUnitPrice}>
                  Добавить единицу
                </button>
              </div>
              {Object.keys(pricePerUnit).length > 0 && (
                <div>
                  <h6>Заданные цены:</h6>
                  <ul>
                    {Object.entries(pricePerUnit).map(([unit, cost]) => (
                      <li key={unit}>
                        {unit}: {cost} тг
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Характеристики */}
            <div className="mb-3">
              <h5>Характеристики</h5>
              {characteristics.map((char, index) => (
                <div key={index} className="d-flex mb-2">
                  <input
                    type="text"
                    placeholder="характеристика (например, цвет)"
                    value={char.key}
                    className="form-control me-2"
                    onChange={(e) =>
                      handleCharacteristicChange(index, "key", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="характеристика"
                    value={char.value}
                    className="form-control me-2"
                    onChange={(e) =>
                      handleCharacteristicChange(index, "value", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveCharacteristic(index)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddCharacteristic}
              >
                Добавить характеристику
              </button>
            </div>

            {/* Кнопка для создания продукта */}
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                Создать продукт
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;