const Payment = require("../models/payment.model");

const processPayment = async (data) => {
  const {
    bookingId,
    userId,
    totalAmount
  } = data;

  console.log(
    `Processing payment for booking ${bookingId}`
  );

  // Simulate payment processing
  const paymentSuccessful = Math.random() > 0.2;

  console.log(
    `💰 Payment result: ${
      paymentSuccessful ? "SUCCESS" : "FAILED"
    }`
  );

  const payment = await Payment.create({
    bookingId,
    userId,
    amount: totalAmount,
    status: paymentSuccessful
      ? "SUCCESS"
      : "FAILED",
    transactionId: paymentSuccessful
      ? `TXN-${Date.now()}`
      : null
  });

  console.log(
    `✅ Payment saved: ${payment.status}`
  );

  return payment;
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json({
      count: payments.length,
      payments
    });
  } catch (error) {
    console.error("Get payments error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json({
      count: payments.length,
      payments
    });
  } catch (error) {
    console.error("Get my payments error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    if (payment.userId !== req.user.userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }
    res.status(200).json({ payment });
  } catch (error) {
    console.error("Get payment by id error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPaymentByBookingId = async (req, res) => {
  try {
    const payment = await Payment.findOne({ bookingId: req.params.bookingId });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found for this booking" });
    }
    if (payment.userId !== req.user.userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }
    res.status(200).json({ payment });
  } catch (error) {
    console.error("Get payment by booking id error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  processPayment,
  getPayments,
  getMyPayments,
  getPaymentById,
  getPaymentByBookingId
};