import categoryModel from "../models/categoryModel.js";
import subcategoryModel from "../models/Subcategory.js";
import slugify from "slugify";

export const createSubcategoryController = async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    if (!category) {
      return res.status(401).send({ message: "Category is required" });
    }
    
    // Найдем категорию по slug или названию, если вы передаёте не ObjectId.
    let categoryRecord = await categoryModel.findOne({ slug: slugify(category) });
    if (!categoryRecord) {
      return res.status(400).send({ message: "Category not found" });
    }
    
    const existingSubcategory = await subcategoryModel.findOne({ name });
    if (existingSubcategory) {
      return res.status(200).send({
        success: true,
        message: "Subcategory already exists",
      });
    }
    
    const subcategory = await new subcategoryModel({
      name,
      slug: slugify(name),
      category: categoryRecord._id, // используем корректный ObjectId
    }).save();

    res.status(201).send({
      success: true,
      message: "New subcategory created",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in subcategory",
      error,
    });
 }
};
// обновить подкатегорию
export const updateSubcategoryController = async (req, res) => {
    try {
      const { name, category } = req.body;
      const { id } = req.params;
  
      // Найдем категорию по slug (или названию, если необходимо)
      const categoryRecord = await categoryModel.findOne({ slug: slugify(category) });
      if (!categoryRecord) {
        return res.status(400).send({ message: "Category not found" });
      }
  
      const subcategory = await subcategoryModel.findByIdAndUpdate(
        id,
        {
          name,
          slug: slugify(name),
          category: categoryRecord._id, // используем найденный ObjectId
        },
        { new: true }
      );
  
      res.status(200).send({
        success: true,
        message: "Subcategory updated successfully",
        subcategory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while updating subcategory",
        error,
      });
    }
  };

// получить все подкатегории
export const getAllSubcategoriesController = async (req, res) => {
  try {
    const subcategories = await subcategoryModel.find({}).populate("category");
    if (!subcategories || subcategories.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No subcategories found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All subcategories list",
      subcategories,
    });
  } catch (error) {
    console.error("Error while getting subcategories: ", error);
    res.status(500).send({
      success: false,
      message: "Error while getting subcategories",
      error: error.message || error,
    });
  }
};

export const singleSubcategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).send({
        success: false,
        message: "Slug parameter is required",
      });
    }
    const subcategory = await subcategoryModel
      .findOne({ slug })
      .populate("category");

    if (!subcategory) {
      return res.status(404).send({
        success: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get single subcategory successfully",
      subcategory,
    });
  } catch (error) {
    console.error("Error while getting single subcategory: ", error);
    res.status(500).send({
      success: false,
      message: "Error while getting single subcategory",
      error: error.message || error,
    });
  }
};

export const deleteSubcategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Subcategory id is required",
      });
    }
    const deleted = await subcategoryModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({
        success: false,
        message: "Subcategory not found for deletion",
      });
    }
    res.status(200).send({
      success: true,
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting subcategory: ", error);
    res.status(500).send({
      success: false,
      message: "Error while deleting subcategory",
      error: error.message || error,
    });
  }
};