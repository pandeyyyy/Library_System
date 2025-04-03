const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();

router.post('/authors', authorController.addAuthor);
router.put('/authors/:authorId', authorController.updateAuthor);
router.delete('/authors/:authorId', authorController.deleteAuthor);
router.get('/authors', authorController.getAuthors);
router.get('/authors/:authorId', authorController.getAuthorById);
router.get('/authors/book/:bookId', authorController.getAuthorByBook);

module.exports = router;