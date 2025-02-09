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

        if (!list.length) {
            this.printedElements.push(['No task yet']);
            return; 
        } 

        const listToPrint = [];
        list.forEach((task) => {
            listToPrint.push(`${task.id} [${task.state ? 'X': ' '}] ${task.description}`)       
        });
        this.printedElements.push(listToPrint);
    }

    bye() {
        this.printedElements.push(["Bye!"])
    }
}

test('Got empty list at initialization', (t) => {

    const manager = new TaskManager();
    t.equal(manager.listTasks.length, 0);
    t.end();
})

test('Display empty list at initialization', (t) => {

    const console = new ConsoleInteractorTest([]);
    const manager = new TaskManager(console);
    manager.mainLoop();
    t.equal(manager.console.printedElements[0][0], "No task yet");
    t.end();
})

test('Parse "+" input', (t) => {

    const console = new ConsoleInteractorTest(['+ description']);
    const manager = new TaskManager(console);
    manager.mainLoop();

    t.equal(manager.console.printedElements[1][0], '1 [ ] description');
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

    t.equal(manager.console.printedElements[2][0], '1 [X] description');
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

    t.equal(manager.console.printedElements[3][0], '1 [ ] description');
    t.end();
});

test('q command', (t) => {

    const console = new ConsoleInteractorTest(['+ description', 'x 1', 'o 1', 'q']);
    const manager = new TaskManager(console);
    manager.mainLoop();

    t.equal(manager.console.printedElements[manager.console.printedElements.length - 1][0], 'Bye!');
    t.end();
});

test('Normal use case', (t) => {

    const console = new ConsoleInteractorTest(['+ task 1', '+ task 2', '+ task 3', 'x 2', 'x 3', 'o 2', 'q']);
    const manager = new TaskManager(console);
    manager.mainLoop();

    const expectedOutputs = [
        [ 'No task yet' ], // Debut
        [ '1 [ ] task 1' ], // + task 1
        [ '1 [ ] task 1', '2 [ ] task 2' ], // + task 2
        [ '1 [ ] task 1', '2 [ ] task 2', '3 [ ] task 3' ], // + task 3
        [ '1 [ ] task 1', '2 [X] task 2', '3 [ ] task 3' ], // x 2
        [ '1 [ ] task 1', '2 [X] task 2', '3 [X] task 3' ], // x 3
        [ '1 [ ] task 1', '2 [ ] task 2', '3 [X] task 3' ], // o 2
        ['Bye!'] // q
    ];
    
    let isCorrect = true;
    manager.console.printedElements.forEach((listTasks, indexArrays) => {

        listTasks.forEach((task, indexTask) => {
            
            if (task === expectedOutputs[indexArrays][indexTask]) return;

            isCorrect = false;
        })
    })

    t.ok(isCorrect);
    t.end();
})