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

module.exports = {
  processPayment
};