import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import productRoutes from "./routes/productRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/products", productRoutes);
app.use("/api/shop", shopRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
export default app;