// const mysql = require("mysql2");
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "Ecommerce",
//   password: "Hello!556",
// });

// module.exports = pool.promise();
const Sequelize = require("sequelize").Sequelize;
const sequelize = new Sequelize("Ecommerce", "root", "Hello!556", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
