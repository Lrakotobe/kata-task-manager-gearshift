const TaskManager = require('../taskManager');
const test = require('tape');

class ConsoleInteractorTest {

    constructor(inputs) {
        this.listInputs = inputs;
        this.printedTasks = [];
    }

    readInput () {
        return this.listInputs.shift()
    }

    printList(list) {
        list.forEach((task) => {
            this.printedTasks.push(`${task.id} [${task.state ? 'X': ' '}] ${task.description}`)       
        });
    }
}

test('Got empty list at initialization', (t) => {

    const manager = new TaskManager();
    t.equal(manager.listTasks.length, 0);
    t.end();
})

test('Parse "+" input', (t) => {

    const console = new ConsoleInteractorTest(['+ description']);
    const manager = new TaskManager(console);
    manager.mainLoop();

    t.equal(manager.console.printedTasks[0], '1 [ ] description');
    t.end();
})

test('Parse "-" input', (t) => {

    const console = new ConsoleInteractorTest(['+ description', '- 1']);
    const manager = new TaskManager(console);
    manager.mainLoop();

    t.equal(manager.console.printedTasks.length, 0);
    t.end();
});
