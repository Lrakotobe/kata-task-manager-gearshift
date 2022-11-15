const TaskManager = require('../taskManager');
const test = require('tape');

class ConsoleInteractorTest {

    constructor(inputs) {
        this.listInputs = inputs;
        this.printedElements = [];
    }

    readInput () {
        return this.listInputs.shift()
    }

    printList(list) {
        list.forEach((task) => {
            this.printedElements.push(`${task.id} [${task.state ? 'X': ' '}] ${task.description}`)       
        });
    }

    bye() {
        this.printedElements.push("Bye!")
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

    t.equal(manager.console.printedElements[0], '1 [ ] description');
    t.end();
})

test('Parse "-" input', (t) => {

    const console = new ConsoleInteractorTest(['+ description', '- 1']);
    const manager = new TaskManager(console);
    manager.mainLoop();

    t.equal(manager.listTasks.length, 0);
    t.end();
});

test('Parse "x" input', (t) => {

    const console = new ConsoleInteractorTest(['+ description', 'x 1']);
    const manager = new TaskManager(console);
    manager.mainLoop();

    t.ok(manager.listTasks[0].state);
    t.end();
});

test('Trying x display', (t) => {

    const console = new ConsoleInteractorTest(['+ description', 'x 1']);
    const manager = new TaskManager(console);
    manager.mainLoop();

    t.equal(manager.console.printedElements[1], '1 [X] description');
    t.end();
});

test('Parse "o" input', (t) => {

    const console = new ConsoleInteractorTest(['+ description', 'x 1', 'o 1']);
    const manager = new TaskManager(console);
    manager.mainLoop();

    t.notok(manager.listTasks[0].state);
    t.end();
});

test('Trying o display', (t) => {

    const console = new ConsoleInteractorTest(['+ description', 'x 1', 'o 1']);
    const manager = new TaskManager(console);
    manager.mainLoop();

    t.equal(manager.console.printedElements[2], '1 [ ] description');
    t.end();
});

test('q command', (t) => {

    const console = new ConsoleInteractorTest(['+ description', 'x 1', 'o 1', 'q']);
    const manager = new TaskManager(console);
    manager.mainLoop();

    t.equal(manager.console.printedElements[manager.console.printedElements.length - 1], 'Bye!');
    t.end();
});