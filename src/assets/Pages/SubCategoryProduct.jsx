import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from '../../context/cart';
import Header from "../layout/Header";

const SubCategoryProduct = () => {
  const [cart, setCart] = useCart();
  const { subcategory, slug } = useParams(); // subcategory - категория, slug - подкатегория
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState({});

  // Используем slug как идентификатор подкатегории
  const subcatSlug = slug ? slug : subcategory;

  useEffect(() => {
    if (subcatSlug) {
      getProductsBySubcategory();
    }
  }, [subcatSlug]);

  const getProductsBySubcategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/product-subcategory/${subcatSlug}`
      );
      setProducts(data?.products || []);
      setSubcategoryData(data?.subcategory || {});
    } catch (error) {
      console.error("Error fetching subcategory products:", error);
    }
  };

  return (
    <>
    <Header/>
    <div className="container mt-3">
      <h4 className="text-center">
        Subcategory - {subcategoryData?.name || subcatSlug}
      </h4>
      <h6 className="text-center">{products?.length} products found</h6>
      <div className="row">
        <div className="col-md-9 offset-1">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">$ {p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SubCategoryProduct;