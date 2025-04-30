import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import '../../styles/CreateCategory.css';
import Footer from "../../layout/Footer";
import BottomNav from "../../components/BottomNav";
import Header from "../../layout/Header";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const [iconPreview, setIconPreview] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedIcon, setUpdatedIcon] = useState(null);
  const [updatedIconPreview, setUpdatedIconPreview] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

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

  // Обработка загрузки иконки
const handleIconChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (!file.type.includes('image/')) {
      toast.error('Пожалуйста, выберите изображение');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Размер файла не должен превышать 5MB');
      return;
    }
    setIcon(file);
    setIconPreview(URL.createObjectURL(file));
  }
};

// Аналогично для handleUpdatedIconChange 
const handleUpdatedIconChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (!file.type.includes('image/')) {
      toast.error('Пожалуйста, выберите изображение');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Размер файла не должен превышать 5MB');
      return;
    }
    setUpdatedIcon(file);
    setUpdatedIconPreview(URL.createObjectURL(file));
  }
};

  // Создание категории
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (icon) {
        formData.append('icon', icon);
      }
  
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/category/create-category`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (data?.success) {
        toast.success(`${name} создана успешно`);
        getAllCategory();
        setName("");
        setIcon(null);
        setIconPreview("");
      }
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
      toast.error(error.response?.data?.message || "Ошибка при создании категории");
    }
  };

  // Создание подкатегории
  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/subcategory/create-subcategory`,
        { 
          name: subcategoryName, 
          category: selectedCategory 
        }
      );
      if (data?.success) {
        toast.success(`${subcategoryName} создана успешно`);
        getAllSubcategories();
        setSubcategoryName("");
        setSelectedCategory("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при создании подкатегории");
    }
  };

  // Обновление категории
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', updatedName);
      if (updatedIcon) {
        formData.append('icon', updatedIcon);
      }

      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/category/update-category/${selected._id}`,
        formData
      );

      if (data?.success) {
        toast.success(`${updatedName} обновлена успешно`);
        setSelected(null);
        setUpdatedName("");
        setUpdatedIcon(null);
        setUpdatedIconPreview("");
        setVisible(false);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при обновлении категории");
    }
  };

  // Удаление категории
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success("Категория удалена успешно");
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при удалении категории");
    }
  };

  // Удаление подкатегории
  const handleDeleteSubcategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/subcategory/delete-subcategory/${id}`
      );
      if (data.success) {
        toast.success("Подкатегория удалена успешно");
        getAllSubcategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при удалении подкатегории");
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
          <h1>Управление категориями</h1>
          
          {/* Форма создания категории */}
          <div className="p-3 w-50">
            <h4>Создать категорию</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Введите название категории"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleIconChange}
                />
                {iconPreview && (
                  <div className="mt-2">
                    <img 
                      src={iconPreview} 
                      alt="Предпросмотр" 
                      className="icon-preview"
                    />
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Создать категорию
              </button>
            </form>
          </div>

          {/* Форма создания подкатегории */}
          <div className="p-3 w-50">
            <h4>Создать подкатегорию</h4>
            <form onSubmit={handleSubcategorySubmit}>
              <div className="mb-3">
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="">Выберите категорию</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Введите название подкатегории"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Создать подкатегорию
              </button>
            </form>
          </div>

          {/* Список категорий */}
          <div className="w-75">
            <h4>Категории</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Иконка</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>
                      {c.iconUrl && (
                        <img 
                          src={`${import.meta.env.VITE_API}${c.iconUrl}`}
                          alt={c.name}
                          className="category-icon"
                        />
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setUpdatedIconPreview(c.iconUrl);
                          setSelected(c);
                        }}
                      >
                        Изменить
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleDelete(c._id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Список подкатегорий */}
          <div className="w-75">
            <h4>Подкатегории</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {subcategories?.map((sc) => (
                  <tr key={sc._id}>
                    <td>{sc.name}</td>
                    <td>{sc.category?.name}</td>
                    <td>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleDeleteSubcategory(sc._id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Модальное окно обновления категории */}
          <Modal
            open={visible}
            onCancel={() => setVisible(false)}
            footer={null}
            title="Редактировать категорию"
          >
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Введите название категории"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleUpdatedIconChange}
                />
                {(updatedIconPreview || selected?.iconUrl) && (
                  <div className="mt-2">
                    <img 
                      src={updatedIconPreview || `${import.meta.env.VITE_API}${selected.iconUrl}`}
                      alt="Предпросмотр"
                      className="icon-preview"
                    />
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Обновить
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
    </div>
    <BottomNav  />
    <Footer/>
    </>
  );
};

export default CreateCategory;