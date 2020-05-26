const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to the database!");
})

mongoose.Promise = Promise; //use promises instead of callbacks! - looks cleaner


module.exports.ToDo = require("./todo.js");