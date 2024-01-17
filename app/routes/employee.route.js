import express from "express";
import employeeController from "../controller/employee.controller.js";

const router = express.Router();

router.get("/", employeeController.getAllEmployees);

router.get("/users/:userId", employeeController.getOneEmployee);

router.get("/:id", employeeController.getOneEmployeeById);

router.post("/", employeeController.createEmployee);

router.put("/:id", employeeController.updateEmployee);

router.delete("/:id", employeeController.deleteEmployee);

export default router;