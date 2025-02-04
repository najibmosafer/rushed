document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add("completed");
            }

            li.addEventListener("click", () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "حذف";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", (event) => {
                event.stopPropagation(); 
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
    });

    renderTasks();
});
