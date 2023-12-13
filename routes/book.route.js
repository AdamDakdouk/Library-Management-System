const express = require('express');
const { getAllBooksController, getBookByIdController, addBookController, 
        updateBookController, deletedBookController, getBooksByTitleController } = require('../controllers/book.controller');
const { addBookValidation, updateBookValidation } = require('../validators/book.validator');
const router = express.Router();

router.get("/getAllBooks", getAllBooksController);
router.get("/getBookById", getBookByIdController);
router.get("/getBooksByTitle", getBooksByTitleController);
router.post("/addBook", addBookValidation, addBookController);
router.post("/updateBook", updateBookValidation, updateBookController);
router.delete("/deleteBook", deletedBookController);

module.exports = router;