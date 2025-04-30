import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";

import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Footer from "../../layout/Footer";
import BottomNav from "../../components/BottomNav";
import Header from "../../layout/Header";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
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
                <div className="products-grid">
                  {products?.map((p) => (
                    <Link
                      key={p._id}
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="product-card"
                    >
                      <img
                        src={`${import.meta.env.VITE_API}/api/v1/product/product-photo/${p._id}`}
                        className="product-image"
                        alt={p.name}
                      />
                      <div className="product-info">
                        <h5 className="product-title">{p.name}</h5>
                        <p className="product-description">{p.description}</p>
                      </div>
                    </Link>
                  ))}
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

export default Products;