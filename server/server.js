const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;
app.use(
  cors({
    origin: "http://localhost:8080",
    optionsSuccessStatus: 200,
  })
);
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.get("/data", (req, res) => {
  const data = require("./data.json");
  res.json(data).status(200);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
