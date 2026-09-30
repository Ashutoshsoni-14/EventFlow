const express = require("express");

const {
  createBooking,
  getMyBookings,
  getBookingById
} = require("../controllers/booking.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/",
  protect,
  createBooking
);

router.get(
  "/my",
  protect,
  getMyBookings
);

router.get(
  "/:id",
  protect,
  getBookingById
);

module.exports = router;