import mysql from "mysql2/promise.js";
import dbConfig from "../config/db.config.js";

const query = async (sql, params) => {
  const connection = await mysql.createConnection(dbConfig);
  const results = await connection.execute(sql, params);

  return results;
};

export default {
  query,
};
