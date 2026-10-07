const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async (maxRetries = 10, delay = 3000) => {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      channel = await connection.createChannel();

      await channel.assertQueue("notification_booking_confirmed", { durable: true });
      await channel.assertQueue("notification_booking_cancelled", { durable: true });

      console.log("RabbitMQ connected successfully in Notification Service");
      return;
    } catch (error) {
      console.error(`RabbitMQ connection attempt ${i}/${maxRetries} failed:`, error.message);
      if (i === maxRetries) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

const consumeMessages = async (queue, callback) => {
  console.log(`Listening to queue: ${queue}`);

  await channel.consume(queue, async (message) => {
    if (!message) return;

    try {
      const data = JSON.parse(
        message.content.toString()
      );

      console.log(
        `📩 Received message from ${queue}:`,
        data
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