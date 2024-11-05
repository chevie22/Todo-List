import { projectsList, Project } from "./projects";
window.toggleTodoComplete = toggleTodoComplete; // Makes function usable in browser console. wtf
window.deleteTodo = deleteTodo;

class Todo{
    constructor(name, description, dueDate, priority, projectName = "default"){
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

function createTodo(name, description, dueDate, priority, projectName){
    const newTodo = new Todo(name, description, dueDate, priority, projectName);
    const project = projectsList.find(project => project.name === newTodo.projectName);
    project.addTodo(newTodo);
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

    console.log(projectsList);
}

export function toggleTodoComplete(todoName){
    let selectedTodo = getTodoObject(todoName);
    selectedTodo.isDone = !selectedTodo.isDone;
    console.log(selectedTodo);
}

createTodo("Clean Room", "Sweep the floor so it's not dirty xD", "8:00 PM", "normal");
createTodo("Finish Code", "Finish ze code so Ms. Hope will not get angy", "10:00 PM", "normal");
createTodo("Elloe", "Test", "7:00 PM", "normal", "Work Stuff");






