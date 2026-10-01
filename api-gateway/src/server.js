require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());
app.use(helmet());

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "api-gateway",
    status: "OK"
  });
});

// Auth Service
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: `${process.env.AUTH_SERVICE_URL}/api/auth`,
    changeOrigin: true
  })
);

// Event Service
app.use(
  "/api/events",
  createProxyMiddleware({
    target: `${process.env.EVENT_SERVICE_URL}/api/events`,
    changeOrigin: true
  })
);

// Seat Service
app.use(
  "/api/seats",
  createProxyMiddleware({
    target: `${process.env.SEAT_SERVICE_URL}/api/seats`,
    changeOrigin: true
  })
);

// Booking Service
app.use(
  "/api/bookings",
  createProxyMiddleware({
    target: `${process.env.BOOKING_SERVICE_URL}/api/bookings`,
    changeOrigin: true
  })
);

// Payment service
app.use(
  "/api/payments",
  createProxyMiddleware({
    target: `${process.env.PAYMENT_SERVICE_URL}/api/payments`,
    changeOrigin: true
  })
);

// Notification service 
app.use(
  "/api/notifications",
  createProxyMiddleware({
    target: `${process.env.NOTIFICATION_SERVICE_URL}/api/notifications`,
    changeOrigin: true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});