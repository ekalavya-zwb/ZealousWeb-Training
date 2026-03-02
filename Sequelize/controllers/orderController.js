const { createOrder, cancelOrder } = require("../services/orderService");

async function placeOrder(req, res) {
  const order = req.body;
  try {
    await createOrder(order);
    res.status(200).json({ message: "Transaction executed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function unplaceOrder(req, res) {
  const orderId = req.params.id;
  const productId = req.body.productId;
  try {
    await cancelOrder(orderId, productId);
    res.status(200).json({ message: "Transaction executed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { placeOrder, unplaceOrder };
