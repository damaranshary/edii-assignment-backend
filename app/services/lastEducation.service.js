import db from "./db.services.js";

const create = async ({ lastEducation, employeeId }) => {
  const [result] = await db.query(
    "INSERT INTO last_educations " +
      "(candidate_employee_id, level, institution, major, graduation_year, grade) " +
      "VALUES (?, ?, ?, ?, ?, ?)",
    [
      employeeId,
      lastEducation.level,
      lastEducation.institution,
      lastEducation.major,
      lastEducation.graduation_year,
      lastEducation.grade,
    ]
  );

  return result.insertId;
};

const getAllByEmployeeId = async (employeeId) => {
  const [rows] = await db.query(
    "SELECT * FROM last_educations WHERE candidate_employee_id = ?",
    [employeeId]
  );

  return rows;
};

export default {
  create,
  getAllByEmployeeId,
};
