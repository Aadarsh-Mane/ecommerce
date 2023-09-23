import  Product from  '../models/productSchema.js';

export const createProduct = async (req, res) => {
  try {
    const { name, type, description, quantity, countInStock, rating ,price,category} = req.body;
    const product = new Product({
      name,
      type,
      description,
      quantity,
      countInStock,
      rating,
      price,
      category,
      owner: req.user._id,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error 2' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, type, description, quantity, countInStock, rating } = req.body;
    const productId = req.params.productId;

    const product = await Product.findOne({ _id: productId, owner: req.user._id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.type = type;
    product.description = description;
    product.quantity = quantity;
    product.countInStock = countInStock;
    product.rating = rating;

    await product.save();
    res.status(200).json(product)
    
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // Fetch all available products from your database
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const searchProductsByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Check if a valid name query parameter is provided
    if (!name) {
      return res.status(400).json({ message: 'Invalid search parameter. Please provide a name.' });
    }

    
    const filter = { name: { $regex: new RegExp(name, 'i') } };

    // based on the filter
    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
