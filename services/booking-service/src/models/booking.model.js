const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true
    },

    eventId: {
      type: String,
      required: true,
      index: true
    },

    seatIds: [
      {
        type: String,
        required: true
      }
    ],

    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "CANCELLED",
        "PAYMENT_FAILED"
      ],
      default: "PENDING"
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    paymentId: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);