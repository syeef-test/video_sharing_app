import Category from "../models/categoryModel.js";

export const addCategory = async (req, res, next) => {
  try {
    if (!req.body.categoryName) {
      res.status(400).send({ message: "Send Category Name" });
    }

    const data = await Category.find({ categoryName: req.body.categoryName });

    if (data.length === 0) {
      const newCategory = {
        categoryName: req.body.categoryName,
      };

      const categoryResponse = await Category.create(newCategory);

      if (!categoryResponse) {
        return res.status(500).send({ message: "Failed To Create Category" });
      }

      return res.status(200).send(categoryResponse);
    } else {
      return res.status(400).send({ message: "Same Category Allready Exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const categoryDetails = await Category.find({ status: true });
    if (categoryDetails.length > 0) {
      return res
        .status(200)
        .json({ message: "Category Data Found", data: categoryDetails });
    } else {
      return res.status(200).send({ message: "No Category Data Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    if (!req.body.categoryName) {
      res.status(400).send({ message: "Send Category Name" });
    }

    if (!req.params.categoryId) {
      res.status(400).send({ message: "Send Category Id" });
    }

    const updateCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        categoryName: req.body.categoryName,
      },
      { new: true }
    );

    if (!updateCategory) {
      return res.status(404).send({ message: "Category Not Found" });
    }

    return res
      .status(200)
      .send({ message: "Category Updated", data: updateCategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    if (!req.params.categoryId) {
      res.status(400).send({ message: "Send Category Id" });
    }

    const deleteCategory = await Category.findByIdAndUpdate(
      categoryId,
      { status: false },
      { new: true }
    );

    if (!deleteCategory) {
      return res.status(404).send({ message: "Category Not Found" });
    }

    return res.status(200).send({
      message: "Category Deleted Succesfully",
      data: deleteCategory,
    });
  } catch (error) {}
};
