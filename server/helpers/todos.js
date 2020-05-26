const database = require("../models");

exports.getToDos = function (req, res) {
  database.ToDo.find()
    .then(function (foundToDos) {
      res.json(foundToDos)
    })
    .catch(function (err) {
      res.send(err);
    })
}

exports.createToDo = function (req, res) {
  let newToDo = { name: req.body.name };
  database.ToDo.create(newToDo)
    .then(function (createdToDo) {
      res.status(201).json(createdToDo);
    })
    .catch(function (err) {
      res.send(err);
    })
}

exports.getToDo = function (req, res) {
  database.ToDo.findById(req.params.todoId)
    .then(function (foundToDo) {
      res.json(foundToDo);
    })
    .catch(function (err) {
      res.send(err);
    })
}

exports.updateToDo = function (req, res) {
  database.ToDo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
    .then(function (updatedToDo) {
      res.json(updatedToDo);
    })
    .catch(function (err) {
      res.send(err);
    })
}

exports.deleteToDo = function (req, res) {
  database.ToDo.findByIdAndRemove(req.params.todoId)
    .then(function () {
      res.json("Selected ToDo was deleted.");
    })
    .catch(function (err) {
      res.send(err);
    })
}

module.exports = exports;