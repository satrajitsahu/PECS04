const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".task-list");
let tasks = [];
let nextTaskId = 1;

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const renderTasks = () => {
  taskList.innerHTML = tasks
    .map(
      (task) => `
        <li class="task-item" data-id="${task.id}">
          <input
            class="task-checkbox"
            type="checkbox"
            aria-label="Mark ${escapeHtml(task.text)} as complete"
            ${task.done ? "checked" : ""}
          />
          <span class="${task.done ? "task-done" : ""}">${escapeHtml(task.text)}</span>
          <button class="delete-button" type="button" aria-label="Delete ${escapeHtml(task.text)}">X</button>
        </li>
      `
    )
    .join("");
};

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (!taskText) {
    return;
  }

  tasks.push({ id: nextTaskId++, text: taskText, done: false });
  renderTasks();
  taskInput.value = "";
});

taskList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-button");
  if (!deleteButton) {
    return;
  }

  const taskItem = deleteButton.closest(".task-item");
  const taskId = Number(taskItem.dataset.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
});

taskList.addEventListener("change", (event) => {
  if (!event.target.matches(".task-checkbox")) {
    return;
  }

  const taskItem = event.target.closest(".task-item");
  const task = tasks.find((item) => item.id === Number(taskItem.dataset.id));
  task.done = event.target.checked;
  renderTasks();
});