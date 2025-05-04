import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import Footer from "../../layout/Footer";
import BottomNav from "../../components/BottomNav";
import Header from "../../layout/Header";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState([{ key: "", value: "" }]);
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
      toast.error("Ошибка при получении категорий");
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
      toast.error("Ошибка при получении подкатегорий");
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

  // Обработка выбора фотографий
  const handlePhotosChange = (e) => {
    setPhotos([...e.target.files]);
  };

  // Добавление новой характеристики
  const handleAddCharacteristic = () => {
    setCharacteristics([...characteristics, { key: "", value: "" }]);
  };

  // Удаление характеристики
  const handleRemoveCharacteristic = (index) => {
    if (characteristics.length > 1) {
      const updatedCharacteristics = characteristics.filter((_, i) => i !== index);
      setCharacteristics(updatedCharacteristics);
    } else {
      toast.error("Требуется минимум одна характеристика");
    }
  };

  // Обновление значения характеристики
  const handleCharacteristicChange = (index, field, value) => {
    const updatedCharacteristics = [...characteristics];
    updatedCharacteristics[index][field] = value;
    setCharacteristics(updatedCharacteristics);
  };

  // Создание продукта
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      // Проверяем характеристики
      const validCharacteristics = characteristics.filter(char => 
        char.key.trim() && char.value.trim()
      );

      // Валидация обязательных полей
      if (!name.trim()) {
        return toast.error("Название товара обязательно");
      }
      if (!description.trim()) {
        return toast.error("Описание товара обязательно");
      }
      if (!category) {
        return toast.error("Категория товара обязательна");
      }
      if (validCharacteristics.length === 0) {
        return toast.error("Добавьте хотя бы одну характеристику товара");
      }
      if (Object.keys(pricePerUnit).length === 0) {
        return toast.error("Добавьте хотя бы одну цену с единицей измерения");
      }
      if (!photos || photos.length === 0) {
        return toast.error("Добавьте хотя бы одно фото товара");
      }

      // Создаем объект FormData
      const productData = new FormData();
      
      // Добавляем основные поля
      productData.append("name", name.trim());
      productData.append("description", description.trim());
      productData.append("category", category);
      productData.append("characteristics", JSON.stringify(validCharacteristics));
      productData.append("pricePerUnit", JSON.stringify(pricePerUnit));
      productData.append("availability", availability);
      productData.append("shipping", shipping === "1");

      // Добавляем подкатегорию если она выбрана
      if (subcategory) {
        productData.append("subcategory", subcategory);
      }

      // Добавляем фотографии
      photos.forEach((photo) => {
        productData.append("photos", photo);
      });

      // Отправляем запрос
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
        toast.success("Товар успешно создан");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Ошибка при создании товара");
      }
    } catch (error) {
      console.error("Ошибка при создании товара:", error);
      toast.error("Ошибка при создании товара");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Создать продукт</h1>
              <div className="m-1 w-75">
                <Select
                  placeholder="Выберите категорию"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setCategory(value)}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                <Select
                  placeholder="Выберите подкатегорию"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setSubcategory(value)}
                >
                  {subcategories
                    ?.filter((sc) => sc.category?._id === category)
                    .map((sc) => (
                      <Option key={sc._id} value={sc._id}>
                        {sc.name}
                      </Option>
                    ))}
                </Select>

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
                    value={description}
                    placeholder="Описание продукта"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photos.length > 0 ? `Выбрано файлов: ${photos.length}` : "Загрузить фото"}
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

                {photos.length > 0 && (
                  <div className="mb-3">
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
                  </div>
                )}

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
                    className="form-select mb-3"
                    onChange={(value) => setShipping(value)}
                  >
                    <Option value="0">Нет</Option>
                    <Option value="1">Да</Option>
                  </Select>
                </div>

                <div className="mb-3">
                  <h5>Цены за единицу измерения</h5>
                  <div className="d-flex mb-2">
                    <input
                      type="text"
                      placeholder="Единица измерения"
                      value={unitKey}
                      className="form-control me-2"
                      onChange={(e) => setUnitKey(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Цена"
                      value={unitPrice}
                      className="form-control me-2"
                      onChange={(e) => setUnitPrice(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addUnitPrice}
                    >
                      Добавить
                    </button>
                  </div>

                  {Object.keys(pricePerUnit).length > 0 && (
                    <div className="mt-2">
                      <h6>Текущие цены:</h6>
                      <ul className="list-group">
                        {Object.entries(pricePerUnit).map(([unit, price]) => (
                          <li
                            key={unit}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            {unit}: {price} тг
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                const newPrices = { ...pricePerUnit };
                                delete newPrices[unit];
                                setPricePerUnit(newPrices);
                              }}
                            >
                              Удалить
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <h5>Характеристики</h5>
                  {characteristics.map((char, index) => (
                    <div key={index} className="d-flex mb-2">
                      <input
                        type="text"
                        placeholder="Наименование"
                        value={char.key}
                        className="form-control me-2"
                        onChange={(e) =>
                          handleCharacteristicChange(index, "key", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Значение"
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

                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleCreate}>
                    Создать продукт
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};

export default CreateProduct;