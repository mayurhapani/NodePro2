const express = require("express");
const app = express();
port = 8001;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("./node_modules/bootstrap/dist/"));

let isUpdate = false;
let data = {};
let editTaskId;
let todoList = [
  {
    task: "complete project",
  },
  {
    task: "complete node.js videos",
  },
  {
    task: "complete portfolio",
  },
  {
    task: "complete resume",
  },
];

app.get("/", (req, res) => {
  res.render("index", { todoList, isUpdate, data });
});
app.post("/addNewTodo", (req, res) => {
  if (isUpdate) {
    let task = req.body.todo;
    todoList.map((todo, id) => {
      if (id == editTaskId) todo.task = task;
    });
    isUpdate = false;
    return res.redirect("/");   
  }
  let task = req.body.todo;
  todoList.push({ task });
  return res.redirect("/");
});
app.get("/deleteTodo", (req, res) => {
  const taskId = req.query.todoId;
  let newList = todoList.filter((todo, id) => id != taskId);
  todoList = newList;
  return res.redirect("/");
});
app.get("/editTodo", (req, res) => {
  editTaskId = req.query.todoId;
  let newList = todoList.filter((todo, id) => id == editTaskId);
  isUpdate = true;
  data = newList[0];
  return res.redirect("/");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log("server started on http://localhost:" + port);
});
