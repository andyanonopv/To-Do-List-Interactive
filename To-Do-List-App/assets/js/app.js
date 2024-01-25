document.addEventListener('DOMContentLoaded', function () {
    const taskContainer = document.querySelector('.task-container');
    const taskTodayContainer = document.querySelector('#todayTasksContainer');

    console.log(taskTodayContainer);

    const taskCount = document.getElementById('taskCount');

    let taskCounter = parseInt(localStorage.getItem('taskCounter')) || 0;
    let taskData = JSON.parse(localStorage.getItem('taskData')) || [];
    console.log(taskData);
    
    
    function getRandomColor() {
            const colorsArr = [
                '#e57373', '#81c784', '#64b5f6', '#ffb74d', '#aed581',
                '#90a4ae', '#ff8a65', '#4db6ac', '#ba68c8', '#fff176',
            ];
            const randomIndex = Math.floor(Math.random() * colorsArr.length);
            return colorsArr[randomIndex];
        }
        
    function updateTaskCount() {
            if (taskCount) {
                taskCount.textContent = taskCounter;
                localStorage.setItem('taskCounter', taskCounter.toString());
            } else {
                const updatedTaskCount = document.getElementById('taskCount');
                if (updatedTaskCount) {
                    updatedTaskCount.textContent = taskCounter;
                    localStorage.setItem('taskCounter', taskCounter.toString());
                }
            }
            localStorage.setItem('taskData', JSON.stringify(taskData));
        }

    

    function appendTaskToContainer(task) {                     
            const newTaskItem = document.createElement('div');
            newTaskItem.classList.add('item-task');
            newTaskItem.style.backgroundColor = getRandomColor();
            newTaskItem.innerHTML = `
                <h1 class="title">${task.title}</h1>
                <div class="text">
                <p>${task.text}</p>
                </div>
                `;
            taskContainer.appendChild(newTaskItem);
        }
    
        function loadTodayTask() {
            const today = new Date();
            let formattedToday = today.getFullYear() + '-' + 
                ('0' + (today.getMonth() + 1)).slice(-2) + '-' + 
                ('0' + today.getDate()).slice(-2);
        
            console.log('Formatted Today:', formattedToday); // Debugging
            console.log('Loaded taskData:', taskData); // Debugging
        
            taskData.forEach(function(task) {
                console.log('Processing Task:', task); // Debugging
                if (task.date === formattedToday) {
                    const newTaskItemToday = document.createElement('div');
                    newTaskItemToday.classList.add('item-task');
                    newTaskItemToday.style.backgroundColor = getRandomColor();
                    newTaskItemToday.innerHTML = `
                        <h1 class="title">${task.title}</h1>
                        <div class="text">
                        <p>${task.text}</p>
                        </div>`;
                    taskTodayContainer.appendChild(newTaskItemToday);
                    console.log('Task added to today container'); // Debugging
                }
            });
        
            console.log('taskTodayContainer after appending:', taskTodayContainer); // Debugging
        }
        
        


    function createAddTaskModal() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.1); z-index: 2;';
    
        // Create container
        const container = document.createElement('div');
        container.style.cssText = 'z-index: 3; padding: 25px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; background-color: #fff; width: 50vw; height: 50vh;';
    
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.cssText = 'width: 150px; margin: 0 auto;';
        closeBtn.addEventListener('click', function () {
            document.body.removeChild(overlay);
            document.body.removeChild(container);
        });
    
        // Create input elements
        const titleElem = document.createElement('input');
        titleElem.type = 'text';
        titleElem.placeholder = 'Task Title';
        titleElem.style.cssText = 'margin-bottom: 15px; margin-top: 15px;';
    
        const textElem = document.createElement('textarea');
        textElem.placeholder = 'Task Details';
        textElem.style.cssText = 'margin-bottom: 15px; height: 100px;';
    
        const dateLabel = document.createElement('label');
        dateLabel.for = '#date';
        dateLabel.textContent = 'Optional';
    
        const dateElem = document.createElement('input');
        dateElem.type = 'date';
        dateElem.id = 'date';
    
        // Create submit button
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit';
        submitBtn.style.cssText = 'width: 150px; margin: 0 auto;';
        submitBtn.addEventListener('click', function () {
            const titleValue = titleElem.value;
            const textValue = textElem.value;
            const dateValue = dateElem.value;
    
            const task = {
                title: titleValue,
                text: textValue,
                date: dateValue,
            };
    
            taskData.push(task);
    
            taskCounter++;
            updateTaskCount();
    
            appendTaskToContainer(task);
    
            document.body.removeChild(overlay);
            document.body.removeChild(container);
        });
    
        // Append elements to the container
        container.appendChild(closeBtn);
        container.appendChild(titleElem);
        container.appendChild(textElem);
        container.appendChild(dateLabel);
        container.appendChild(dateElem);
        container.appendChild(submitBtn);
    
        // Append the container to the body
        document.body.appendChild(overlay);
        document.body.appendChild(container);
    }
     
    function loadTask() {
        for (let i = 0; i < taskData.length; i++) {
            appendTaskToContainer(taskData[i]);
        }
    }
         const addTaskBtn = document.querySelector('.task');
         addTaskBtn.addEventListener('click', createAddTaskModal);
         loadTask();
         if (taskTodayContainer) {
            loadTodayTask(); 
        }
         updateTaskCount();
        
    


    

    
    
    //For now (To Be Updated)
    // window.addEventListener('beforeunload', function () {
    //     // Clear local storage when the page is refreshed or closed
    //     localStorage.clear();
    // });
});
