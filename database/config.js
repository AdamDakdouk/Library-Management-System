const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create a Sequelize instance for connecting to the MySQL database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    });

// Authenticate the database connection
sequelize.authenticate().then(() => {
    console.log("Database connection is successfull");
}).catch(error => {
    console.error("Unable to connect to database.");
});

module.exports = sequelize;