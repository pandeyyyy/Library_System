const Book = require('../models/Book');
const Author = require('../models/Author');
const BorrowedBook = require('../models/BorrowedBook');

// Add a new book
exports.addBook = async (req, res) => {
    try {
        // Check if author exists
        const authorExists = await Author.findById(req.body.author);
        if (!authorExists) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            });
        }

        const newBook = new Book({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            image: req.body.image || null,
            price: req.body.price
        });

        await newBook.save();
        
        res.status(201).json({
            success: true,
            message: 'Book added successfully',
            data: newBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to add the book',
            error: error.message
        });
    }
};

// Update book details
exports.updateBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        
        // If updating author, check if author exists
        if (req.body.author) {
            const authorExists = await Author.findById(req.body.author);
            if (!authorExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Author not found'
                });
            }
        }

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            {
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                image: req.body.image,
                price: req.body.price
            },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to update the book',
            error: error.message
        });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        
        // Check if book is currently borrowed
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        if (book.status === 'borrowed') {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete a book that is currently borrowed'
            });
        }

        const deletedBook = await Book.findByIdAndDelete(bookId);
        
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: deletedBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to delete the book',
            error: error.message
        });
    }
};

// List all books with optional filters
exports.getBooks = async (req, res) => {
    try {
        let query = {};
        
        // Filter by author
        if (req.query.authorId) {
            query.author = req.query.authorId;
        }
        
        // Filter by borrowed status
        if (req.query.status) {
            query.status = req.query.status;
        }

        const books = await Book.find(query)
            .populate('author', 'name')
            .populate('currentBorrower', 'name email');
        
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to retrieve books',
            error: error.message
        });
    }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
    try {
        const { bookId } = req.params;
        
        const book = await Book.findById(bookId)
            .populate('author', 'name bio')
            .populate('currentBorrower', 'name email');
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to retrieve the book',
            error: error.message
        });
    }
};

// Get books by author
exports.getBooksByAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;
        
        // Check if author exists
        const authorExists = await Author.findById(authorId);
        if (!authorExists) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            });
        }
        
        const books = await Book.find({ author: authorId })
            .populate('author', 'name');
        
        res.status(200).json({
            success: true,
            message: 'Books by author retrieved successfully',
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to retrieve books by author',
            error: error.message
        });
    }
};