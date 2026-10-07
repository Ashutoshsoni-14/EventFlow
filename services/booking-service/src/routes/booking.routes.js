const express = require("express");

const {
  createBooking,
  getMyBookings,
  getBookingById
} = require("../controllers/booking.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - seatIds
 *               - totalAmount
 *             properties:
 *               eventId:
 *                 type: string
 *               seatIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               totalAmount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Invalid parameters
 *       409:
 *         description: Seats not locked by user
 */
router.post(
  "/",
  protect,
  createBooking
);

/**
 * @swagger
 * /api/bookings/my:
 *   get:
 *     summary: Get user bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 */
router.get(
  "/my",
  protect,
  getMyBookings
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Booking not found
 */
router.get(
  "/:id",
  protect,
  getBookingById
);

module.exports = router;