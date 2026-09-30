const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const eventRoutes = require("./routes/event.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "event-service",
    status: "OK"
  });
});

app.use("/api/events", eventRoutes);

module.exports = app;