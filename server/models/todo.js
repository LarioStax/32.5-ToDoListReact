const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "ToDo cannot be blank!"
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const ToDo = mongoose.model("ToDo", toDoSchema);

module.exports = ToDo;