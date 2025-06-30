import express from "express";
import environment from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import routes from "./routes/routes.js";


environment.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.status(200).json({ message: 'Server is Working' });
});


app.listen(port, () => {
  console.log(`Server started on port ${port} at ${new Date()}.`);
});