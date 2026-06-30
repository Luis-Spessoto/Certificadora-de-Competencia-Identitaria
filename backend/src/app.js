const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swaggerConfig");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

module.exports = app;
