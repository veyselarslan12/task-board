// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const projectFormEl = $(".btn-custom"); //  Project form element
const projectNameInputEl = $("#task-title-input"); // Project name input element
const projectTypeInputEl = $("#text-description"); // Project type input element
const projectDateInputEl = $("#datepicker"); // Project date input element
const swimLanesContainerEl = $('.swim-lanes') 

const todoListEl = $('#todo-cards')
const inProgressListEl = $('#in-progress-cards')
const doneListEl = $('#done-cards')
// console.log(todoListEl, inProgressListEl, doneListEl)


// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Math.random()
    
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    //  Creating the card for each task
    const newCard = $(`
        <div class="card draggable" data-id="${task.id}" data-status="${task.status}"> 
            <div class="card-body">
                <h5 class="card-title">${task.name}</h5>
                <p class="card-text">${task.type}</p>
                <p class="card-text">${task.dateDue}</p>
                <button class="btn btn-danger delete-card">Delete</button>
            </div>
        </div>
    `)
    return newCard

}




// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    //  Clearing out old tasks before rendering new ones
   const savedProjects = loadProjectFromLocalStorage()

   todoListEl.empty()
   inProgressListEl.empty()
   doneListEl.empty()

    for (const task of savedProjects) {
        const cardEl = createTaskCard(task)
        if (task.status === 'todo') {
            todoListEl.append(cardEl)
        } else if (task.status === 'in-progress') {
            inProgressListEl.append(cardEl)
        } else {
            doneListEl.append(cardEl)
        }
    }
    //  Making all cards draggable using jQuery UI's draggable functionality
    $('.draggable').draggable({
        stack: '.swim-lanes'
    })
}

// Todo: create a function to handle adding a new task
function loadProjectFromLocalStorage() {
  let taskList = JSON.parse(localStorage.getItem("projects")) || [];
  return taskList;
}

function saveProjectToLocalStorage(tasks) {
  localStorage.setItem("projects", JSON.stringify(tasks));
}
function handleAddTask(event) {
  event.preventDefault(); //  Prevents page from refreshing when form is submitted

  const title = projectNameInputEl.val();
  const description = projectTypeInputEl.val();
  const dueDate = projectDateInputEl.val();

  let taskList = loadProjectFromLocalStorage();
    //  Checking that user has entered values into the input fields before submitting
  const newProject = {
    id: generateTaskId(),
    name: title,
    type: description,
    dateDue: dueDate,
    status: 'todo'
  };
  // Adding new task object to tasks array stored in local storage
  taskList.push(newProject);

  saveProjectToLocalStorage(taskList);

  renderTaskList()

  //  Clear out any old data from the input fields after submission
  projectNameInputEl.val("");
  projectTypeInputEl.val("");
  projectDateInputEl.val("");
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

    const cardId = $(event.target).closest('.card').data('id'); 
    const projects = loadProjectFromLocalStorage()
    const projectsToKeep = []
    // console.log(event)
    for (const task of projects) {
        if(cardId !== task.id) {
            projectsToKeep.push(task)
        }
    }
    
    saveProjectToLocalStorage(projectsToKeep)

    renderTaskList()

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const targetListId = event.target.id.replace('-cards', '') // Remove '-cards' from id string so we can get the list number
    const card = ui.draggable[0]

    const projectId = $(card).data('id')
    
    const projects = loadProjectFromLocalStorage()

    for(const task of projects) {
        if (task.id === projectId) {
                task.status = targetListId
            }

        }
    saveProjectToLocalStorage(projects)

    renderTaskList()
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Date picker functionality from jquery ui
    $("#datepicker").datepicker();
    
    projectFormEl.on("click", handleAddTask); //  Listen for click events on the add task button

    renderTaskList(); 

    $('.swim-lane').droppable({ // Makes each swim lane droppable
        drop:  handleDrop
    })
    
    $('.swim-lanes').on('click', '.delete-card', handleDeleteTask) // Listen for click events on delete buttons

});

