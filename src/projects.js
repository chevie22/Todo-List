const todoAdder = {
    addTodo(todo) {
      this.todos.unshift(todo);
      localStorage.localStorageProjectsList = JSON.stringify(projectsList);
    }
  }
  
  export class Project {
    constructor(name) {
      this.name = name;
      this.todos = [];
    }
  }
  
  Object.assign(Project.prototype, todoAdder);
  
  const getProjectsList = () => {
    let retrievedProjectsList = JSON.parse(localStorage.getItem('localStorageProjectsList'));
    
    if(!retrievedProjectsList) {
      console.log('localStorageProjectsList not found');
      return;
    }
  
    retrievedProjectsList = retrievedProjectsList.map((projectData) => {
      let project = new Project(projectData.name);
      project.todos = projectData.todos; // Re-assign todos
      return project;
    });
  
    return retrievedProjectsList;
  }
  
  export let projectsList = [];
  
  (function initializeProjectsList() {
    if(getProjectsList()) {
      projectsList = getProjectsList();
    }
    
    Object.assign(projectsList, todoAdder);
  })();
  
  export const createProject = (name) => {
    if( (projectsList.findIndex(project => project.name === name)) > -1) {
      console.log('Project already exists');
      return;
    }
  
    if(!name) {
      console.log('Project name cannot be blank');
      return;
    }
    
    let newProject = new Project(name);
    projectsList.push(newProject);
    localStorage.localStorageProjectsList = JSON.stringify(projectsList);
  };
  
  export const deleteProject = (name) => {
    if( (projectsList.findIndex(project => project.name === name)) === -1 ) {
      console.log('Project not found');
      return;
    }
  
    if(name === 'Default Project') {
      console.log('Cannot delete default project');
      return;
    }
  
    const projectIndex = projectsList.findIndex(project => project.name === name);
    projectsList.splice(projectIndex, 1);
    localStorage.localStorageProjectsList = JSON.stringify(projectsList);
  };
  
  if( (projectsList.findIndex(project => project.name === 'Default Project')) === -1 ) {
    createProject('Default Project');
    localStorage.localStorageProjectsList = JSON.stringify(projectsList);
  }
  
  console.log(projectsList);