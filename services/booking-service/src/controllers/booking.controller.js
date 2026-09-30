const Booking = require("../models/booking.model");
const axios = require("axios");
const {
  publishMessage
} = require("../config/rabbitmq");

const createBooking = async (req, res) => {
  try {
    const {
      eventId,
      seatIds,
      totalAmount
    } = req.body;

    if (
      !eventId ||
      !seatIds ||
      seatIds.length === 0 ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        message: "eventId, seatIds and totalAmount are required"
      });
    }

    // Verify that the user actually owns the seat locks
    try {
      await axios.post(
        `${process.env.SEAT_SERVICE_URL}/api/seats/verify`,
        {
          seatIds
        },
        {
          headers: {
            Authorization: req.headers.authorization
          }
        }
      );
    } catch (error) {
      return res.status(
        error.response?.status || 500
      ).json({
        message:
          error.response?.data?.message ||
          "Seat verification failed"
      });
    }

    const booking = await Booking.create({
      userId: req.user.userId,
      eventId,
      seatIds,
      totalAmount,
      status: "PENDING"
    });

    await publishMessage("booking_created", {
    bookingId: booking._id.toString(),
    userId: req.user.userId,
    eventId,
    seatIds,
    totalAmount
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.userId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    if (booking.userId !== req.user.userId) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    res.status(200).json({
      booking
    });
  } catch (error) {
    console.error("Get booking error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const handlePaymentSuccess = async (data) => {
  const booking = await Booking.findById(
    data.bookingId
  );

  if (!booking) {
    console.log("Booking not found");
    return;
  }

  booking.status = "CONFIRMED";
  booking.paymentId = data.paymentId;

  await booking.save();

  console.log(
    `Booking ${booking._id} confirmed`
  );
};

const handlePaymentFailure = async (data) => {
  const booking = await Booking.findById(
    data.bookingId
  );

  if (!booking) {
    console.log("Booking not found");
    return;
  }

  booking.status = "PAYMENT_FAILED";

  await booking.save();

  console.log(
    `Payment failed for booking ${booking._id}`
  );
};


module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  handlePaymentSuccess,
  handlePaymentFailure
};