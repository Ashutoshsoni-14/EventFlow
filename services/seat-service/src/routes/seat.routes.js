const express = require("express");

const {
  createSeats,
  getSeatsByEvent,
  lockSeat,
  verifySeats
} = require("../controllers/seat.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/seats:
 *   post:
 *     summary: Create seats for an event
 *     tags: [Seats]
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
 *               - totalSeats
 *             properties:
 *               eventId:
 *                 type: string
 *               totalSeats:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Seats created successfully
 *       400:
 *         description: Missing fields
 */
router.post("/", protect, createSeats);

/**
 * @swagger
 * /api/seats/event/{eventId}:
 *   get:
 *     summary: Get all seats for an event
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of seats
 */
router.get(
  "/event/:eventId",
  getSeatsByEvent
);

/**
 * @swagger
 * /api/seats/{seatId}/lock:
 *   post:
 *     summary: Lock a seat using Redis
 *     tags: [Seats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: seatId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seat locked successfully
 *       409:
 *         description: Seat already locked or booked
 */
router.post(
  "/:seatId/lock",
  protect,
  lockSeat
);

/**
 * @swagger
 * /api/seats/verify:
 *   post:
 *     summary: Verify seat locks ownership
 *     tags: [Seats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seatIds
 *             properties:
 *               seatIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Seats verified
 *       409:
 *         description: Seats not locked by user
 */
router.post(
  "/verify",
  protect,
  verifySeats
);

module.exports = router;