const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bharatcart",
  port: 3307
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("Database Connected");
  }
});

// Signup API
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ message: "Error" });
    } else {
      res.send({ message: "User Registered Successfully" });
    }
  });
});

// Server Start
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});