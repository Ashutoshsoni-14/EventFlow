const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      index: true
    },

    seatNumber: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "LOCKED", "BOOKED"],
      default: "AVAILABLE"
    },

    lockedBy: {
      type: String,
      default: null
    },

    lockedUntil: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

seatSchema.index(
  { eventId: 1, seatNumber: 1 },
  { unique: true }
);

module.exports = mongoose.model("Seat", seatSchema);