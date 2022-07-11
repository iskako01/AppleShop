const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");

const products = require("./products");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/register", register);

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 5000;
const url = process.env.DB_URL;

app.listen(port, console.log(`Server running on port ${port}`));

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection succsesful..."))
  .catch((err) => console.log("MongoDB connection failed", err.message));
