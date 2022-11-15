// const Task = require('task');

class ConsoleInteractor {
  
    readInput () {
      return prompt('')
    }
  
    printMessage (message) {
    //   console.log(message)
    }
}

class TaskManager {

    constructor() {
        this.listTasks = [];
    }

    mainLoop() {

    }
}

module.exports = TaskManager;