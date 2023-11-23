const express = require('express');
const { getAllBooksController, getBookByIdController, addBookController, 
        updateBookController, deletedBookController } = require('../controllers/book.controller');
const { addBookValidation, updateBookValidation } = require('../validators/book.validator');
const router = express.Router();

router.get("/getAllBooks", getAllBooksController);
router.get("/getBook", getBookByIdController);
router.post("/addBook", addBookValidation, addBookController);
router.put("/updateBook", updateBookValidation, updateBookController);
router.delete("/deleteBook", deletedBookController);

module.exports = router;