import express from "express";

import { healthRouter } from "./routes/health.js";

const app = express();

app.use(express.json());

app.use(healthRouter);

const port = process.env.PORT ?? 3333;

app.listen(port, () => {
  console.log(`HTTP server running on port ${port}`);
});
