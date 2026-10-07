const express = require("express");

const {
  getNotifications,
  getMyNotifications
} = require("../controllers/notification.controller");

const { protect, adminOnly } = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications (Admin only)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.get("/", protect, adminOnly, getNotifications);

/**
 * @swagger
 * /api/notifications/my:
 *   get:
 *     summary: Get user notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user notifications
 *       401:
 *         description: Authentication required
 */
router.get("/my", protect, getMyNotifications);

module.exports = router;
