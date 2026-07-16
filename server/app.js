const express = require("express");
const cors = require("cors");

const vesselRoutes = require("./routes/vesselRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();



app.use(
  cors({
    origin: [
    //   "http://localhost:3000",
      "https://ship-supply-chain.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Supply Chain API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/vessels", vesselRoutes);
const dashboardRoutes =
require("./routes/dashboardRoutes");

app.use(
    "/api/dashboard",
    dashboardRoutes
);

const portRoutes = require("./routes/portRoutes");

app.use("/api/ports", portRoutes);

const locationRoutes = require("./routes/locationRoutes");

app.use("/api/locations", locationRoutes);

const pathRoutes = require("./routes/pathRoutes");

app.use("/api/paths", pathRoutes);

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

module.exports = app;