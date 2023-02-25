const User = require("../model/userModel");
const Item = require("../model/itemModel");
const mongoose = require("../config/db.config");
const handleError = require("../helpers/handleError");

async function getTasks(req, res, next) {
  User.findById(req.user.id, (err, foundTasks) => {
    handleError(
      err,
      next,
      () => res.json(foundTasks.tasks),
      () => res.sendStatus(400)
    );
  });
}

function addTask(req, res, next) {
  if (req.query.task) {
    const item = new Item({
      task: req.query.task,
      date: new Date().toLocaleString(),
      cross: false,
    });
    User.findByIdAndUpdate(req.user.id, { $push: { tasks: item } }, (err) => {
      handleError(
        err,
        next,
        () => res.sendStatus(201),
        () => res.sendStatus(500)
      );
    });
  } else {
    res.sendStatus(400);
  }
}

function deleteTask(req, res, next) {
  if (req.query.taskId) {
    User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { tasks: { _id: mongoose.Types.ObjectId(req.query.taskId) } },
      },
      (err) => {
        handleError(
          err,
          next,
          () => res.sendStatus(201),
          () => res.sendStatus(500)
        );
      }
    );
  } else {
    res.sendStatus(400);
  }
}

function updateTask(req, res, next) {
  if (req.query.taskId && (req.query.cross || req.query.task)) {
    var crossBool;
    req.query.cross === "true"
      ? (crossBool = true)
      : req.query.cross === "false"
      ? (crossBool = false)
      : (crossBool = undefined);
    User.findOneAndUpdate(
      {
        _id: req.user.id,
        "tasks._id": mongoose.Types.ObjectId(req.query.taskId),
      },
      { $set: { "tasks.$.cross": crossBool, "tasks.$.task": req.query.task } },
      (err) => {
        handleError(
          err,
          next,
          () => res.sendStatus(201),
          () => res.sendStatus(500)
        );
      }
    );
  } else {
    res.sendStatus(400);
  }
}

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
};
