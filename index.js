require("dotenv").config();
const express = require("express");
const sequelize = require('./database/config');

// models import to sync the database 
const book = require("./models/Book");
const student = require("./models/Student");
const issuedBook = require("./models/IssuedBook");

try {

    sequelize.sync().then(() => {

        const app = express();

        const PORT = process.env.PORT;

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        const studentRoute = require("./routes/student.route");
        const bookRoute = require("./routes/book.route");

        app.use("/api/students", studentRoute);
        app.use("/api/books", bookRoute);

        app.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`)
        });

    });
} catch (error) {
    console.error('Error with database', error)
}
