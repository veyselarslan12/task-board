// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const projectFormEl = $(".btn-custom");
const projectNameInputEl = $("#task-title-input");
const projectTypeInputEl = $("#text-description");
const projectDateInputEl = $("#datepicker");
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
  event.preventDefault();

  const title = projectNameInputEl.val();
  const description = projectTypeInputEl.val();
  const dueDate = projectDateInputEl.val();

  let taskList = loadProjectFromLocalStorage();

  const newProject = {
    id: generateTaskId(),
    name: title,
    type: description,
    dateDue: dueDate,
    status: 'todo'
  };

  taskList.push(newProject);

  saveProjectToLocalStorage(taskList);

  renderTaskList()


  projectNameInputEl.val("");
  projectTypeInputEl.val("");
  projectDateInputEl.val("");
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const cardId = $(event.target).closest('.card').data('id');
    console.log(cardId)
    const projects = loadProjectFromLocalStorage()
    const projectsToKeep = []
    console.log(event)
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
    const targetListId = event.target.id.replace('-cards', '')
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

    $("#datepicker").datepicker();

    projectFormEl.on("click", handleAddTask);

    renderTaskList();

    $('.swim-lane').droppable({
        drop:  handleDrop
    })
    
    $('.swim-lanes').on('click', '.delete-card', handleDeleteTask)

});

