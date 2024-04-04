// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const projectFormEl = $('.btn-custom')
const projectNameInputEl = $('#task-title-input')
const projectTypeInputEl = $('#text-description')
const projectDateInputEl = $('#datepicker')



$('#datepicker').datepicker()


// Todo: create a function to generate a unique task id
function generateTaskId() {



}

// Todo: create a function to create a task card
function createTaskCard(task) {


}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {


}

// Todo: create a function to handle adding a new task
function loadProjectFromLocalStorage() {
    let taskList = JSON.parse(localStorage.getItem('projects')) || [];
    return taskList;
}

function saveProjectToLocalStorage(tasks) {
    localStorage.setItem('projects', JSON.stringify(tasks))
}
function handleAddTask(event){
    event.preventDefault();

    const title =  projectNameInputEl.val()
    const description = projectTypeInputEl.val()
    const dueDate = projectDateInputEl.val()
    
    projectNameInputEl.val('')
    projectTypeInputEl.val('')
    projectDateInputEl.val('')

    let taskList = loadProjectFromLocalStorage()

    const newProject = {
        name: title,
        type: description,
        dateDue: dueDate,
    }    
    
    taskList.push(newProject);

    saveProjectToLocalStorage(taskList);


    
}
projectFormEl.on('click', handleAddTask)

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){


}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {


}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {


});
