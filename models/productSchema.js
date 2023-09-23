import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    price: {
      type: Number,
      required: true, // Make sure 'price' is required
    },
    category: {
      type: String,
       required: true, // Make sure 'category' is required
    },
    quantity: String,
    countInStock: {
      type: Number,
      required: true,
    },
    rating: Number,
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  });
  

 const  Product = mongoose.model('Product', productSchema);
 export default Product;


