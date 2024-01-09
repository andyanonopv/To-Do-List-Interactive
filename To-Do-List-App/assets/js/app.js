document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const taskContainer = document.querySelector('.task-container');
    //const addTaskContainer = document.querySelector('.add-task');
    const addTaskBtn = document.querySelector('.task');

    let taskIndex = 1;

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


        const titleValue = titleElem.value;
        const textValue = textElem.value;
        // Create a submit button
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit';

        submitBtn.addEventListener('click', function(){
            const newTaskItem = document.createElement('div');
            newTaskItem.classList.add('item-task');

            const titleValue = titleElem.value;
            const textValue = textElem.value;

            newTaskItem.innerHTML = `
                <h1 class="title">${titleValue}</h1>
                <div class="text">
                    <p>${textValue}</p>
                </div>
            `;
            
            // Append the new task item to the taskContainer
            taskContainer.insertBefore(newTaskItem, taskContainer.querySelector('.add-task').nextSibling);

            for(let i = 0; i < taskContainer.children.length; i++) {
                const item = taskContainer.children[i];
                item.style.gridColumn = `${(i % 2) + 1}`;
                item.style.gridRowStart = `${Math.floor(i / 2) + 1}`;
            }

            // Remove the overlay and container when submit button is clicked
            body.removeChild(overlay);
            body.removeChild(container);
        });

        // Append elements to the container
        container.appendChild(closeBtn);
        container.appendChild(titleElem);
        container.appendChild(textElem);
        container.appendChild(submitBtn);


        // Append the container to the taskContainer
        body.appendChild(overlay);
        body.appendChild(container)
    });
});
