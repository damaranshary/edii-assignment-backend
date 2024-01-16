import db from "./db.services.js";

const getAll = async () => {
  const [rows] = await db.query("SELECT * FROM candidate_employees");

  return rows;
};

export default {
  getAll,
};
