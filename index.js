const express = require("express");
const { PORT } = require("./src/config/secretEnv");
const connectDb = require("./src/config/db");
const { userRoute, memberRoute } = require("./src/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// Connect to MongoDB
connectDb();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());

// routes
app.use("/api", userRoute);
app.use("/api", memberRoute);

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => {
  console.log(`Server is running at port http://localhost:${PORT}`);
});
