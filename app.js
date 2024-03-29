import express from "express";
import employeeRouter from "./app/routes/employee.route.js";
import authRouter from "./app/routes/auth.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use("/api/employees", employeeRouter);

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 💩");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
