require("dotenv").config();
const express = require("express");
const sequelize = require('./database/config');

try {
    // sync database
    sequelize.sync().then(() => {

        const app = express();

        const PORT = process.env.PORT;

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        const studentRoute = require("./routes/student.route");
        const bookRoute = require("./routes/book.route");
        const issuedBookRoute = require("./routes/issuedBook.route");

        app.use("/api/students", studentRoute);
        app.use("/api/books", bookRoute);
        app.use("/api/issue", issuedBookRoute);

        // run server
        app.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`)
        });

    });
} catch (error) {
    console.error('Error with database', error)
}
