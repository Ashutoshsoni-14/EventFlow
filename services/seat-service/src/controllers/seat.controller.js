const Seat = require("../models/seat.model");
const { redisClient } = require("../config/redis");

const createSeats = async (req, res) => {
  try {
    const { eventId, totalSeats } = req.body;

    if (!eventId || !totalSeats) {
      return res.status(400).json({
        message: "eventId and totalSeats are required"
      });
    }

    const seats = [];

    for (let i = 1; i <= totalSeats; i++) {
      seats.push({
        eventId,
        seatNumber: `S${i}`
      });
    }

    const createdSeats = await Seat.insertMany(seats);

    res.status(201).json({
      message: "Seats created successfully",
      count: createdSeats.length
    });
  } catch (error) {
    console.error("Create seats error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const getSeatsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const seats = await Seat.find({ eventId })
      .sort({ seatNumber: 1 });

    res.status(200).json({
      count: seats.length,
      seats
    });
  } catch (error) {
    console.error("Get seats error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const lockSeat = async (req, res) => {
  try {
    const { seatId } = req.params;
    const userId = req.user.userId;

    const seat = await Seat.findById(seatId);

    if (!seat) {
      return res.status(404).json({
        message: "Seat not found"
      });
    }

    if (seat.status === "BOOKED") {
      return res.status(409).json({
        message: "Seat already booked"
      });
    }

    if (seat.status === "LOCKED" && seat.lockedUntil && seat.lockedUntil > new Date()) {
      return res.status(409).json({
        message: "Seat is currently locked"
      });
    }

    const lockKey = `seat-lock:${seatId}`;

    const lockCreated = await redisClient.set(
      lockKey,
      userId,
      {
        NX: true,
        EX: 300
      }
    );

    if (!lockCreated) {
      return res.status(409).json({
        message: "Seat is currently locked"
      });
    }

    seat.status = "LOCKED";
    seat.lockedBy = userId;
    seat.lockedUntil = new Date(Date.now() + 300000);

    await seat.save();

    res.status(200).json({
      message: "Seat locked successfully",
      seatId,
      lockedUntil: seat.lockedUntil
    });
  } catch (error) {
    console.error("Lock seat error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const verifySeats = async (req, res) => {
  try {
    const { seatIds } = req.body;
    const userId = req.user.userId;

    if (!seatIds || seatIds.length === 0) {
      return res.status(400).json({
        message: "seatIds are required"
      });
    }

    const seats = await Seat.find({
      _id: { $in: seatIds }
    });

    if (seats.length !== seatIds.length) {
      return res.status(404).json({
        message: "One or more seats not found"
      });
    }

    const invalidSeat = seats.find(
      (seat) =>
        seat.status !== "LOCKED" ||
        seat.lockedBy !== userId ||
        !seat.lockedUntil ||
        seat.lockedUntil < new Date()
    );

    if (invalidSeat) {
      return res.status(409).json({
        message: "One or more seats are not locked by you"
      });
    }

    res.status(200).json({
      valid: true,
      seats
    });
  } catch (error) {
    console.error("Verify seats error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const confirmSeats = async (data) => {
  const { seatIds } = data;

  await Seat.updateMany(
    {
      _id: { $in: seatIds }
    },
    {
      $set: {
        status: "BOOKED",
        lockedBy: null,
        lockedUntil: null
      }
    }
  );

  for (const id of seatIds) {
    try {
      await redisClient.del(`seat-lock:${id}`);
    } catch (e) {
      console.error(`Failed to delete redis lock seat-lock:${id}`, e);
    }
  }

  console.log(
    `Seats booked: ${seatIds.join(", ")}`
  );
};

const releaseSeats = async (data) => {
  const { seatIds } = data;

  await Seat.updateMany(
    {
      _id: { $in: seatIds }
    },
    {
      $set: {
        status: "AVAILABLE",
        lockedBy: null,
        lockedUntil: null
      }
    }
  );

  for (const id of seatIds) {
    try {
      await redisClient.del(`seat-lock:${id}`);
    } catch (e) {
      console.error(`Failed to delete redis lock seat-lock:${id}`, e);
    }
  }

  console.log(
    `Seats released: ${seatIds.join(", ")}`
  );
};

module.exports = {
  createSeats,
  getSeatsByEvent,
  lockSeat,
  verifySeats,
  confirmSeats,
  releaseSeats
};
