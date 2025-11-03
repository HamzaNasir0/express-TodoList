const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty. Please enter a valid task.");
        return;
    }

    const existingTasks = Array.from(taskList.querySelectorAll('.task-content')).map(el => el.textContent.toLowerCase());
    if (existingTasks.includes(taskText.toLowerCase())) {
        alert(`The task "${taskText}" already exists.`);
        taskInput.value = '';
        return;
    }

    const taskItem = createTaskElement(taskText);

    taskList.appendChild(taskItem);

    taskInput.value = '';
}

function createTaskElement(text) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span class="task-content">${text}</span>
        <div class="actions">
            <button class="edit-btn">Edit</button>
            <button class="save-btn">Save</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    li.querySelector('.delete-btn').addEventListener('click', deleteTask);
    li.querySelector('.edit-btn').addEventListener('click', toggleEditMode);
    li.querySelector('.save-btn').addEventListener('click', saveTaskEdit);

    return li;
}

function deleteTask(event) {

    const taskItem = event.target.closest('.task-item');
    if (taskItem) {

        taskList.removeChild(taskItem);
    }
}

function toggleEditMode(event) {
    const taskItem = event.target.closest('.task-item');
    const taskContentSpan = taskItem.querySelector('.task-content');
    const editBtn = taskItem.querySelector('.edit-btn');
    const saveBtn = taskItem.querySelector('.save-btn');

    taskContentSpan.setAttribute('contenteditable', 'true');
    taskContentSpan.classList.add('editing');
    taskContentSpan.focus();

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
}

function saveTaskEdit(event) {
    const taskItem = event.target.closest('.task-item');
    const taskContentSpan = taskItem.querySelector('.task-content');
    const editBtn = taskItem.querySelector('.edit-btn');
    const saveBtn = taskItem.querySelector('.save-btn');

    const newText = taskContentSpan.textContent.trim();

    if (newText === "") {
        alert("Task cannot be saved as empty.");
        return;
    }

    taskContentSpan.textContent = newText;
    taskContentSpan.setAttribute('contenteditable', 'false');
    taskContentSpan.classList.remove('editing');

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
}