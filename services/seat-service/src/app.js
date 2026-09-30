const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const seatRoutes = require("./routes/seat.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "seat-service",
    status: "OK"
  });
});

app.use("/api/seats", seatRoutes);

module.exports = app;