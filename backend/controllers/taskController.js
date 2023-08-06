const Task = require('../models/taskModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');



// Register User
exports.createTask = asyncErrorHandler(async (req, res, next) => {

    console.log('Body: ', req.body);

    const {
        name,
        category,
        status
    } = req.body


    const task = await Task.create({
        name,
        category,
        status

    });

    res.status(200).json({
        success: true,
        task,
        message: 'Task created'
    })
});

// Login User
exports.getTasks = asyncErrorHandler(async (req, res, next) => {

    const tasks = await Task.find();

    // console.log("Tasks: ", tasks);

    res.status(200).json({
        success: true,
        tasks
    })
});


exports.getTask = asyncErrorHandler(async (req, res, next) => {

    const { id } = req.body

    let task;
    if (id) {
        try {
            const task = await Task.findById(id);
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    res.status(200).json({
        success: true,
        task
    });
});

exports.updateTask = asyncErrorHandler(async (req, res, next) => {

    const { status } = req.body
    const { id } = req.params

    console.log("I am here: ", id, '\n', status);

    let output;
    if (id && status) {
        try {
            const task = await Task.findById(id);

            output = await task.updateOne({ status: status })

        } catch (error) {
            console.log('Error: ', error);
        }
    }

    res.status(200).json({
        success: true,
        output
    });
});