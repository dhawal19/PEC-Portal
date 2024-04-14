const express = require('express');
const connectDB = require('./config/connectDB');
const app = express();

const { createServer } = require('http');
const { Server } = require('socket.io');
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        allowedHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers", "Authorization"],
        credentials: true
    }
});

const PORT = process.env.PORT || 3000;
const cors = require('cors');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // add cookie parser
// cors
app.use(credentials); // add credentials middleware

app.use(cors(corsOptions)); // add cors middleware

// middleware
app.use(bodyParser.json()); // add body parser
app.use(bodyParser.urlencoded({ extended: true })); // add body parser
app.use(cookieParser()); // add cookie parser

// connect to database
connectDB();

// socket server

const socketHandler = require('./socket/socketHandler');
socketHandler(io);

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/auth/register'));
app.use('/login', require('./routes/auth/login'));
app.use('/refresh', require('./routes/auth/refresh'));
app.use('/logout', require('./routes/auth/logout'));
app.use('/verify', require('./routes/auth/verify'));
// User profile routes
app.use('/delete', require('./routes/profile/deleteProfile'));
app.use('/updateProfile', require('./routes/profile/updateProfile'));
// Attendance routes
app.use("/attendance/addCourse", require('./routes/attendanceRoute/addCourse'));
app.use("/attendance/getUserAttendance", require('./routes/attendanceRoute/getUserAttendance'));
app.use("/attendance/editAttendance", require('./routes/attendanceRoute/editAttendance'));
// app.use("/messages/:id", require('./routes/messageRoute/messages'));
// User feedback routes
app.use("/feedback", require('./routes/feedback/addCourse'));
app.use("/feedback", require('./routes/feedback/updateExperience'));
app.use("/feedback", require('./routes/feedback/getFeedback'));
// connection request routes
app.use("/sendRequest", require('./routes/connection/sendRequest'));
app.use("/acceptRequest", require('./routes/connection/acceptRequest'));


app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
})


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});