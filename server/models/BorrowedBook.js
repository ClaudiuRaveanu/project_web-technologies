const mongoose = require('mongoose')

const BorrowedBookSchema = new mongoose.Schema({
    book_id: { type: Number, required: true },
    student_id: { type: Number, required: true },
    borrow_date: { type: String, required: true },
    return_date: { type: String, required: true }
});

module.exports = mongoose.model('Borrowings', BorrowedBookSchema);