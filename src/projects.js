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

export let projectsList = [];
createProject("default");

window.projectsList = projectsList;


function createProject(name){
    let newProject = new Project(name);
    projectsList.push(newProject);
}


createProject("Work Stuff");
console.log(projectsList);