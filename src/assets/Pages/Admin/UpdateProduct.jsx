import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../layout/Footer";
import BottomNav from "../../components/BottomNav";
import Header from "../../layout/Header";
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
  const [shipping, setShipping] = useState("0");
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [id, setId] = useState("");
  const [availability, setAvailability] = useState("Есть в наличии");
  const [unitKey, setUnitKey] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [currentPhotos, setCurrentPhotos] = useState([]); // Добавляем состояние для текущих фото

  // Получение данных о продукте
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-product/${params.slug}`
      );
      if (data?.product) {
        setName(data.product.name || "");
        setId(data.product._id || "");
        setDescription(data.product.description || "");
        setPrice(data.product.price || "");
        setPricePerUnit(data.product.pricePerUnit || {});
        setCategory(data.product.category?._id || "");
        setSubcategory(data.product.subcategory?._id || "");
        setCharacteristics(data.product.characteristics || []);
        setShipping(data.product.shipping ? "1" : "0");
        setAvailability(data.product.availability || "Есть в наличии");
        setCurrentPhotos(data.product.photos || []); // Сохраняем текущие фото
      }
    } catch (error) {
      console.error("Ошибка при получении данных о продукте:", error);
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
  }, [params.slug]); // Добавляем зависимость от slug

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

  // Удаление единицы измерения
  const removeUnitPrice = (unitToRemove) => {
    const newPricePerUnit = { ...pricePerUnit };
    delete newPricePerUnit[unitToRemove];
    setPricePerUnit(newPricePerUnit);
  };

  // Обновление продукта
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Валидация
      if (!name.trim()) return toast.error("Название продукта обязательно");
      if (!description.trim()) return toast.error("Описание продукта обязательно");
      if (!category) return toast.error("Выберите категорию");
      if (Object.keys(pricePerUnit).length === 0) return toast.error("Добавьте хотя бы одну цену");

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("category", category);
      if (subcategory) formData.append("subcategory", subcategory);
      formData.append("shipping", shipping === "1");
      formData.append("characteristics", JSON.stringify(characteristics));
      formData.append("availability", availability);
      formData.append("pricePerUnit", JSON.stringify(pricePerUnit));
      
      // Добавляем новые фото, если они есть
      if (photos.length > 0) {
        photos.forEach(photo => {
          if (photo instanceof File) {
            formData.append("photos", photo);
          }
        });
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
        toast.error(data?.message || "Ошибка при обновлении");
      }
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      toast.error("Ошибка при обновлении продукта");
    }
  };

  // Удаление продукта
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Вы уверены, что хотите удалить этот продукт? Напишите 'да' для подтверждения.");
      if (answer?.toLowerCase() !== 'да') return;

      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/product/delete-product/${id}`
      );
      
      if (data?.success) {
        toast.success("Продукт успешно удален");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Ошибка при удалении");
      }
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      toast.error("Ошибка при удалении продукта");
    }
  };

  return (
    <>
    <Header/>
    <div className="container">
    <div className="container-fluid">
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

            {/* Основные поля */}
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
                rows="4"
              />
            </div>

            {/* Цены за единицу */}
            <div className="mb-3">
              <h5>Цены за единицу</h5>
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

              {/* Список текущих цен */}
              {Object.entries(pricePerUnit).length > 0 && (
                <div className="mt-2">
                  <h6>Текущие цены:</h6>
                  <ul className="list-group">
                    {Object.entries(pricePerUnit).map(([unit, price]) => (
                      <li key={unit} className="list-group-item d-flex justify-content-between align-items-center">
                        {unit}: {price} тг
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeUnitPrice(unit)}
                        >
                          Удалить
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Загрузка фото */}
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photos.length > 0 ? `Выбрано файлов: ${photos.length}` : "Загрузить фото"}
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

            {/* Предпросмотр фото */}
            <div className="mb-3">
              <div className="d-flex flex-wrap gap-2">
                {photos.length > 0 ? (
                  photos.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`preview ${index + 1}`}
                      style={{ height: "100px", objectFit: "cover" }}
                      className="border rounded"
                    />
                  ))
                ) : currentPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.VITE_API}/${photo}`}
                    alt={`current ${index + 1}`}
                    style={{ height: "100px", objectFit: "cover" }}
                    className="border rounded"
                  />
                ))}
              </div>
            </div>

            {/* Статус наличия */}
            <div className="mb-3">
              <Select
                placeholder="Статус наличия"
                size="large"
                className="form-select"
                onChange={(value) => setAvailability(value)}
                value={availability}
              >
                <Option value="Есть в наличии">Есть в наличии</Option>
                <Option value="Нет в наличии">Нет в наличии</Option>
                <Option value="Под заказ">Под заказ</Option>
                <Option value="Уточнить наличие">Уточнить наличие</Option>
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
                    onChange={(e) => {
                      const updatedChars = [...characteristics];
                      updatedChars[index].key = e.target.value;
                      setCharacteristics(updatedChars);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Значение"
                    value={char.value}
                    className="form-control me-2"
                    onChange={(e) => {
                      const updatedChars = [...characteristics];
                      updatedChars[index].value = e.target.value;
                      setCharacteristics(updatedChars);
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      const updatedChars = characteristics.filter((_, i) => i !== index);
                      setCharacteristics(updatedChars);
                    }}
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCharacteristics([...characteristics, { key: "", value: "" }])}
              >
                Добавить характеристику
              </button>
            </div>

            {/* Кнопки действий */}
            <div className="d-flex gap-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Обновить продукт
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Удалить продукт
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <BottomNav/>
    <Footer/>
    </>
  );
};

export default UpdateProduct;