const express = require('express');
const { getAllIssuedBooksController, issueBookController, returnBookController } = require('../controllers/issueBook.controller');
const router = express.Router();

router.get("/getAllIssuedBooks", getAllIssuedBooksController);
router.post("/issueBook", issueBookController);
router.post("/returnBook", returnBookController);

module.exports = router;