import { todoList, deleteTodo } from "./todo";
import { projectsList } from "./projects";
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

const createCheckBoxButton = () => {
  const checkBoxContainer = createElement('div', ['container']);

  const checkBoxButton = createElement('div', ['checkBoxButton']);

  checkBoxContainer.addEventListener("click", (e) => {
    if(e.target.closest('.checkBoxButton')) {
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
  });

  const trashImage = createElement('img', ['trashSVG']);
  trashImage.src = trashSVG;

  trashImageDiv.appendChild(trashImage);

  return trashImageDiv;
}

export const displayProject = () => {
  projectsList.forEach((project, index) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('container', 'project');
    newDiv.id = `${project.name}`

    const projectName = document.createElement('div');
    projectName.classList.add('projectName');

    const noSpaceProjectName = project.name
    .split(' ')
    .join('');

    projectName.id = noSpaceProjectName;
    projectName.innerHTML = `${project.name}`;

    newDiv.appendChild(projectName);

    const todosContainer = document.createElement('div');
    todosContainer.classList.add('todos-container');
    todosContainer.id = `${noSpaceProjectName}-container`;

    newDiv.appendChild(todosContainer);
    document.body.appendChild(newDiv);
  });
}

export const displayTodo = () => {
  projectsList.forEach((project) => { 
    const noSpaceProjectName = project.name
    .split(' ')
    .join('');
    
    const projectContainer = document.querySelector(`#${noSpaceProjectName}-container`);
    projectContainer.innerHTML = '';

    project.todos.forEach((todo) => {

      const newDiv = createElement('div', ['container', 'todo']);

      const todoHeaderContainer = createElement('div', ['container', 'todoHeader']);

      const todoName = createElement('div', ['todoName'], `${todo.name}`);

      const checkBox = createCheckBoxButton();

      const todoDescription = createElement('div', ['todoDescription'], `${todo.description}`);

      const todoDate = createElement('div', ['todoDate'], `${todo.dueDate}`);

      const trashImageDiv = createTrashButton();

      todoHeaderContainer.appendChild(checkBox);
      todoHeaderContainer.appendChild(todoName);
      todoHeaderContainer.appendChild(todoDate);
      todoHeaderContainer.appendChild(trashImageDiv);

      newDiv.appendChild(todoHeaderContainer);

      newDiv.appendChild(todoDescription);

      const projectContainer = document.querySelector(`#${noSpaceProjectName}-container`);
      projectContainer.appendChild(newDiv);
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
















  

