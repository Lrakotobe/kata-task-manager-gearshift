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

test('Display empty list at initialization', (t) => {

    const manager = new TaskManager();
    t.equal(manager.console.printedElements[0], "No task yet");
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

test('Normal usage', (t) => {

    const console = new ConsoleInteractorTest(['+ task 1', '+ task 2', '+ task 3', 'x 2', 'x 3', 'o 2', 'q']);
    const manager = new TaskManager(console);
    manager.mainLoop();

    const expectedOutputs = [
        '1 [ ] task 1', 
        '1 [ ] task 1',
        '2 [ ] task 2', 
        '1 [ ] task 1',
        '2 [ ] task 2', 
        '3 [ ] task 3',
        '1 [ ] task 1', 
        '2 [X] task 2',
        '3 [ ] task 3', 
        '1 [ ] task 1',
        '2 [X] task 2', 
        '3 [X] task 3',
        '1 [ ] task 1', 
        '2 [ ] task 2',
        '3 [X] task 3', 
        'Bye!'
    ];
    
    let isCorrect = true;
    manager.console.printedElements.forEach((printedElement, index) => {

        if (printedElement === expectedOutputs[index]) return;

        isCorrect = false;
    })

    t.ok(isCorrect);
    t.end();
})