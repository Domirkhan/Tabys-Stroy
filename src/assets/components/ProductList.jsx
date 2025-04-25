import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Product.css";

function ProductList({ category, subCategory }) {
  const [products, setProducts] = useState([]);
  const [subcategoryObj, setSubcategoryObj] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let endpoint = "";
        if (subCategory) {
          // Если передан параметр subCategory, запрашиваем товары по подкатегории
          endpoint = `${import.meta.env.VITE_API}/api/v1/product/product-subcategory/${subCategory}`;
        } else {
          // Иначе запрашиваем товары по категории
          endpoint = `${import.meta.env.VITE_API}/api/v1/product/product-category/${category}`;
        }
        const { data } = await axios.get(endpoint);
        setProducts(data.products || []);
        if (data.subcategory) {
          setSubcategoryObj(data.subcategory);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category, subCategory]);

  return (
    <section className="product-section">
      <div className="container">
        <h2 className="section-title-category">
          {subCategory && subcategoryObj
            ? subcategoryObj.name
            : subCategory
            ? subCategory
            : `Товары категории: ${category}`}
        </h2>
        <div className="products-grid">
          {products.map((product, index) => {
            const categorySlug =
              product.category && product.category.slug
                ? product.category.slug
                : String(product.category);
            const subcategorySlug =
              product.subcategory && product.subcategory.slug
                ? product.subcategory.slug
                : String(product.subcategory);
            return (
              <div
                key={`${product._id}-${index}`}
                className="product-card-wrapper"
                onClick={() =>
                  navigate(
                    `/${categorySlug}/${subcategorySlug}/${encodeURIComponent(
                      product.name
                    )}`
                  )
                }
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductList;