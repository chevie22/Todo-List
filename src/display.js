import { todoList } from "./todo";
import checkSVG from "./check-svgrepo-com.svg";

export const displayTodo = () =>{
    document.body.innerHTML = "";

    todoList.forEach((todo, index) => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("container", "todo");

        const todoHeaderContainer = document.createElement("div");
        todoHeaderContainer.classList.add("container", "todoHeader");
    
        const todoName = document.createElement("div");
        todoName.classList.add("todoName");
        todoName.innerHTML = `${todoList[index].name}`;

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
        todoDescription.innerHTML = `${todoList[index].description}`;
    
        const todoDate = document.createElement("div");
        todoDate.classList.add("todoDate");
        todoDate.innerHTML = `${todoList[index].dueDate}`;

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
    
        todoHeaderContainer.appendChild(todoName);
        checkBoxContainer.appendChild(checkBoxButton);
        todoHeaderContainer.appendChild(checkBoxContainer);

        newDiv.appendChild(todoHeaderContainer);

        newDiv.appendChild(todoDescription);
        newDiv.appendChild(todoDate);

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        newDiv.appendChild(buttonContainer);
    
        document.body.appendChild(newDiv);
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
  

