import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState({});
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [shipping, setShipping] = useState("");
  // Изменили photo на photos (массив)
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [id, setId] = useState("");
  const [availability, setAvailability] = useState("Есть в наличии");
  const [unitKey, setUnitKey] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  // Получение данных о продукте
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPricePerUnit(data.product.pricePerUnit || {});
      setCategory(data.product.category._id);
      setSubcategory(data.product.subcategory?._id || "");
      setCharacteristics(data.product.characteristics || []);
      setShipping(data.product.shipping);
      setAvailability(data.product.availability || "Есть в наличии");
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при получении данных о продукте");
    }
  };

  // Получение всех категорий
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`);
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
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/subcategory/get-subcategory`);
      if (data?.success) {
        setSubcategories(data?.subcategories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при получении подкатегорий");
    }
  };

  useEffect(() => {
    getSingleProduct();
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

  // Обновление продукта
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      if (subcategory) formData.append("subcategory", subcategory);
      // Преобразуем shipping в булево значение
      formData.append("shipping", shipping === "1");
      formData.append("characteristics", JSON.stringify(characteristics));
      formData.append("availability", availability);
      formData.append("pricePerUnit", JSON.stringify(pricePerUnit));
      
      if (photos.length > 0) {
        // Добавляем каждый выбранный файл в поле "photos"
        for (let i = 0; i < photos.length; i++) {
          formData.append("photos", photos[i]);
        }
      }
  
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/product/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
  
      if (data?.success) {
        toast.success("Продукт успешно обновлен");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Что-то пошло не так при обновлении продукта");
    }
};

  // Удаление продукта
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Вы уверены, что хотите удалить этот продукт?");
      if (!answer) return;
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Продукт успешно удален");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Что-то пошло не так");
    }
  };

  // Добавление характеристики
  const handleAddCharacteristic = () => {
    setCharacteristics([...characteristics, { key: "", value: "" }]);
  };

  // Удаление характеристики
  const handleRemoveCharacteristic = (index) => {
    const updatedCharacteristics = characteristics.filter((_, i) => i !== index);
    setCharacteristics(updatedCharacteristics);
  };

  // Обновление характеристики
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
          <h1>Обновить продукт</h1>
          <div className="m-1 w-75">
            {/* Выбор категории */}
            <Select
              placeholder="Выберите категорию"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setCategory(value)}
              value={category}
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
              onChange={(value) => setSubcategory(value)}
              value={subcategory}
            >
              {subcategories
                ?.filter((sc) => sc.category?._id === category)
                .map((sc) => (
                  <Option key={sc._id} value={sc._id}>
                    {sc.name}
                  </Option>
                ))}
            </Select>

            {/* Загрузка фото */}
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photos.length > 0 ? `${photos.length} file(s) selected` : "Загрузить фото"}
                <input
                  type="file"
                  name="photos"
                  accept="image/*"
                  multiple
                  onChange={(e) => setPhotos(Array.from(e.target.files))}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photos.length > 0 ? (
                <div className="text-center">
                  {Array.from(photos).map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`preview ${index}`}
                      height="200px"
                      className="img img-responsive me-2"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${id}`}
                    alt="product_photo"
                    height="200px"
                    className="img img-responsive"
                  />
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
                value={description}
                placeholder="Описание продукта"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="Цена продукта"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Добавление единиц измерения с ценами */}
            <div className="mb-3">
              <h5>Цены за единицу</h5>
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
                placeholder="Способ доставки"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setShipping(value)}
                value={shipping ? "1" : "0"}
              >
                <Option value="0">Нет</Option>
                <Option value="1">Да</Option>
              </Select>
            </div>

            {/* Характеристики */}
            <div className="mb-3">
              <h5>Характеристики</h5>
              {characteristics.map((char, index) => (
                <div key={index} className="d-flex mb-2">
                  <input
                    type="text"
                    placeholder="Характеристика"
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

            {/* Кнопки действий */}
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Обновить продукт
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                Удалить продукт
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;