import "./styles.css";
import { displayTodo, displayProject } from "./display";
import { createTodo, deleteTodo } from "./todo";
import {} from "./projects";

import checkSVG from "./check-svgrepo-com.svg";

displayProject();

createTodo("Clean Room", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi officiis debitis veritatis. Accusantium distinctio sapiente maxime ratione saepe! Reprehenderit recusandae fugit doloribus odit assumenda sed inventore exercitationem similique molestiae maiores?", "11/25/2024", "normal");
createTodo("Feed D0g", "Feed smartypants so she not die", "11/11/2024", "normal");

createTodo("Elloe", "Test", "11/10/2024", "normal", "Work Stuff");

createTodo('Eat some cocks', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi officiis debitis veritatis. Accusantium distinctio sapiente maxime ratione saepe! Reprehenderit recusandae fugit doloribus odit assumenda sed inventore exercitationem similique molestiae maiores?', '11/15/2024', 'normal', 'Tomfooleries Stuff Aaa')