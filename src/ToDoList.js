import {Task} from './Task';

const ENTER_KEY = 13;

export class ToDoList {
    constructor(key) {
        this.key = key;

        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify([]));
        }

        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    addTask(event){
        if (!event.target.value) {
            alert('No puedes agregar una tarea vacía');
        } else if(event.keyCode === ENTER_KEY) {
            let newTask = new Task(event.target.value);
            let tasks = JSON.parse(localStorage.getItem(this.key));

            tasks.push(newTask);
            localStorage.setItem(this.key, JSON.stringify(tasks));
            event.target.value = null;
            this.renderTask(newTask);
        }
    }

    editTask(event){
        if (event.target.matches('label')) {
            let tasks = JSON.parse(localStorage.getItem(this.key));
            let toEdit = tasks.findIndex(task => task.name === event.target.textContent);
            let label = document.querySelector(`[data-id="${tasks[toEdit].id}"]`);

            const saveTask = event => {
                event.target.textContent = event.target.textContent;
                tasks[toEdit].name = event.target.textContent;
                localStorage.setItem(this.key, JSON.stringify(tasks));
                event.target.blur();
            };

            label.addEventListener('blur', event => saveTask(event));
            label.addEventListener('keyup', event => (event.keyCode === ENTER_KEY) && saveTask(event) );
        }
    }

    removeTask(event){
        if (event.target.matches('a')) {
            let tasks = JSON.parse(localStorage.getItem(this.key));
            let toRemove = tasks.findIndex(task => task.id.toString() === event.target.dataset.id);

            tasks.splice(toRemove, 1);
            localStorage.setItem(this.key, JSON.stringify(tasks));
            event.target.parentElement.remove();
        }
    }

    renderTask(task){
        let templateTask = `
            <li class="list-item ${task.isComplete ? 'complete':''}">
                <input class="list-checkbox" type="checkbox" id="${task.id}" ${task.isComplete ? 'checked':''}>
                <label class="list-label" data-id="${task.id}" contenteditable spellcheck>${task.name}</label>
                <a class="list-removeLink" data-id="${task.id}" href="#">🗑️</a>
            </li>
        `

        list.insertAdjacentHTML('beforeend', templateTask);
    }

    render(){
        let tasks = JSON.parse(localStorage.getItem(this.key));
        let listTasks = list.children;

        tasks.forEach(task => this.renderTask(task));

        Array.from(listTasks).forEach(input => {
                input.querySelector('input[type="checkbox"]').addEventListener('change', event => {
                    let task = tasks.filter(task => task.id == event.target.id);
                    if (event.target.checked) {
                        event.target.parentElement.classList.add('complete');
                        task[0].isComplete = true;
                    } else {
                        event.target.parentElement.classList.remove('complete');
                        task[0].isComplete = false;
                    }

                    localStorage.setItem(this.key, JSON.stringify(tasks));
                })
            });

        task.addEventListener('keyup', this.addTask);
        list.addEventListener('click', this.editTask);
        list.addEventListener('click', this.removeTask);
    }
}
