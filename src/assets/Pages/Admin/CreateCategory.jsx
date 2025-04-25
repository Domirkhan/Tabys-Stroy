import React, { useEffect, useState } from "react";

import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Создание категории
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Создание подкатегории
  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/subcategory/create-subcategory`,
        { name: subcategoryName, category: selectedCategory }
      );
      if (data?.success) {
        toast.success(`${subcategoryName} is created`);
        setSubcategoryName("");
        setSelectedCategory("");
        getAllSubcategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating subcategory");
    }
  };

  // Получение всех категорий
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
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
      if (data.success) {
        setSubcategories(data.subcategories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting subcategories");
    }
  };

  // Обновление категории
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Удаление категории
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Удаление подкатегории
  const handleSubcategoryDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/subcategory/delete-subcategory/${id}`
      );
      if (data.success) {
        toast.success("Subcategory deleted successfully");
        getAllSubcategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting subcategory");
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllSubcategories();
  }, []);

  return (
   
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories and Subcategories</h1>

            {/* Форма для создания категории */}
            <div className="p-3 w-50">
              <h4>Create Category</h4>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            {/* Форма для создания подкатегории */}
            <div className="p-3 w-50">
              <h4>Create Subcategory</h4>
              <form onSubmit={handleSubcategorySubmit}>
                <div className="mb-3">
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
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
                    placeholder="Enter subcategory name"
                    value={subcategoryName}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create Subcategory
                </button>
              </form>
            </div>

            {/* Список категорий */}
            <div className="w-75">
              <h4>Categories</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Список подкатегорий */}
            <div className="w-75">
              <h4>Subcategories</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Actions</th>
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
                          onClick={() => handleSubcategoryDelete(sc._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Модальное окно для обновления категории */}
            <Modal
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
              >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
   
  );
};

export default CreateCategory;