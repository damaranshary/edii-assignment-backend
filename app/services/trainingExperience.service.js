import db from "./db.services.js";

const create = async ({ trainingExperience, employeeId }) => {
  const [result] = await db.query(
    "INSERT INTO training_experiences " +
      "(candidate_employee_id, training_name, training_year, certificate) " +
      "VALUES (?, ?, ?, ?)",
    [
      employeeId,
      trainingExperience.training_name,
      trainingExperience.training_year,
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

const update = async ({
  training_name,
  training_year,
  certificate,
  id,
  candidate_employee_id,
}) => {
  const [result] = await db.query(
    "UPDATE training_experiences SET training_name = ?, training_year = ?, certificate = ? WHERE id = ? AND candidate_employee_id = ?",
    [training_name, training_year, certificate, id, candidate_employee_id]
  );

  return result.affectedRows;
};

export default {
  create,
  getAllByEmployeeId,
  update,
};
