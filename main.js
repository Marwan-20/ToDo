let taskInput = document.querySelector("input");
let ul = document.querySelector(".tasks");
let addButton = document.querySelector(".add");
let deleteButton = document.querySelector(".delete");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function loadTasks() {
  ul.innerHTML = `<h2>task for today</h2>`;
  tasks.forEach((taskObj, index) => {
    ul.innerHTML += `
      <li data-index="${index}">
        <input type="checkbox" class="task-checkbox">
        ${taskObj.tasks}
      </li>
    `;
  });
}

loadTasks();


addButton.addEventListener("click", () => {
  if (taskInput.value !== "") {
    let newTask = { tasks: taskInput.value };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
  }
});


deleteButton.addEventListener("click", () => {
  let listItems = document.querySelectorAll("li");

  listItems.forEach((li, index) => {
    let checkbox = li.querySelector("input[type='checkbox']");
    if (checkbox && checkbox.checked) {
       li.style.textDecoration = "line-through"; 
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
});



fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
.then(response => response.json())
.then(data =>{
  console.log(data)
  let todo = data[0].title
  console.log(todo)

  data.forEach((dataObj, index) => {
     ul.innerHTML += `
      <li data-index="${index}">
        <input type="checkbox" class="task-checkbox">
        ${dataObj.title}
      </li>`
  })

})
