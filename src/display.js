import { createTodo, deleteTodo, toggleTodoComplete } from "./todo";
import { createProject, deleteProject, projectsList } from "./projects";
import { SVGCode } from "./svg/plusSVG";
import checkSVG from "./svg/check-svgrepo-com.svg";
import trashSVG from "./svg/trash-bin-trash-svgrepo-com.svg"

// takes tag name, array of string as classes, string for id, and string for innerHTML. 
// returns element
const createElement = (tag, classes = [], innerHTML = '', id = '', ) => {
  const element = document.createElement(tag);
  
  if(Array.isArray(classes) && classes.length > 0) {
    element.classList.add(...classes);
  }

  if(id) {
    element.id = id;
  }

  if(innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
}

const addProjectButton = document.querySelector('#addProjectButton');
addProjectButton.addEventListener('click', () => {
  const addProjectName = document.querySelector('#addProjectName').value;

  if( (projectsList.findIndex(project => project.name === addProjectName)) > -1) {
    alert('Project already exists');
  }


  createProject(addProjectName);
  document.querySelector('#addProjectName').value = '';

  displayProjects();
});

const deleteProjectButton = document.querySelector('#deleteProjectButton');
deleteProjectButton.addEventListener('click', () => {
  const deleteProjectName = document.querySelector('#deleteProjectName').value;

  if( (projectsList.findIndex(project => project.name === deleteProjectName)) === -1 ) {
    alert('Project not found');
    document.querySelector('#deleteProjectName').value = '';
    return;
  }
  
  if(deleteProjectName === 'Default Project') {
    alert('Cannot delete default project');
    document.querySelector('#deleteProjectName').value = '';
    return;
  }

  deleteProject(deleteProjectName);
  document.querySelector('#deleteProjectName').value = '';

  displayProjects();
});

const todoAddButton = document.querySelector('#todoAddButton');
todoAddButton.addEventListener('click', () => {
  const todoName = document.querySelector('#todoName').value;
  const todoDescription = document.querySelector('#todoDescription').value;
  const todoDueDate = document.querySelector('#todoDueDate').value;

  const addTodoForm = document.querySelector('.addTodoForm');

  createTodo(todoName, todoDescription, todoDueDate, '', addTodoForm.id);

  const addTodoModal = document.querySelector('#addTodoModal');
  addTodoModal.style.display = 'none';
  
  displayProjects();
});

const createAddButton = () => {
  const addButtonDiv = createElement('div', ['container', 'plusImage']);
  addButtonDiv.innerHTML = SVGCode;

  const addTodoModal = document.querySelector('#addTodoModal');

  addButtonDiv.addEventListener('click', (e) => {
    document.querySelector('#todoName').value = '';
    document.querySelector('#todoDescription').value = '';
    document.querySelector('#todoDueDate').value = '';

    addTodoModal.style.display = 'block';

    const clickedProjectName = e.target.closest('.container.plusImage')
    .previousElementSibling 
    .innerHTML;

    console.log(clickedProjectName);

    const addTodoForm = document.querySelector('.addTodoForm');
    addTodoForm.id = clickedProjectName;
  });

  return addButtonDiv;
}

window.onclick = (e) => {
  const addTodoModal = document.querySelector('#addTodoModal');

  if(e.target == addTodoModal) {
    addTodoModal.style.display = 'none';
  }
}

const createCheckBoxButton = (todoName) => {
  const noSpaceTodoName = todoName
  .split(' ')
  .join('');

  const checkBoxContainer = createElement('div', ['container']);

  const checkBoxButton = createElement('div', ['checkBoxButton'], null, noSpaceTodoName);

  checkBoxContainer.addEventListener("click", (e) => {
    if(e.target.closest('.checkBoxButton')) {
      toggleTodoComplete(e.target.closest('.container').nextElementSibling.innerHTML);
      toggleCheck(e.target.closest('.checkBoxButton'));
    }
    
  });


  checkBoxContainer.appendChild(checkBoxButton);

  return checkBoxContainer;
}


const createTrashButton = () => {
  const trashImageDiv = createElement('div', ['container', 'trashImage']);

  trashImageDiv.addEventListener('click', (e) => {
    const clickedTodoName = e.target.closest('.container.trashImage')
    .previousElementSibling 
    .previousElementSibling 
    .innerHTML; // this is so dumb

    deleteTodo(clickedTodoName);

    displayProjects();
  });

  const trashImage = createElement('img', ['trashSVG']);
  trashImage.src = trashSVG;

  trashImageDiv.appendChild(trashImage);

  return trashImageDiv;
}

const createTodoDisplay = (todo) => {
  const newDiv = createElement('div', ['container', 'todo']);

  const todoHeaderContainer = createElement('div', ['container', 'todoHeader']);

  const todoName = createElement('div', ['todoName'], `${todo.name}`);

  const checkBox = createCheckBoxButton(todo.name);

  const todoDescription = createElement('div', ['todoDescription'], `${todo.description}`);

  const todoDate = createElement('div', ['todoDate'], `${todo.dueDate}`);

  const trashImageDiv = createTrashButton();

  todoHeaderContainer.appendChild(checkBox);
  todoHeaderContainer.appendChild(todoName);
  todoHeaderContainer.appendChild(todoDate);
  todoHeaderContainer.appendChild(trashImageDiv);

  newDiv.appendChild(todoHeaderContainer);

  newDiv.appendChild(todoDescription);

  return newDiv;
}

export const displayProjects = () => {
  const oldProjectsContainer = document.querySelector('.projectsContainer');
  if(oldProjectsContainer !== null) {
    oldProjectsContainer.remove();
  }

  const projectsContainer = createElement('div', ['projectsContainer']);
  document.body.appendChild(projectsContainer);

  projectsList.forEach((project) => {
    const noSpaceProjectName = project.name
    .split(' ')
    .join('');

    const newDiv = createElement('div', ['container', 'project'], null, project.name);

    const headerContainer = createElement('div', ['container', 'header']);

    const projectName = createElement('div', ['projectName'], project.name, '', noSpaceProjectName);

    const addButton = createAddButton();

    headerContainer.appendChild(projectName);
    headerContainer.appendChild(addButton);

    const todosContainer = createElement('div', ['todos-container'], null, `${noSpaceProjectName}-container`);

    newDiv.appendChild(headerContainer);
    newDiv.appendChild(todosContainer);
    // document.body.appendChild(newDiv);
    projectsContainer.appendChild(newDiv);
  });

  displayTodo();
}

export const displayTodo = () => {
  projectsList.forEach((project) => { 
    const noSpaceProjectName = project.name
    .split(' ')
    .join('');
    
    const projectContainer = document.querySelector(`#${noSpaceProjectName}-container`);
    projectContainer.innerHTML = '';

    project.todos.forEach((todo) => {
      const noSpaceTodoName = todo.name
      .split(' ')
      .join('');

      const newDiv = createTodoDisplay(todo);

      const projectContainer = document.querySelector(`#${noSpaceProjectName}-container`);
      projectContainer.appendChild(newDiv);

      if(todo.isDone) {
        const checkBox = document.getElementById(noSpaceTodoName);
        toggleCheck(checkBox);
      }
    });
  });
};

const toggleCheck = (element) => {
  if (element.childElementCount === 0) {
    const checkImage = document.createElement("img");
    checkImage.src = checkSVG;
    checkImage.classList.add("checkedSvg");

    element.appendChild(checkImage);

    // Trigger the left-to-right reveal animation after appending the image
    setTimeout(() => {
      checkImage.classList.add("revealImage"); // Add the class to trigger animation
    }, 10); // Small delay to ensure the image is appended first
  } else {
    element.innerHTML = "";
  }
};