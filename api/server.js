const express = require('express');
const connectDB = require('./config/connectDB');
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const cookieParser = require('cookie-parser'); // add cookie parser
app.use(cookieParser());

// connect to database
connectDB();

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});