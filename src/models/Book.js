const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
   // image: {
     //   type: String,
       // default: null,
    //},
    status: {
        type: String,
        enum: ['available', 'borrowed'],
        default: 'available',
    },
    price: {
        type: Number,
        required: true,
    },
    currentBorrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);