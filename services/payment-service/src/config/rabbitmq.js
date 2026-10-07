const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async (maxRetries = 10, delay = 3000) => {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      channel = await connection.createChannel();

      await channel.assertQueue("booking_created", { durable: true });
      await channel.assertQueue("payment_successful", { durable: true });
      await channel.assertQueue("payment_failed", { durable: true });

      console.log("RabbitMQ connected successfully in Payment Service");
      return;
    } catch (error) {
      console.error(`RabbitMQ connection attempt ${i}/${maxRetries} failed:`, error.message);
      if (i === maxRetries) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

const publishMessage = async (queue, message) => {
  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(message)),
    {
      persistent: true
    }
  );
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
        error
      );

      channel.nack(message, false, false);
    }
  });
};

module.exports = {
  connectRabbitMQ,
  publishMessage,
  consumeMessages
};