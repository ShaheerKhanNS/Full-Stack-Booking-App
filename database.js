const Sequelize = require("sequelize");
const sequelize = new Sequelize("booking-app", "root", "shaheerkhanns@NODE", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
