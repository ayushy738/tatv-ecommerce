import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
export const addProduct = async (req, res) => {
  try {
    const { name, description,price,category,subCategory,sizes,bestSeller } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter((item)=> item !== undefined);
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { 
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    console.log(name, description,price,category,subCategory,sizes,bestSeller);
    console.log(imagesUrl);
    const bestseller =
      req.body.bestseller === 'true' || req.body.bestseller === true;
    const productData = {
      name, 
      description,
      price:Number(price),
      category,
      subCategory,
      bestseller,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now()
    };
    console.log(productData);
    const product = new productModel(productData);
    await product.save();
    res.status(200).json({
      message: 'Product added successfully',success: true});
  } catch (error) {
    res.json({
       message: error.message, success: false
    });
  }
}
export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({
      message: 'Products fetched successfully',
      success: true,
      products: products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: error.message });
  }
}
export const removeProduct = async (req, res) => {
 try {
  await productModel.findByIdAndDelete(req.body.id);
  res.status(200).json({
    message: 'Product removed successfully',
    success: true
  });
 } catch (error) {
  console.error(error);
  res.status(500).json({success: false, message: error.message });
 }
}
export const singleProduct = async (req, res) => {
  try {
    const {productId} = req.body;
    const product = await productModel.findById(productId);
    res.status(200).json({
      message: 'Product fetched successfully',
      success: true,
      product: product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: error.message });
  }
}