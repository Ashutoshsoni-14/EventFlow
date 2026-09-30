require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const {
  connectRabbitMQ,
  consumeMessages,
  publishMessage
} = require("./config/rabbitmq");

const {
  processPayment
} = require("./controllers/payment.controller");

const PORT = process.env.PORT || 5005;

const startServer = async () => {
  try {
    await connectDB();

    await connectRabbitMQ();

    await consumeMessages(
      "booking_created",
      async (data) => {
        const payment =
          await processPayment(data);

        if (payment.status === "SUCCESS") {
          await publishMessage(
            "payment_successful",
            {
              bookingId: payment.bookingId,
              paymentId: payment._id.toString(),
              transactionId:
                payment.transactionId,
              amount: payment.amount
            }
          );
        } else {
          await publishMessage(
            "payment_failed",
            {
              bookingId: payment.bookingId,
              paymentId: payment._id.toString(),
              amount: payment.amount
            }
          );
        }
      }
    );

    app.listen(PORT, () => {
      console.log(
        `Payment Service running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start Payment Service:",
      error
    );
  }
};

startServer();