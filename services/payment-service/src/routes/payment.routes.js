const express = require("express");

const {
  getPayments,
  getMyPayments,
  getPaymentById,
  getPaymentByBookingId
} = require("../controllers/payment.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments (Admin only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all payments
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.get("/", protect, adminOnly, getPayments);

/**
 * @swagger
 * /api/payments/my:
 *   get:
 *     summary: Get payments for authenticated user
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's payments
 *       401:
 *         description: Authentication required
 */
router.get("/my", protect, getMyPayments);

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
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
 *         description: Payment details
 *       404:
 *         description: Payment not found
 */
router.get("/:id", protect, getPaymentById);

/**
 * @swagger
 * /api/payments/booking/{bookingId}:
 *   get:
 *     summary: Get payment by Booking ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 */
router.get("/booking/:bookingId", protect, getPaymentByBookingId);

module.exports = router;
