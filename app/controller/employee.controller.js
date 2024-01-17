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

const getOneEmployeeByUserId = async (req, res) => {
  try {
    const employee = await employeeService.getOne(req.params.userId);

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

const getOneEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getOneById(req.params.id);

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

const createEmployee = async (req, res) => {
  // console.log(req.body);
  try {
    const employeeId = await employeeService.create(req.body);

    if (!employeeId) {
      res.status(500).send({
        message: "Error creating employee",
      });
    }

    res.status(201).send({
      message: "Employee created",
      employee: employeeId,
    });
  } catch {
    res.status(500).send({
      message: "Error creating employee",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const affectedRows = await employeeService.update(req.body, req.params.id);

    if (!affectedRows) {
      res.status(404).send({
        message: `Employee with id ${req.params.id} not found`,
      });
    }

    res.status(200).send({
      message: "Employee updated",
      affectedRows: affectedRows,
    });
  } catch {
    res.status(500).send({
      message: "Error updating employee with id " + req.params.id,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const affectedRows = await employeeService.deleteOne(req.params.id);

    if (!affectedRows) {
      res.status(404).send({
        message: `Employee with id ${req.params.id} not found`,
      });
    }

    res.status(200).send({
      message: "Employee deleted",
      affectedRows: affectedRows,
    });
  } catch {
    res.status(500).send({
      message: "Error deleting employee with id " + req.params.id,
    });
  }
};

export default {
  getAllEmployees,
  getOneEmployee: getOneEmployeeByUserId,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployeeById,
};
