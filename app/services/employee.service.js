import db from "./db.services.js";

const getAll = async () => {
  const [rows] = await db.query("SELECT * FROM candidate_employees");

  return rows;
};

const getOne = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM candidate_employees WHERE user_id = ?",
    [userId]
  );

  return rows[0];
};

export default {
  getAll,
  getOne,
};
