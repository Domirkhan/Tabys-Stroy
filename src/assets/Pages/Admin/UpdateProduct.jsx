import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu"
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
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [characteristics, setCharacteristics] = useState([]);
  const [id, setId] = useState("");

  // Получение одного продукта
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setCategory(data.product.category._id);
      setSubcategory(data.product.subcategory?._id || "");
      setCharacteristics(data.product.characteristics || []);
      setAvailability(data.product.availability || "Есть в наличии"); // Добавляем это
    } catch (error) {
      console.log(error);
      toast.error("Error while getting single product");
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
      toast.error("Something went wrong in getting categories");
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
      toast.error("Something went wrong in getting subcategories");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
    getAllSubcategories();
    // eslint-disable-next-line
  }, []);

  // Обновление продукта
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("subcategory", subcategory);
      productData.append("characteristics", JSON.stringify(characteristics));
      productData.append("availability", availability); // Добавляем availability
      if (photo) productData.append("photo", photo);
  
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Удаление продукта
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure you want to delete this product?");
      if (!answer) return;
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              {/* Выбор категории */}
              <Select
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
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
                placeholder="Select a subcategory"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setSubcategory(value);
                }}
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
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
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
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
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
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              {/* Характеристики */}
              <div className="mb-3">
                <h5>Characteristics</h5>
                {characteristics.map((char, index) => (
                  <div key={index} className="d-flex mb-2">
                    <input
                      type="text"
                      placeholder="Key"
                      value={char.key}
                      className="form-control me-2"
                      onChange={(e) =>
                        handleCharacteristicChange(index, "key", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Value"
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
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddCharacteristic}
                >
                  Add Characteristic
                </button>
              </div>

              {/* Кнопки */}
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default UpdateProduct;