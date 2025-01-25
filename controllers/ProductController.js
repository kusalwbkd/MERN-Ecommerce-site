import { StatusCodes } from "http-status-codes"
import Product from "../models/Product.js"
import { formatImage } from "../middleware/multerMiddleware.js"
import cloudinary from 'cloudinary';
import { NotFoundError } from "../erros/customError.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";
import Notification from "../models/Notification.js";

export const createProduct = async (req, res) => {


   const file = formatImage(req.file);
   const response = await cloudinary.v2.uploader.upload(file);
   req.body.image = response.secure_url;
   req.body.imagePublicId = response.public_id;
   req.body.user = req.user.userId;
   const product = await Product.create(req.body)



   res.status(StatusCodes.OK).json({ product })
}

export const getAllProducts = async (req, res) => {

   const products = await Product.find({}).select('-createdAt')
   const categories = await Product.distinct('category')
   const companies = await Product.distinct('company')
   const totalProducts=products.length
   res.status(StatusCodes.OK).json({ products, categories, companies,totalProducts });
}

export const getSingleProduct = async (req, res) => {
   const { id: productId } = req.params

   const product = await Product.findById(productId).populate("reviews")

   const reviews = await Review.find({ product: productId }).populate({ path: 'user', select: 'name' })

   if (!product) {
      throw new NotFoundError(`No product with ${productId}`)
   }


   res.status(StatusCodes.OK).json({ product, reviews })
}
export const updateProduct = async (req, res) => {
   const { id: productId } = req.params

   if (req.file) {
      const file = formatImage(req.file);
      const response = await cloudinary.v2.uploader.upload(file);
      req.body.image = response.secure_url;
      req.body.imagePublicId = response.public_id;
   }
   req.body.user = req.user.userId;
   const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
      new: true,

   })
   if (req.file && product.imagePublicId) {
      await cloudinary.v2.uploader.destroy(product.imagePublicId);
   }


   res.status(StatusCodes.OK).json({ msg: 'product updated!' })
}
export const deleteProduct = async (req, res) => {
   const { id: productId } = req.params



   await Review.find({ product: productId }).deleteOne()
   await Product.findById(productId).deleteOne()
   res.status(StatusCodes.OK).json({ msg: 'product removed!!' })
}
