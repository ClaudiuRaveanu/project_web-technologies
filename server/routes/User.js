const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Users = require('../models/User')
const Books = require('../models/Book')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, cb) => {
    cb(null, user._id)
})

passport.deserializeUser((id, cb) => {
    Users.findOne({ _id: id }, (err, user) => {
        const userInfo = {
            email: user.email,
            username: user.username,
            userType: user.userType,
            id: user._id
        }
        cb(err, userInfo)
    })
})

passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    Users.findOne({ email: email }, (err, user) => {
        if (err) throw err
        if (!user) return done(null, false)
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err
            if (result === true)
                return done(null, user)
            else
                return done(null, false)
        })
    })
}))

// Routes

router.post('/register', async (req, res) => {
    const { first_name, last_name, username, user_type, password, id_number, phone, email } = req?.body

    Users.findOne({ email }, async (err, doc) => {
        if (err) throw err
        if (doc) res.send('duplicate-found')
        if (!doc) {
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = new Users({
                first_name: first_name,
                last_name: last_name,
                username: username,
                password: hashedPassword,
                id_number: id_number,
                user_type: user_type,
                phone: phone,
                email: email
            })
            await newUser.save()
            res.send('login-successful')
        }
    })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user)
})

router.get('/user', (req, res) => {
    res.send(req.user)
})

router.get('/currentUser', async (req, res) => {
    if (req.user !== undefined) {
        const account = await Users.findOne({ username: req.user.username })
        res.json(account)
    } else res.json(undefined)
})

router.patch('/update/:id', async (req, res) => {
    const account = await Users.updateOne({ _id: req.params.id }, { $set: req.body })
    res.json(account)
})

router.get('/all', async (req, res) => {
    const allUsers = await Users.find({}, (err, data) => {
        if (err) throw err
        return data
    })
    res.send(allUsers)
})

router.get('/wishlist', async (req, res) => {
    if (req.user !== undefined) {
        const wish = await Users.findOne({ username: req.user.username }, { wishlist: 1 })

        let book_list = []

        for (let i = 0; i < wish.wishlist.length; i++) {
            let book = await Books.findOne({ _id: wish.wishlist[i].book_id })
            book_list.push(book)
        }
        res.json(book_list)
    }
})

router.patch('/removeWishlist', async (req, res) => {
    const result = await Users.findOneAndUpdate({ _id: req.body._id }, { $pull: { wishlist: { _id: req.body.wishlist_id }}})
    res.json(result)
})

router.get('/logout', (req, res) => {
    req.logout()
    res.send('logout-successful')
})

module.exports = router