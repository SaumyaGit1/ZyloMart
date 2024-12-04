import express from "express";
import { addProduct, listProducts, getSingleProduct, removeProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
const productRouter = express.Router();

// Add a product (using multer's `fields` method for multiple file fields)
productRouter.post(
  "/add",adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// List all products
productRouter.get("/list", listProducts);

// Get a single product by ID
productRouter.get("/single/:id", getSingleProduct);

// Remove a product by ID
productRouter.delete("/remove/:id",adminAuth, removeProduct);

export default productRouter;
