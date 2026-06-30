const express = require("express");
const cors = require("cors");

const vesselRoutes = require("./routes/vesselRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Supply Chain API Running...");
});

app.use("/api/vessels", vesselRoutes);

module.exports = app;