const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "Ecommerce",
  password: "Hello!556",
});

module.exports = pool.promise();
