const {TaskManager, ConsoleInteractor} = require('./taskManager');

const main = () => {
  
    const manager = new TaskManager(new ConsoleInteractor());
    manager.mainLoop();
}

main()
