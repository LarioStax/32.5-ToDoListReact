const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");

const toDoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"))

app.use("/api/todos", toDoRoutes);

app.get("/", function(req, res) {
    res.sendFile("index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Server listening on port ${port}!`)
});