import { projectsList } from "./projects";

export class Todo{
  constructor(name, description, dueDate, priority, projectName = 'Default Project'){
      this.name = name;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.projectName = projectName;
      this.isDone = false;
  }

  get getTodoInfo(){
      return {
          name: this.name,
          description: this.description,
          dueDate: this.dueDate,
          priority: this.priority,
          projectName: this.projectName,
          isDone: this.isDone,
      }
  }
}

export function createTodo(name, description, dueDate, priority, projectName){
  const newTodo = new Todo(name, description, dueDate, priority, projectName);
  const project = projectsList.find(project => project.name === newTodo.projectName);
  project.addTodo(newTodo);
}

export function deleteTodo(todoName){
  let todoIndex = -1;

  iterateProjects((project) =>{
      todoIndex = project.todos.findIndex(todo => todo.name === todoName);

      if(todoIndex >= 0){
          console.log(`Found in Project: ${project.name} Index: ${todoIndex}`);
          project.todos.splice(todoIndex, 1);
          return;
      }
  });

  localStorage.localStorageProjectsList = JSON.stringify(projectsList);
}

function iterateProjects(onProject){
    projectsList.forEach((project) =>{
        onProject(project);
    });
}

function getTodoObject(todoName){
  let selectedTodo;
  iterateProjects((project) =>{
      if(selectedTodo === undefined){
          selectedTodo = project.todos.find((todo) => todo.name === todoName);
      }
  });

  return selectedTodo;
}

export function toggleTodoComplete(todoName){
  let selectedTodo = getTodoObject(todoName);
  selectedTodo.isDone = !selectedTodo.isDone;
  localStorage.localStorageProjectsList = JSON.stringify(projectsList);
}
