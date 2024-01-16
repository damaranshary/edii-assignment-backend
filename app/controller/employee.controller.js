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

const getOneEmployee = async (req, res) => {
  try {
    const employee = await employeeService.getOne(req.params.id);

    if (!employee) {
      res.status(404).send({
        message: `Employee with id ${req.params.id} not found`,
      });
    }

    res.status(200).send(employee);
  } catch {
    res.status(500).send({
      message: "Error retrieving employee with id " + req.params.id,
    });
  }
};

export default {
  getAllEmployees,
  getOneEmployee,
};
