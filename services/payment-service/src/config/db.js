const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Payment DB connected");
  } catch (error) {
    console.error(
      "Payment DB connection failed:",
      error.message
    );

    process.exit(1);
  }
};

module.exports = connectDB;