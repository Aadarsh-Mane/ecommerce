import PurchaseHistory from "../models/history.js";
import Product from "../models/productSchema.js";
import { v4 as uuidv4 } from "uuid";
export const purchaseProducts = async (req, res) => {
  try {
    const user = req.user;
    const cartItems = user.cart;

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty. Add products to your cart before making a purchase.",
      });
    }

    const transactionId = uuidv4();
    const purchaseHistory = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);

      if (product && product.price && item.quantity) {
        const purchaseRecord = new PurchaseHistory({
          username: user.email, // Assuming 'email' is the user's unique identifier
          productName: product.name, // Assuming 'name' is the product name field
          // Add more fields to the purchase history record if needed
        });

        await purchaseRecord.save();
        purchaseHistory.push(purchaseRecord);
      } else {
        return res.status(400).json({ message: "Invalid input data" });
      }
    }

    const totalCost = await calculateTotalCost(cartItems);

    // Create an order with the cart items
    const order = {
      products: cartItems,
      total: totalCost,
      // transactionId,
    };

    // Add the order to the user's orders
    user.orders.push(order);

    // Clear the cart
    user.cart = [];

    await user.save();

    res.status(200).json({ message: "Purchase successful", purchaseHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Calculate the total cost function
async function calculateTotalCost(cartItems) {
  let totalCost = 0;

  try {
    for (const item of cartItems) {
      const product = await Product.findById(item.productId);

      if (product && product.price && item.quantity) {
        totalCost += item.quantity * product.price;
      } else {
        return NaN; // Invalid input data
      }
    }

    return totalCost;
  } catch (error) {
    return NaN;
  }
}
