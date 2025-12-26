import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
