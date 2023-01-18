const mongoose = require('mongoose')

const WishSchema = new mongoose.Schema({
    book_id: { type: String, required: true }
})

const BorrowingSchema = new mongoose.Schema({
    book_id: { type: String, required: true },
    pickup_date: { type: String }
})

const ReservationSchema = new mongoose.Schema({
    book_id: { type: String, required: true },
    creation_date: { type: String },
    pickup_date: { type: String }
})

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    user_type: { type: String, required: true },
    email: { type: String, required: true },
    id_number: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    wishlist: [WishSchema],
    reservations: [ReservationSchema],
    borrowings: [BorrowingSchema]
})

module.exports = mongoose.model('Users', UserSchema)