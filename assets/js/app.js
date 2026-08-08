// Week 6 – To-Do App Starter
// Requirements: CRUD + localStorage persistence

const STORAGE_KEY = "todos";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const board = document.querySelector(".board");
const emptyState = document.getElementById("empty-state");
const emptyMessage = document.getElementById("empty-message");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll("[data-filter]");
const taskCount = document.getElementById("task-count");
const todayLabel = document.getElementById("today-label");

/** @type {{id: string, text: string, completed: boolean, createdAt: number}[]} */
let todos = loadTodos();
let currentFilter = "all";
let editingId = null;

// ---------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function checkmarkSVG() {
  return `<svg viewBox="0 0 14 14"><path d="M2 7l3.5 3.5L12 3"/></svg>`;
}

function setTitle() {
  const remaining = todos.filter((t) => !t.completed).length;
  document.title = remaining > 0
    ? `(${remaining}) Tasks — a running list`
    : "Tasks — a running list";
}

function setDateLabel() {
  if (!todayLabel) return;
  const fmt = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  todayLabel.textContent = fmt.format(new Date());
}

// ---------------------------------------------------------------------------
// Render (Read)
// ---------------------------------------------------------------------------
function getFiltered() {
  return todos.filter((t) => {
    if (currentFilter === "active") return !t.completed;
    if (currentFilter === "completed") return t.completed;
    return true;
  });
}

function render() {
  const filtered = getFiltered();

  list.innerHTML = "";

  if (filtered.length === 0) {
    board.classList.add("is-empty");
    emptyState.hidden = false;
    emptyMessage.textContent =
      todos.length === 0
        ? "Nothing here yet. Add your first task above."
        : currentFilter === "completed"
        ? "No completed tasks yet."
        : "All clear — nothing active.";
  } else {
    board.classList.remove("is-empty");
    emptyState.hidden = true;
  }

  filtered.forEach((todo) => {
    list.appendChild(buildItem(todo));
  });

  updateCounter();
}

function buildItem(todo) {
  const li = document.createElement("li");
  li.className = `item ${todo.completed ? "completed" : ""}`;
  li.dataset.id = todo.id;

  const isEditing = editingId === todo.id;

  li.innerHTML = `
    <button class="check" data-toggle type="button"
      aria-label="${todo.completed ? "Mark as not done" : "Mark as done"}"
      aria-pressed="${todo.completed}">
      ${checkmarkSVG()}
    </button>
    ${
      isEditing
        ? `<input class="edit-input" data-edit-input type="text" value="${escapeAttr(todo.text)}" maxlength="140" />`
        : `<span class="text" data-text tabindex="0" role="button" aria-label="Edit task">${escapeHTML(todo.text)}</span>`
    }
    <div class="actions">
      ${
        isEditing
          ? ""
          : `<button class="icon-btn" data-edit type="button" aria-label="Edit task">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
               </svg>
             </button>`
      }
      <button class="icon-btn" data-delete type="button" aria-label="Delete task">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        </svg>
      </button>
    </div>
  `;

  if (isEditing) {
    const editInput = li.querySelector("[data-edit-input]");
    requestAnimationFrame(() => {
      editInput.focus();
      editInput.select();
    });
  }

  return li;
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

function updateCounter() {
  const remaining = todos.filter((t) => !t.completed).length;
  if (todos.length === 0) {
    taskCount.textContent = "0 tasks left";
  } else if (remaining === 0) {
    taskCount.textContent = "All done";
  } else {
    taskCount.textContent = `${remaining} task${remaining === 1 ? "" : "s"} left`;
  }
  setTitle();
}

// ---------------------------------------------------------------------------
// Create
// ---------------------------------------------------------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: uid(),
    text,
    completed: false,
    createdAt: Date.now(),
  });

  saveTodos();
  render();
  input.value = "";
  input.focus();
});

// ---------------------------------------------------------------------------
// Update (toggle complete) / Update (edit text) / Delete
// ---------------------------------------------------------------------------
function startEdit(id) {
  editingId = id;
  render();
}

function commitEdit(id, newText) {
  const trimmed = newText.trim();
  if (trimmed) {
    todos = todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t));
  }
  editingId = null;
  saveTodos();
  render();
}

function cancelEdit() {
  editingId = null;
  render();
}

function removeWithAnimation(li, id) {
  li.classList.add("leaving");
  const cleanup = () => {
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    render();
  };
  li.addEventListener("animationend", cleanup, { once: true });
  // Fallback in case animation doesn't fire (e.g. reduced motion)
  setTimeout(cleanup, 220);
}

list.addEventListener("click", (e) => {
  const li = e.target.closest(".item");
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.closest("[data-toggle]")) {
    todos = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTodos();
    render();
    return;
  }

  if (e.target.closest("[data-edit]") || e.target.closest("[data-text]")) {
    startEdit(id);
    return;
  }

  if (e.target.closest("[data-delete]")) {
    removeWithAnimation(li, id);
    return;
  }
});

// Support keyboard activation of the text label (role="button")
list.addEventListener("keydown", (e) => {
  if (e.target.matches("[data-text]") && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    const li = e.target.closest(".item");
    startEdit(li.dataset.id);
  }
});

// Edit input: save on Enter/blur, cancel on Escape
list.addEventListener("keydown", (e) => {
  if (!e.target.matches("[data-edit-input]")) return;
  const li = e.target.closest(".item");
  if (e.key === "Enter") {
    e.preventDefault();
    commitEdit(li.dataset.id, e.target.value);
  } else if (e.key === "Escape") {
    e.preventDefault();
    cancelEdit();
  }
});

list.addEventListener(
  "focusout",
  (e) => {
    if (!e.target.matches("[data-edit-input]")) return;
    const li = e.target.closest(".item");
    // Only commit if we're still meant to be editing this item
    // (avoids double-fire when Enter already triggered a re-render)
    if (editingId === li.dataset.id) {
      commitEdit(li.dataset.id, e.target.value);
    }
  },
  true
);

// ---------------------------------------------------------------------------
// Filters
// ---------------------------------------------------------------------------
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    currentFilter = btn.dataset.filter;
    editingId = null;
    render();
  });
});

// ---------------------------------------------------------------------------
// Clear completed
// ---------------------------------------------------------------------------
clearCompletedBtn.addEventListener("click", () => {
  const hasCompleted = todos.some((t) => t.completed);
  if (!hasCompleted) return;
  todos = todos.filter((t) => !t.completed);
  saveTodos();
  render();
});

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
setDateLabel();
render();l");
updateCounter(); 
