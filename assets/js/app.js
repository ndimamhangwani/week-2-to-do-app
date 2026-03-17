// Week 6 – To-Do App Starter
// Requirements: CRUD + localStorage persistence

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll("[data-filter]");
const taskCount = document.getElementById("task-count");

let todos = []; // { id, text, completed }

// TODO: Load todos from localStorage on page load
todos = JSON.parse(localStorage.getItem("todos")) || [];

// TODO: Save todos to localStorage whenever todos changes
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Step 5 - Live task counter (DOM-based like your example)
const updateCounter = () => {
  const total = list.querySelectorAll('li').length;
  const completed = list.querySelectorAll('.completed').length;
  const remaining = total - completed;

  document.title = remaining > 0 
    ? `(${remaining} left) To-Do App` 
    : 'To-Do App - All done!';
};

function render(filter = "all") {
  list.innerHTML = "";

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `item ${todo.completed ? "completed" : ""}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <span class="text">${todo.text}</span>
      <div class="actions">
        <button data-toggle>Done</button>
        <button data-delete>Delete</button>
      </div>
    `;

    list.appendChild(li);
  });

  // keep your existing counter
  const activeCount = todos.filter(t => !t.completed).length;
  taskCount.textContent = activeCount;
}

// Add task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  // TODO: Add todo object with unique id
  const newTodo = {
    id: Date.now().toString(),
    text,
    completed: false
  };

  todos.push(newTodo);

  // TODO: Save + re-render
  saveTodos();
  render("all");
  updateCounter(); 

  input.value = "";
});

// Toggle / Delete (event delegation)
list.addEventListener("click", (e) => {
  const li = e.target.closest(".item");
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.matches("[data-toggle]")) {
    // TODO: Toggle completed for this id
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    // TODO: Save + re-render
    saveTodos();
    render("all");
    updateCounter();
  }

  if (e.target.matches("[data-delete]")) {
    // TODO: Remove todo by id
    todos = todos.filter(todo => todo.id !== id);

    // TODO: Save + re-render
    saveTodos();
    render("all");
    updateCounter(); 
  }
});

// Filters
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
    updateCounter(); 
  });
});

// Clear completed
clearCompletedBtn.addEventListener("click", () => {
  // TODO: Remove completed todos
  todos = todos.filter(todo => !todo.completed);

  // TODO: Save + re-render
  saveTodos();
  render("all");
  updateCounter(); 
});

// Initial render
render("all");
updateCounter(); 