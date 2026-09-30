require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5004;

const {
  connectRabbitMQ,
  consumeMessages
} = require("./config/rabbitmq");

const {
  handlePaymentSuccess,
  handlePaymentFailure
} = require("./controllers/booking.controller");

const startServer = async () => {
  try {
    await connectDB();

    await connectRabbitMQ();

    await consumeMessages(
    "payment_successful",
    handlePaymentSuccess
  );

  await consumeMessages(
    "payment_failed",
    handlePaymentFailure
  );

    app.listen(PORT, () => {
      console.log(
        `Booking Service running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start Booking Service:",
      error
    );
  }
};

startServer();