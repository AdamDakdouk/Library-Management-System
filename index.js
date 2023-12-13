// Load environment variables from .env file
require("dotenv").config();

const ejs = require("ejs"); 

// Import required modules
const express = require("express");
const sequelize = require('./database/config');
const { getAllStudentsController } = require("./controllers/student.controller");
const Student = require("./models/Student");

try {
    // Synchronize the database models with the database
    sequelize.sync().then(() => {

        // Create an Express application
        const app = express();

        // Set the port for the server from environment variables or default to 3000
        const PORT = process.env.PORT || 3000;

        // Middleware for parsing incoming request bodies
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        
        app.set("view engine", "ejs");
        
        app.get('/', async(req, res) => {
            const students = await Student.findAll();
            const data = {
                message: "Welcome from ejs!",
                username: "M1111",
                content: "This is a test",
                students
            }

            res.render('index', data);
        })
        // Import routes for students, books, and issued books
        const studentRoute = require("./routes/student.route");
        const bookRoute = require("./routes/book.route");
        const issuedBookRoute = require("./routes/issuedBook.route");

        // Use the routes for specific API endpoints
        app.use("/api/students", studentRoute);
        app.use("/api/books", bookRoute);
        app.use("/api/issue", issuedBookRoute);

        // Start the server and listen on the specified port
        app.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`)
        });

    });
} catch (error) {
    console.error('Error with database', error)
}
