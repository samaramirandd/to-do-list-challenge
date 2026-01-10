require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// conexão com o banco de dados
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.get("/", (req, res) => {
    res.send("API is running");
});

// Ligação de rotas
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);