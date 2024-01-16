import dotenv from "dotenv";
dotenv.config();

const db = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB || "candidate_employees",
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT || 3306,
};

export default db;