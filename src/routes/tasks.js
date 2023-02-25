const {Router} = require('express');
const router = Router();
const {addTask,getTasks, deleteTask, updateTask} = require("../controller/tasks");
const loginRequired = require('../middlewares/auth.middlewares');


router.route('/')
    .get(loginRequired,getTasks)
    .post(loginRequired,addTask)
    .delete(loginRequired,deleteTask)
    .patch(loginRequired,updateTask)


module.exports = router;