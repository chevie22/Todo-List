export let projectsList = [];
window.projectsList = projectsList;

const todoAdder = {
    addTodo(todo){
        this.todos.push(todo);
    }
} 

export class Project{
    constructor(name){
        this.name = name;
        this.todos = [];
    }
}

Object.assign(Project.prototype, todoAdder);

function createProject(name){
    let newProject = new Project(name);
    projectsList.push(newProject);
}

createProject("default");
console.log(projectsList);