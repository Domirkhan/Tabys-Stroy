import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Footer from "../../layout/Footer";
import BottomNav from "../../components/BottomNav";
import Header from "../../layout/Header";
import { Select } from "antd";

const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("adminSelectedCategory") || "all"
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    localStorage.getItem("adminSelectedSubcategory") || "all"
  );
  const [loading, setLoading] = useState(true);

  // Получение всех категорий
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
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
        setSubcategories(data.subcategories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при получении подкатегорий");
    }
  };

  // Получение всех продуктов
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при получении продуктов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllSubcategories();
    getAllProducts();
  }, []);

  // Обработчики изменения фильтров
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubcategory("all");
    localStorage.setItem("adminSelectedCategory", value);
    localStorage.setItem("adminSelectedSubcategory", "all");
  };

  const handleSubcategoryChange = (value) => {
    setSelectedSubcategory(value);
    localStorage.setItem("adminSelectedSubcategory", value);
  };

  // Фильтрация продуктов
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") {
      return selectedSubcategory === "all"
        ? true
        : product.subcategory?._id === selectedSubcategory;
    }

    const categoryMatch = product.category?._id === selectedCategory;
    const subcategoryMatch =
      selectedSubcategory === "all" ||
      product.subcategory?._id === selectedSubcategory;

    return categoryMatch && subcategoryMatch;
  });

  // Получение текста с количеством продуктов
  const getProductCountText = () => {
    const count = filteredProducts.length;

    if (selectedCategory === "all" && selectedSubcategory === "all") {
      return `Всего продуктов: ${count}`;
    }

    if (selectedCategory !== "all" && selectedSubcategory === "all") {
      const categoryName = categories.find(
        (c) => c._id === selectedCategory
      )?.name;
      return `Продуктов в категории "${categoryName}": ${count}`;
    }

    if (selectedSubcategory !== "all") {
      const subcategoryName = subcategories.find(
        (sc) => sc._id === selectedSubcategory
      )?.name;
      return `Продуктов в подкатегории "${subcategoryName}": ${count}`;
    }

    return `Найдено продуктов: ${count}`;
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
              <div className="products-container">
                <h1 className="products-title">Список продуктов</h1>

                {/* Фильтры */}
                <div className="filters mb-4">
                  <Select
                    placeholder="Выберите категорию"
                    className="form-select mb-3"
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                    style={{ width: "200px", marginRight: "10px" }}
                  >
                    <Option value="all">Все категории</Option>
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>

                  <Select
                    placeholder="Выберите подкатегорию"
                    className="form-select mb-3"
                    onChange={handleSubcategoryChange}
                    value={selectedSubcategory}
                    style={{ width: "200px" }}
                  >
                    <Option value="all">Все подкатегории</Option>
                    {subcategories
                      ?.filter(
                        (sc) =>
                          selectedCategory === "all" ||
                          sc.category?._id === selectedCategory
                      )
                      .map((sc) => (
                        <Option key={sc._id} value={sc._id}>
                          {sc.name}
                        </Option>
                      ))}
                  </Select>

                  {/* Отображение количества продуктов */}
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "5px",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    {getProductCountText()}
                  </div>
                </div>

                {/* Список продуктов */}
                {loading ? (
                  <div>Загрузка...</div>
                ) : (
                  <div className="products-grid">
                    {filteredProducts.map((p) => (
                      <Link
                        key={p._id}
                        to={`/dashboard/admin/product/${p.slug}`}
                        className="product-card"
                      >
                        <img
                          src={`${
                            import.meta.env.VITE_API
                          }/api/v1/product/product-photo/${p._id}`}
                          className="product-image"
                          alt={p.name}
                        />
                        <div className="product-info">
                          <h5 className="product-title">{p.name}</h5>
                          <p className="product-description">{p.description}</p>
                          <p className="product-category">
                            Категория: {p.category?.name}
                          </p>
                          {p.subcategory && (
                            <p className="product-subcategory">
                              Подкатегория: {p.subcategory?.name}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
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

export default Products;
