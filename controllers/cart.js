// Create a new route for adding a product to the cart
// router.post('/add-to-cart/:productId', authMiddleware, productController.addToCart);

import User from "../models/registerSchema.js";

// The controller might look like this
export const addToCart = async (req, res) => {
    try {
      const { productId } = req.params;
      const user = req.user;
  
      // Check if the product is already in the user's cart
      const existingCartItem = user.cart.find((item) => item.productId.toString() === productId);
  
      if (existingCartItem) {
        // If it exists, you can increase the quantity or handle it as needed
        existingCartItem.quantity += 1;
      } else {
        // If it doesn't exist, add it to the cart
        user.cart.push({ productId, quantity: 1 });
      }
  
      await user.save();
      res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  // Define the remove from cart controller
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    // Find the index of the item in the user's cart
    const itemIndex = user.cart.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Remove the item from the cart
    user.cart.splice(itemIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
