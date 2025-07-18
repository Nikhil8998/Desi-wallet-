const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());
app.use(express.json());
const transactions = [];

app.post("/upload", upload.single("screenshot"), (req, res) => {
  const { name, upi, amount } = req.body;
  const screenshot = req.file.path;
  transactions.push({ id: Date.now(), name, upi, amount, screenshot, status: "Pending" });
  res.json({ success: true });
});

app.get("/admin/transactions", (req, res) => res.json(transactions));

app.post("/admin/confirm", (req, res) => {
  const id = req.body.id;
  const txn = transactions.find(t => t.id == id);
  if (txn) txn.status = "Confirmed";
  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on port 3000"));
