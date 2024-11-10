import { projectsList, Project } from "./projects";
import { displayTodo } from "./display";
window.createTodo = createTodo;
window.toggleTodoComplete = toggleTodoComplete; // Makes function usable in browser console. wtf
window.deleteTodo = deleteTodo;

export let todoList = [];

window.todoList = todoList;

class Todo{
    constructor(name, description, dueDate, priority, projectName = 'Unfiltered'){
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
    todoList.push(newTodo);
    console.log(todoList);
    displayTodo();
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

    const index = todoList.findIndex(obj => obj.name === todoName);
    if(index !== -1){
        todoList.splice(index, 1);
    }

    console.log(projectsList);
    console.log(todoList);
    
    displayTodo();
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
    console.log(selectedTodo);
}



