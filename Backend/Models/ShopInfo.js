import mongoose from "mongoose";

const shopInfoSchema = new mongoose.Schema({
  shopName: String,
  address: String,
  phone: String,
  whatsapp: String
});

export default mongoose.model("ShopInfo", shopInfoSchema);
