import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Получение категорий
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`);
      setCategories(data?.category || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Получение подкатегорий
  const getSubcategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/subcategory/get-subcategory`);
      setSubcategories(data?.subcategories || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getSubcategories();
  }, []);
  
  useEffect(() => {
    console.log('Категории:', categories);
    console.log('Подкатегории:', subcategories);
  }, [categories, subcategories]);

  return { categories, subcategories };
}