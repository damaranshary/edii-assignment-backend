import db from "./db.services.js";

const create = async ({ workExperience, employeeId }) => {
  const [result] = await db.query(
    "INSERT INTO work_experiences " +
      "(candidate_employee_id, company_name, position, work_year, salary) " +
      "VALUES (?, ?, ?, ?, ?)",
    [
      employeeId,
      workExperience.company_name,
      workExperience.position,
      workExperience.work_year,
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

const update = async ({
  company_name,
  position,
  work_year,
  salary,
  id,
  candidate_employee_id,
}) => {
  const [result] = await db.query(
    "UPDATE work_experiences SET company_name = ?, position = ?, work_year = ?, salary = ? WHERE id = ? AND candidate_employee_id = ?",
    [company_name, position, work_year, salary, id, candidate_employee_id]
  );

  return result.affectedRows;
};

const deleteAllByEmployeeId = async (employeeId) => {
  const [result] = await db.query(
    "DELETE FROM work_experiences WHERE candidate_employee_id = ?",
    [employeeId]
  );

  return result.affectedRows;
};

export default {
  create,
  getAllByEmployeeId,
  update,
  deleteAllByEmployeeId,
};
