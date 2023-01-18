const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const session = require('express-session')
const passport = require('passport')

require('dotenv').config({ path: "./config.env" });

app.use(express.json());

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
    console.log("Connected");
});

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

app.use(
    session({
        secret: 'SecretCodeToBeUsed',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize())
app.use(passport.session())

const UsersRoutes = require('./routes/User')
app.use('/Users', UsersRoutes)

const BooksRoutes = require('./routes/Book')
app.use('/Books', BooksRoutes)

app.listen(port, console.log(`Listening to port ${port}`));