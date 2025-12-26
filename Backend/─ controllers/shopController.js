import ShopInfo from "../models/ShopInfo.js";

// Get shop info (frontend)
export const getShopInfo = async (req, res) => {
  const info = await ShopInfo.findOne();
  res.json(info);
};

// Create or Update shop info (admin)
export const updateShopInfo = async (req, res) => {
  let info = await ShopInfo.findOne();

  if (info) {
    info.shopName = req.body.shopName;
    info.address = req.body.address;
    info.phone = req.body.phone;
    info.whatsapp = req.body.whatsapp;
    await info.save();
    return res.json(info);
  }

  const newInfo = await ShopInfo.create(req.body);
  res.json(newInfo);
};
