import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error("Ошибка получения категорий:", error);
      toast.error("Не удалось загрузить категории");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getSubcategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/subcategory/get-subcategory`);
      if (data?.success) {
        setSubcategories(data?.subcategories);
      }
    } catch (error) {
      console.error("Ошибка получения подкатегорий:", error);
      toast.error("Не удалось загрузить подкатегории");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    getSubcategories();
  }, []);

  return { 
    categories, 
    subcategories, 
    loading, 
    error,
    refreshCategories: getCategories,
    refreshSubcategories: getSubcategories 
  };
}