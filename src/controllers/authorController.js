const Author = require('../models/Author');
const Book = require('../models/Book');

// Add a new author
exports.addAuthor = async (req, res) => {
    try {
        const newAuthor = new Author({
            name: req.body.name,
            bio: req.body.bio || ''
        });

        await newAuthor.save();
        
        res.status(201).json({
            success: true,
            message: 'Author added successfully',
            data: newAuthor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to add the author',
            error: error.message
        });
    }
};

// Update author details
exports.updateAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;
        
        const updatedAuthor = await Author.findByIdAndUpdate(
            authorId,
            {
                name: req.body.name,
                bio: req.body.bio
            },
            { new: true }
        );

        if (!updatedAuthor) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Author updated successfully',
            data: updatedAuthor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to update the author',
            error: error.message
        });
    }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;
        
        // Check if author has books
        const hasBooks = await Book.findOne({ author: authorId });
        if (hasBooks) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete an author who has books. Delete or reassign the books first.'
            });
        }

        const deletedAuthor = await Author.findByIdAndDelete(authorId);
        
        if (!deletedAuthor) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Author deleted successfully',
            data: deletedAuthor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to delete the author',
            error: error.message
        });
    }
};

// List all authors
exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        
        res.status(200).json({
            success: true,
            message: 'Authors retrieved successfully',
            count: authors.length,
            data: authors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to retrieve authors',
            error: error.message
        });
    }
};

// Get a single author by ID
exports.getAuthorById = async (req, res) => {
    try {
        const { authorId } = req.params;
        
        const author = await Author.findById(authorId);
        
        if (!author) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Author retrieved successfully',
            data: author
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to retrieve the author',
            error: error.message
        });
    }
};

// Get authors by book
exports.getAuthorByBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        
        // Find the book
        const book = await Book.findById(bookId).populate('author');
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Author retrieved successfully',
            data: book.author
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to retrieve author by book',
            error: error.message
        });
    }
};