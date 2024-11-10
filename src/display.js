import { todoList } from "./todo";
import { projectsList } from "./projects";
import checkSVG from "./check-svgrepo-com.svg";

export const displayProject = () => {
  // MAKE PROJECTS!!!
  projectsList.forEach((project, index) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('container', 'project');
    newDiv.id = `${project.name}`

    const projectName = document.createElement('div');
    projectName.classList.add('projectName');

    const noSpaceProjectName = project.name
    .split(' ')
    .join('');

    console.log(noSpaceProjectName);
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
      const newDiv = document.createElement("div");
      newDiv.classList.add("container", "todo");

      const todoHeaderContainer = document.createElement("div");
      todoHeaderContainer.classList.add("container", "todoHeader");
  
      const todoName = document.createElement("div");
      todoName.classList.add("todoName");
      todoName.innerHTML = `${todo.name}`;

      const checkBoxContainer = document.createElement("div");
      checkBoxContainer.classList.add("container");

      const checkBoxButton = document.createElement("div");
      checkBoxButton.classList.add("checkBoxButton");

      checkBoxContainer.addEventListener("click", (e) => {
        if(e.target.closest('.checkBoxButton')) {
          toggleCheck(e.target.closest('.checkBoxButton'));
        }
      });
  
      const todoDescription = document.createElement("div");
      todoDescription.classList.add("todoDescription");
      todoDescription.innerHTML = `${todo.description}`;

      const todoDate = document.createElement("div");
      todoDate.classList.add("todoDate");
      todoDate.innerHTML = `${todo.dueDate}`;

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("container", "button");

      const editButton = document.createElement("button");
      editButton.classList.add("button", "editTodo");
      editButton.innerHTML = "Edit";
      editButton.addEventListener("click", (e) =>{
          alert("U pressed an edit button lolz.... XDDDDDDD");
      });

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("button", "deleteTodo");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", (e) =>{
          alert("U pressed a delete button XD >_<");
      });
  
      checkBoxContainer.appendChild(checkBoxButton);
      todoHeaderContainer.appendChild(checkBoxContainer);
      todoHeaderContainer.appendChild(todoName);
      todoHeaderContainer.appendChild(todoDate);


      newDiv.appendChild(todoHeaderContainer);


      newDiv.appendChild(todoDescription);

      // buttonContainer.appendChild(editButton);
      // buttonContainer.appendChild(deleteButton);
      // newDiv.appendChild(buttonContainer);
  
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
  

