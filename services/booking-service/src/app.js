const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const bookingRoutes = require("./routes/booking.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "booking-service",
    status: "OK"
  });
});

app.use("/api/bookings", bookingRoutes);

module.exports = app;