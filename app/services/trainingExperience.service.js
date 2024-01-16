import db from "./db.services.js";

const create = async ({ trainingExperience, employeeId }) => {
  const [result] = await db.query(
    "INSERT INTO training_experiences " +
      "(candidate_employee_id, training_name, training_year, certificate) " +
      "VALUES (?, ?, ?, ?)",
    [
      employeeId,
      trainingExperience.name,
      trainingExperience.year,
      trainingExperience.certificate,
    ]
  );

  return result.insertId;
};

const getAllByEmployeeId = async (employeeId) => {
  const [rows] = await db.query(
    "SELECT * FROM training_experiences WHERE candidate_employee_id = ?",
    [employeeId]
  );

  return rows;
};

export default {
  create,
  getAllByEmployeeId,
};
