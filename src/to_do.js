import './scss/to_do.scss';
import { ToDo, ToDoList } from './ToDoList'

const app = document.getElementById('app');
const task = document.createElement('input');
const list = document.createElement('ul');
const todo = new ToDoList('myList');

task.id = 'task';
task.classList.add('task');
task.spellcheck = true;
task.placeholder = 'Tareas por hacer ...';

list.id = 'list';
list.classList.add('list');

app.classList.add('toDo');
app.appendChild(task);
app.appendChild(list);

todo.render();