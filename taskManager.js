// const Task = require('task');

const Task = require("./task");

class ConsoleInteractor {
  
    readInput () {
      return prompt('')
    }
  
    printList (list) {
        list.forEach((task) => {
            console.log(`${task.id} [${task.state ? 'X': ' '}] ${task.description}`);
        });
    }

    bye() {
        console.log("Bye!");
    }
}

class TaskManager {

    constructor(consoleInteractor) {
        this.listTasks = [];
        this.console = consoleInteractor;
        this.counter = 0;
    }

    addTask(description) {
        this.counter++;
        this.listTasks.push(new Task(this.counter, description));
    }

    removeTask(id) {
        this.listTasks.splice(id - 1, 1);
    }

    do(id) {
        this.listTasks[id - 1].state = true;
    }

    undo(id) {
        this.listTasks[id - 1].state = false;
    }

    mainLoop() {

        while (true) {

            const input = this.console.readInput();
            if (!input) break;

            const command = input.substring(0, 1);
            const argument = input.substring(2, input.length);
    
            if (command === '+')
                this.addTask(argument)
            else if (command === '-') 
                this.removeTask(argument)
            else if (command === 'x')
                this.do(argument)
            else if (command === 'o')
                this.undo(argument)
            else if (command === 'q') {
                this.console.bye();
                break;
            }
                
            this.console.printList(this.listTasks);
        }
    }
}

module.exports = TaskManager;