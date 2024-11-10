export let projectsList = [];
window.projectsList = projectsList;
window.createProject = createProject;

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

export function createProject(name){
    let newProject = new Project(name);
    projectsList.push(newProject);
}

createProject('Unfiltered');
createProject('Work Stuff');
createProject('Tomfooleries Stuff Aaa');