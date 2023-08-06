const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDatabase = require('./config/database')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

connectDatabase();


const user = require('./routes/userRoute')
const task = require('./routes/taskRoute')

app.use('/api/v1', user);
app.use('/api/v1', task);


// Serve the static files from the React app
const path = require('path')
app.use(express.static(path.join(__dirname, '..', 'task-manager', 'build')));

console.log(path.join(__dirname, '..', 'task-manager', 'build'));
// Handle any other requests by serving the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'task-manager', 'build', 'index.html'));
});

const PORT = 5000;
app.listen(PORT, console.log(`listening at http://localhost:${PORT}`))