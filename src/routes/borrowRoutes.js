const express = require('express');
const borrowController = require('../controllers/borrowController');
const router = express.Router();

router.post('/borrow/:userId/:bookId', borrowController.borrowBook);
router.put('/borrow/:borrowId/return', borrowController.returnBook);
router.get('/borrow/user/:userId', borrowController.getBorrowedBooksByUser);

module.exports = router;