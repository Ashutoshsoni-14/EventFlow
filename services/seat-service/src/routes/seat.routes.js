const express = require("express");

const {
  createSeats,
  getSeatsByEvent,
  lockSeat,
  verifySeats
} = require("../controllers/seat.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, createSeats);

router.get(
  "/event/:eventId",
  getSeatsByEvent
);

router.post(
  "/:seatId/lock",
  protect,
  lockSeat
);

router.post(
  "/verify",
  protect,
  verifySeats
);

module.exports = router;