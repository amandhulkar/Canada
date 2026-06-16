const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
// const leadRoutes = require("./routes/leadRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

console.log(process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.json());
app.use("/api/auth", authRoutes)

app.use("/api/clients", clientRoutes);

// app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("FindTemplates API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});