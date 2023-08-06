const express = require('express');
const {
    createTask,
    getTasks,
    getTask,
    updateTask
} = require('../controllers/taskController');


const router = express.Router();

router.route('/task').post(createTask);
router.route('/task').get(getTasks);
router.route('/task/:id').get(getTask);
router.route('/task/:id').put(updateTask);

module.exports = router;