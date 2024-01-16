import db from "./db.services.js";

const register = async ({ email, password }) => {
  const [result] = await db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password]
  );

  return result.insertId;
};

const login = async ({ email, password }) => {
  const [rows] = await db.query(
    "SELECT id, email, role FROM users WHERE email = ? AND password = ?",
    [email, password]
  );

  return rows[0];
};

export default {
  register,
  login,
};
