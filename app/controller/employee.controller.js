import employeeService from "../services/employee.service.js";

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAll();
    res.status(200).send(employees);
  } catch {
    res.status(500).send({
      message: "Error retrieving employees",
    });
  }
};

export default {
  getAllEmployees,
};
