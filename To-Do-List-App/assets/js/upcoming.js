document.addEventListener('DOMContentLoaded', function () {
    const textContainer = document.getElementById('upcomingTasksContainer'); // Change the selector accordingly

    // Retrieve stored tasks from local storage
    let taskData = JSON.parse(localStorage.getItem('taskData')) || [];

    function appendUpcomingTaskToContainer(task) {
        const newTaskItem = document.createElement('div');
        newTaskItem.classList.add('item-task');
        newTaskItem.style.backgroundColor = getRandomColor();
        newTaskItem.innerHTML = `
            <h1 class="title">${task.title}</h1>
            <div class="text">
                <p>${task.text}</p>
            </div>
        `;
        textContainer.appendChild(newTaskItem);
    }

    // Loop through the stored tasks and append them to the upcoming tasks container
    for (let i = 0; i < taskData.length; i++) {
        appendUpcomingTaskToContainer(taskData[i]);
    }
});
