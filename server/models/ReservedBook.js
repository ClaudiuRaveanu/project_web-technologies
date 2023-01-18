const mongoose = require('mongoose')

const ReservedBookSchema = mongoose.Schema({
    student_id: { type: String, required: true },
    book_id: { type: String, required: true },
    creation_date: { type: String, required: true },
    pickup_date: { type: String, required: true }
})

module.exports = mongoose.Schema('ReservedBooks', ReservedBookSchema)