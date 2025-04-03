const BorrowedBook = require('../models/BorrowedBook');
const Book = require('../models/Book');
const User = require('../models/User');

// Mark a book as borrowed by a user
exports.borrowBook = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        
        // Check if user and book exist
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        // Check if book is available
        if (book.status !== 'available') {
            return res.status(400).json({
                success: false,
                message: 'Book is already borrowed'
            });
        }
        
        // Count how many books the user currently has borrowed
        const activeBorrows = await BorrowedBook.countDocuments({
            user: userId,
            status: 'borrowed'
        });
        
        // Limit users to borrowing 2 books at a time
        if (activeBorrows >= 2) {
            return res.status(400).json({
                success: false,
                message: 'User has already borrowed 2 books. Return some books before borrowing more.'
            });
        }
        
        // Create new borrow record
        const newBorrow = new BorrowedBook({
            book: bookId,
            user: userId,
            borrowDate: new Date()
        });
        
        await newBorrow.save();
        
        // Update book status
        book.status = 'borrowed';
        book.currentBorrower = userId;
        await book.save();
        
        res.status(200).json({
            success: true,
            message: 'Book borrowed successfully',
            data: newBorrow
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to borrow the book',
            error: error.message
        });
    }
};

// Return a borrowed book
exports.returnBook = async (req, res) => {
    try {
        const { borrowId } = req.params;
        
        // Find the borrow record
        const borrow = await BorrowedBook.findById(borrowId)
            .populate('book')
            .populate('user');
        
        if (!borrow) {
            return res.status(404).json({
                success: false,
                message: 'Borrow record not found'
            });
        }
        
        // Check if book is already returned
        if (borrow.status === 'returned') {
            return res.status(400).json({
                success: false,
                message: 'Book is already returned'
            });
        }
        
        // Update borrow record
        borrow.status = 'returned';
        borrow.returnDate = new Date();
        await borrow.save();
        
        // Update book status
        const book = await Book.findById(borrow.book._id);
        book.status = 'available';
        book.currentBorrower = null;
        await book.save();
        
        res.status(200).json({
            success: true,
            message: 'Book returned successfully',
            data: borrow
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to return the book',
            error: error.message
        });
    }
};

// Fetch all borrowed books for a user
exports.getBorrowedBooksByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Find all borrow records for the user
        const borrowedBooks = await BorrowedBook.find({
            user: userId,
            status: 'borrowed'
        })
            .populate('book', 'title description author')
            .populate({
                path: 'book',
                populate: {
                    path: 'author',
                    select: 'name'
                }
            });
        
        res.status(200).json({
            success: true,
            message: 'Borrowed books retrieved successfully',
            count: borrowedBooks.length,
            data: borrowedBooks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to retrieve borrowed books',
            error: error.message
        });
    }
};