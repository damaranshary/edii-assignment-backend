import express from "express";
import employeeController from "../controller/employee.controller.js";

const router = express.Router();

router.get("/", employeeController.getAllEmployees);

router.get("/:id", employeeController.getOneEmployee);

// router.post("/", employeeController.createEmployee);

export default router;