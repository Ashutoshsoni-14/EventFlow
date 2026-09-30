require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");

const {
  connectRabbitMQ,
  consumeMessages
} = require("./config/rabbitmq");

const {
  confirmSeats,
  releaseSeats
} = require("./controllers/seat.controller");

const PORT = process.env.PORT || 5003;

const startServer = async () => {
  try {
    await connectDB();

    await connectRedis();

    await connectRabbitMQ();

    await consumeMessages(
      "seat_booking_confirmed",
      confirmSeats
    );

    await consumeMessages(
      "seat_booking_cancelled",
      releaseSeats
    );

    app.listen(PORT, () => {
      console.log(`Seat Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Seat Service:", error);
  }
};

startServer();