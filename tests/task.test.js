const test = require("tape");
const Task = require("../task");

test('Task id equal 1', (t) => {
    const task = new Task(1, 'Faire kata');

    t.equal(task.id, 1);
    t.end();
});

test('Task description equals to "Faire kata"', (t) => {
    const task = new Task(1, 'Faire kata');

    t.equal(task.description, 'Faire kata');
    t.end();
})
