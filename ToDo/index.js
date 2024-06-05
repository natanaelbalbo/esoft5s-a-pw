const taskKey = '@tasks';

function addTask(event) {
  event.preventDefault();
  const taskId = new Date().getTime();
  const taskList = document.querySelector('#taskList');

  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const li = document.createElement('li');
  li.id = taskId;
  li.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${taskDescription}</p>
    <button class="editButton" onclick="openEditDialog(${taskId})" title="Editar tarefa">✏️</button>
    <button class="deleteButton" onclick="deleteTask(${taskId})" title="Excluir tarefa">❌</button>
  `;

  taskList.appendChild(li);

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription });
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  form.reset();
}

window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = tasks.map(task => `
    <li id="${task.id}">
      <h2>${task.title}</h2>
      <p>${task.description}</p>
      <button class="editButton" onclick="openEditDialog(${task.id})" title="Editar tarefa">✏️</button>
      <button class="deleteButton" onclick="deleteTask(${task.id})" title="Excluir tarefa">❌</button>
    </li>
  `).join('');
});

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const task = tasks.find(t => t.id === taskId);

  if (task) {
    document.querySelector('#editTaskId').value = taskId;
    document.querySelector('#editTitle').value = task.title;
    document.querySelector('#editDescription').value = task.description;
    document.querySelector('#editDialog').showModal();
  }
}

function closeEditDialog() {
  document.querySelector('#editDialog').close();
}

function editTask(event) {
  event.preventDefault();

  const taskId = parseInt(document.querySelector('#editTaskId').value, 10);
  const taskTitle = document.querySelector('#editTitle').value;
  const taskDescription = document.querySelector('#editDescription').value;

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].title = taskTitle;
    tasks[taskIndex].description = taskDescription;
    localStorage.setItem(taskKey, JSON.stringify(tasks));

    const li = document.getElementById(taskId);
    li.querySelector('h2').textContent = taskTitle;
    li.querySelector('p').textContent = taskDescription;

    closeEditDialog();
  }
}

function deleteTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem(taskKey, JSON.stringify(updatedTasks));

  const li = document.getElementById(taskId);
  if (li) {
    li.parentNode.removeChild(li);
  }
}