// Define UI variable
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

// create load all event listeners function
function loadEventListeners(){

    // DOM load event to show all persisted data to the localstorage
    document.addEventListener('DOMContentLoaded', getTasks)

    // submit task event function
    form.addEventListener('submit', addTask);

    // remove task events
    taskList.addEventListener('click', removeTask);

    // clear all task
    clearBtn.addEventListener('click', clearTasks)

    // filter task events
    filter.addEventListener('keyup', filterTask);
}

// function for getting tasks from localStorage
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) =>{

        const li = document.createElement('li');
    
        li.className = 'collection-item';

        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';


        li.appendChild(link)
        taskList.appendChild(li);
    });
}


// Add task function
function addTask(e){

    if (taskInput.value === '') {
        alert('Add a task');
        exit;
    }

    // create li element to append the created list tasks
    const li = document.createElement('li');
    //add class to the li
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));


    //create a new link element
    const link = document.createElement('a');
    // add class to the link
    link.className = 'delete-item secondary-content';
    // add icon to link
    link.innerHTML = '<i class="fa fa-remove"></i>';


    // Append link tag to list tag
    li.appendChild(link)
    console.log(li)
    // Append the li to the ul as a child
    taskList.appendChild(li);


    // Store content to localstorage
    storeTaskInLocalStorage(taskInput.value);

    // clear the task input
    taskInput.value = '';
    e.preventDefault();




}

// function for saving task to the local storage
function storeTaskInLocalStorage(task) { 
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
 }


// remove task function 
function removeTask(e){
    // target the delete icon on the list item
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you Sure')){
            e.target.parentElement.parentElement.remove();

            // Also remove task from localstorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove task from localstorage fuunction
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// clear all task function 
function clearTasks(){
    // taskList.innerHTML = '';

    // faster way to clear  task
    if(confirm('Click ok to clear all task')){
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        // clear all task from local storage
        clearTaskFromLocalStorage();
    }
}

// remove all task from the socal storage
function clearTaskFromLocalStorage(){
    localStorage.clear();
}



// ***** this is important for me to know how to filter content with javascript
function filterTask(e){
 const text = e.target.value.toLowerCase();
 document.querySelectorAll('.collection-item').forEach((task) =>{
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
    }else{
        task.style.display = 'none';
    }
 });
 

}