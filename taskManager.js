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

    mainLoop() {

        const input = this.console.readInput();
        const command = input.substring(0, 1);
        const description = input.substring(2, input.length);

        if (command === '+')
            this.addTask(description);

        this.console.printList(this.listTasks);
    }
}

module.exports = TaskManager;