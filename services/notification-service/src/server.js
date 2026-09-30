require("dotenv").config();

const app = require("./app");

const {
  connectRabbitMQ,
  consumeMessages
} = require("./config/rabbitmq");

const {
  sendBookingConfirmation,
  sendBookingCancellation
} = require("./controllers/notification.controller");

const PORT = process.env.PORT || 5006;

const startServer = async () => {
  try {
    await connectRabbitMQ();

    await consumeMessages(
  "notification_booking_confirmed",
  sendBookingConfirmation
);

await consumeMessages(
  "notification_booking_cancelled",
  sendBookingCancellation
);

    app.listen(PORT, () => {
      console.log(
        `Notification Service running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start Notification Service:",
      error
    );
  }
};

startServer();