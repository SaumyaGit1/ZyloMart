import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add a Product
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, subcategory, sizes, bestseller } = req.body;

    // Handling file uploads from req.files
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    if (!images.length) {
      return res.status(400).json({ success: false, message: "Images are required" });
    }

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      images.map(async (item) => {
        try {
          const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
          return result.secure_url;
        } catch (error) {
          console.error("Error uploading to Cloudinary:", error);
          throw error; // Rethrow to handle in main function
        }
      })
    );

    // Create and save the new product
    const newProduct = new productModel({
      name,
      price: Number(price),
      description,
      category,
      subcategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imageUrls,
      date: Date.now(),
    });

    const savedProduct = await newProduct.save();
    res.json({ success: true, message: "Product added", product: savedProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// List all products
export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get a single product
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params; // Use req.params for GET requests
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove a product
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received ID for deletion:", id);

    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
