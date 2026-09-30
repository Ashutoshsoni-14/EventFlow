const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL
    );

    channel = await connection.createChannel();

    await channel.assertQueue("seat_booking_confirmed", {
  durable: true
});

await channel.assertQueue("seat_booking_cancelled", {
  durable: true
});

    console.log("RabbitMQ connected");
  } catch (error) {
    console.error(
      "RabbitMQ connection failed:",
      error.message
    );

    throw error;
  }
};

const consumeMessages = async (queue, callback) => {
  await channel.consume(queue, async (message) => {
    if (!message) return;

    try {
      const data = JSON.parse(
        message.content.toString()
      );

      await callback(data);

      channel.ack(message);
    } catch (error) {
      console.error(
        `Error processing ${queue}:`,
        error.message
      );

      channel.nack(message, false, false);
    }
  });
};

module.exports = {
  connectRabbitMQ,
  consumeMessages
};