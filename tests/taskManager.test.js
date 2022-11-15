const TaskManager = require('../taskManager');
const test = require('tape');


test('Got empty list at initialization', (t) => {

    const manager = new TaskManager();
    t.equal(manager.listTasks.length, 0);
    t.end();
})

test('Parse "+" input', (t) => {

    
    t.end();

})

test('Parse inputs', (t) => {

    const inputs = ['+', '-', 'x', 'o', 'q'];


    t.end();
});
