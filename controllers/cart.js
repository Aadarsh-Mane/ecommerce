

import Product from "../models/productSchema.js";
import User from "../models/registerSchema.js";
export const addToCart = async (req, res) => {
    try {
      const { productId } = req.params;
      const user = req.user;
      const product = await Product.findById(productId); // Assuming you have a Product model

      // Check if the product is already in the user's cart
      const existingCartItem = user.cart.find((item) => item.productId.toString() === productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      if (existingCartItem) {
        // If it exists,increase the quantity 
        if (product.countInStock <= 0) {
          return res.status(400).json({ message: 'Product out of stock' });} 
        existingCartItem.quantity += 1;
      existingCartItem.quantity += 1;
      product.countInStock -= 1;
    }else {
        // If it doesn't exist, add it to the cart
        user.cart.push({ productId, quantity: 1 });
        product.countInStock -= 1;

      }
  
      await user.save();
      await product.save();

      res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
 
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;
    const product = await Product.findById(productId); // 
    const itemIndex = user.cart.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Remove the item from the cart
    user.cart.splice(itemIndex, 1);
    product.countInStock += 1;

    // Save the updated user document
    await user.save();
    await product.save();

    res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
