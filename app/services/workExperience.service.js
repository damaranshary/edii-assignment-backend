import db from "./db.services.js";

const create = async ({ workExperience, employeeId }) => {
  const [result] = await db.query(
    "INSERT INTO work_experiences " +
      "(candidate_employee_id, company_name, position, work_year, salary) " +
      "VALUES (?, ?, ?, ?, ?)",
    [
      employeeId,
      workExperience.companyName,
      workExperience.position,
      workExperience.workYear,
      workExperience.salary,
    ]
  );

  return result.insertId;
};

const getAllByEmployeeId = async (employeeId) => {
  const [rows] = await db.query(
    "SELECT * FROM work_experiences WHERE candidate_employee_id = ?",
    [employeeId]
  );

  return rows;
};

export default {
  create,
  getAllByEmployeeId,
};
