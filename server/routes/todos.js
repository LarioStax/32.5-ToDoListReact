const express = require("express");
const router = express.Router();
const database = require("../models"); //gets all schemas && setups db connection

const helpers = require("../helpers/todos");

router.route("/")
  .get(helpers.getToDos)
  .post(helpers.createToDo)

router.route("/:todoId")
  .get(helpers.getToDo)
  .put(helpers.updateToDo)
  .delete(helpers.deleteToDo);

module.exports = router;