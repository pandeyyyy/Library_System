const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

router.post('/books', bookController.addBook);
router.put('/books/:bookId', bookController.updateBook);
router.delete('/books/:bookId', bookController.deleteBook);
router.get('/books', bookController.getBooks);
router.get('/books/:bookId', bookController.getBookById);
router.get('/books/author/:authorId', bookController.getBooksByAuthor);

module.exports = router;