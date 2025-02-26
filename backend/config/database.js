const mongoose = require('mongoose');
// const MONGO_URI = 'mongodb://127.0.0.1:27017/todo';
const MONGO_URI = "mongodb+srv://suleman:suleman@todo.raprf.mongodb.net/?retryWrites=true&w=majority"
const connectDatabase = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        })
        .catch((error) => {
            console.error("Mongoose Connection Error:", error);
        });
};

module.exports = connectDatabase;