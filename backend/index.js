const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDatabase = require('./config/database')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: ['https://todo-app-blue-nu-33.vercel.app', 'http://localhost:5000'], // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))

connectDatabase();


const user = require('./routes/userRoute')
const task = require('./routes/taskRoute')

app.use('/api/v1', user);
app.use('/api/v1', task);




const path = require("path");
app.use(express.static(path.join(__dirname, '..', 'task-manager', 'build')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'task-manager', 'build', 'index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    });
})



const PORT = 5000;
app.listen(PORT, console.log(`listening at http://localhost:${PORT}`))