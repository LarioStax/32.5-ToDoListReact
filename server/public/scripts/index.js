$(document).ready(function () {
  $.getJSON("/api/todos")
    .then(visualiseToDos)
    .catch(function(err) {
      console.log(err);
    });

  $("#toDoInput").keypress(function(event) {
    if(event.which == 13) {
      createToDo();
    }
  })

  //we connect the listener to something that is there when page loads
  //and then specify the click only to spans inside that connected object
  $(".list").on("click", "span", function(e) {
    e.stopPropagation();
    removeToDo($(this).parent())
  })

  $(".list").on("click", "li", function() {
    updateToDo($(this));
  })
})

function updateToDo(todo) {
  let updateUrl = `/api/todos/${todo.data("id")}`;
  let isDone = !todo.data("completed");
  let updateData = {completed: isDone}
  $.ajax({
    method: "PUT",
    url: updateUrl,
    data: updateData 
  })
  .then(function(updatedToDo) {
    todo.toggleClass("done");
    todo.data("completed", isDone);
  })
  .catch(function(err) {
    console.log(err);
  })
}

function removeToDo(todo) {
  let deleteUrl = `/api/todos/${todo.data("id")}`;
  $.ajax({
    method: "DELETE",
    url: deleteUrl
  })
  .then(function(confirmationMessage) {
    console.log(confirmationMessage);
    todo.remove();
  })
  .catch(function(err) {
    console.log(err);
  })
};

function visualiseToDos(todos) {
  //add ToDos to page here
  todos.forEach( todo => {
    addToDo(todo);
  })
}

function addToDo(todo) {
  let newToDo = $(`<li class="task">${todo.name}<span>X</span></li>`)
  newToDo.data("id", todo._id); //this is stored in jquery's memory!
  newToDo.data("completed", todo.completed); //this is stored in jquery's memory!
  if (todo.completed) {
    newToDo.addClass("done");
  }
  $("#toDoList").append(newToDo);
}

function createToDo() {
  let userInput = $("#toDoInput").val();
  //send post request to create new todo
  $.post("/api/todos", {name: userInput})
  .then(function(createdToDo) {
    $("#toDoInput").val("");
    addToDo(createdToDo);
  })
  .catch(function(err) {
    console.log(err);
  })
}