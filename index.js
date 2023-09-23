import express from 'express'
import  mongoose from 'mongoose';
import  bodyParser from 'body-parser'
import  authRoutes from './routes/authRoutes.js'
import  productRoutes from './routes/productRoutes.js'

import 'dotenv/config';
import { addToCart, removeFromCart } from './controllers/cart.js';
import authMiddleware from './middleware/auth.js';
import { purchaseProducts } from './controllers/purchase.js';
import { getAllProducts, searchProductsByName } from './controllers/productController.js';



const app = express();
mongoose.connect('mongodb+srv://onlyaddy68:onlyaddy123@confess.bgv01wx.mongodb.net/woolifyecomm?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(bodyParser.json());
// route to fetch all available products
app.get('/products', getAllProducts);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.post('/add-to-cart/:productId',authMiddleware,addToCart);
// removing a product from the cart
app.delete('/remove-from-cart/:productId', authMiddleware, removeFromCart);

// route for purchasing products
app.post('/purchase', authMiddleware, purchaseProducts);
//route for searching products by name
app.get('/search-products', searchProductsByName);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
