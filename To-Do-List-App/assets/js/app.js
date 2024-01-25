document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const taskContainer = document.querySelector('.task-container');
    const taskTodayContainer = document.querySelector('#todayTasksContainer');

    const addTaskBtn = document.querySelector('.task');
    const taskCount = document.getElementById('taskCount');

    let taskCounter = parseInt(localStorage.getItem('taskCounter')) || 0;
    let taskData = JSON.parse(localStorage.getItem('taskData')) || [];
    
    
    
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
            const today = new Date();
            let formattedToday = today.getFullYear() + '-' + 
                                 ('0' + (today.getMonth() + 1)).slice(-2) + '-' + 
                                 ('0' + today.getDate()).slice(-2);
        
            if (task.date !== formattedToday) { // Only append if it's not today's task
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
        }
        
        function loadAndDisplayTodaysTasks(task) {
            const today = new Date();
            let formattedToday = today.getFullYear() + '-' + 
                                   ('0' + (today.getMonth() + 1)).slice(-2) + '-' + 
                                   ('0' + today.getDate()).slice(-2);
        
            if (task.date === formattedToday) {
                    const newTaskItem = document.createElement('div');
                    newTaskItem.classList.add('item-task');
                    newTaskItem.style.backgroundColor = getRandomColor();
                    newTaskItem.innerHTML = `
                        <h1 class="title">${task.title}</h1>
                        <div class="text">
                            <p>${task.text}</p>
                        </div>
                    `;
                    console.log(newTaskItem);
                    taskTodayContainer.appendChild(newTaskItem);
            }
        }
        
    
    for (let i = 0; i < taskData.length; i++) {
            appendTaskToContainer(taskData[i]);
            loadAndDisplayTodaysTasks(taskData[i]);
    }

    addTaskBtn.addEventListener('click', function () {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'; // Semi-transparent black
            overlay.style.zIndex = '2';
    
            // Create a container div
            const container = document.createElement('div');
            container.style.zIndex = '3';
            container.style.padding = '25px';
            container.style.position = 'fixed'; // Use fixed position for centering
            container.style.top = '50%';
            container.style.left = '50%';
            container.style.transform = 'translate(-50%, -50%)'; // Center the div
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.backgroundColor = '#fff';
            container.style.width = '50vw';
            container.style.height = '50vh';
    
            // Create a close button
            const closeBtn = document.createElement('button');
            closeBtn.textContent = 'Close';
            closeBtn.style.width = '150px';
            closeBtn.style.margin = '0 auto';
            closeBtn.addEventListener('click', function () {
                // Remove the container when close button is clicked
                body.removeChild(overlay);
                body.removeChild(container);
            });
    
            // Create input elements
            const titleElem = document.createElement('input');
            titleElem.type = 'text';
            titleElem.placeholder = 'Task Title';
            titleElem.style.marginBottom = '15px';
            titleElem.style.marginTop = '15px';
            const textElem = document.createElement('textarea');
            textElem.placeholder = 'Task Details';
            textElem.style.marginBottom = '15px';
            textElem.style.height = '100px';
            const dateLabel = document.createElement('label');
            dateLabel.for = '#date';
            dateLabel.textContent = 'Optional';
            const dateElem = document.createElement('input');
            dateElem.type = 'date';
            dateElem.id = 'date';
    
            const titleValue = titleElem.value;
            const textValue = textElem.value;
            // Create a submit button
            const submitBtn = document.createElement('button');
            submitBtn.textContent = 'Submit';
            submitBtn.style.width = '150px';
            submitBtn.style.margin = '0 auto';
    
            submitBtn.addEventListener('click', function(){
               

                const newTaskItem = document.createElement('div');
                newTaskItem.classList.add('item-task'); 
                newTaskItem.style.backgroundColor = getRandomColor();
    
                const titleValue = titleElem.value;
                const textValue = textElem.value;
                const dateValue = dateElem.value    

                
                const task = {
                        title: titleValue,
                        text: textValue,
                        date: dateValue,
                    };
                
                taskData.push(task);
                
                
                
                taskCounter++;
                updateTaskCount();

                appendTaskToContainer(task);
                loadAndDisplayTodaysTasks(task);
                

                body.removeChild(overlay);
                body.removeChild(container);
            });
            
            
            // Append elements to the container
            container.appendChild(closeBtn);
            container.appendChild(titleElem);
            container.appendChild(textElem);
            container.appendChild(dateLabel);
            container.appendChild(dateElem);
            container.appendChild(submitBtn);
    
    
            // Append the container to the taskContainer
            body.appendChild(overlay);
            body.appendChild(container)
        });
        
        
         updateTaskCount();
        
    


    

    
    
    //For now (To Be Updated)
    // window.addEventListener('beforeunload', function () {
    //     // Clear local storage when the page is refreshed or closed
    //     localStorage.clear();
    // });
});
