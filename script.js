//retrive todo form local storage or initialize an empty array 

let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addBtn = document.querySelector(".btn");
const DeleteBtn = document.querySelector(".deletebtn")

//initialization

addBtn.addEventListener("click", addtask);
todoInput.addEventListener("keydown", Event => {
  if (Event.key === "Enter") {
    addtask();
  }
})
DeleteBtn.addEventListener("click", () => {
  todo = [];
  saveToLocalStorage();
  displayTasks();
})

function addtask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({
      text: newTask,
      disabled: false,
    });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
        <div class="todo-container">
          <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""
      }>
          <p id="todo-${index}" class="${item.disabled ? "disabled" : ""
      }" onclick="editTask(${index})">${item.text}</p>
        </div>
      `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage() ;
  displayTasks();

}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}