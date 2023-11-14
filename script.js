document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

let displayCompleted = true;

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = {
            text: taskText,
            completed: false,
        };

        tasks.push(task);

        saveTasks();

        taskInput.value = "";

        renderTasks();
    }
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);

    if (newText !== null) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function clearTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}

function toggleDisplay() {
    displayCompleted = !displayCompleted;
    renderTasks();
}

function deleteCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

function renderTasks() {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";

    const filteredTasks = displayCompleted ? tasks : tasks.filter(task => !task.completed);

    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        const textElement = document.createElement("div");
        textElement.textContent = task.text;

        const buttonsElement = document.createElement("div");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editTask(index));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(index));

        const toggleButton = document.createElement("button");
        toggleButton.textContent = task.completed ? "Not Complete" : "Complete";
        toggleButton.addEventListener("click", () => toggleTask(index));

        buttonsElement.appendChild(editButton);
        buttonsElement.appendChild(deleteButton);
        buttonsElement.appendChild(toggleButton);

        taskElement.appendChild(textElement);
        taskElement.appendChild(buttonsElement);

        taskContainer.appendChild(taskElement);
    });
}

















