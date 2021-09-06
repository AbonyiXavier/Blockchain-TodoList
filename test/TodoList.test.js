const TodoList = artifacts.require("./TodoList.sol");

contract("TodoList", (accounts) => {
  let todoList, taskCount, result, task;

  before(async () => {
    todoList = await TodoList.deployed(); // copy of the deploment
    taskCount = await todoList.taskCount();
  });

  it("deploys successfully", async () => {
    const address = await todoList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("list task", async () => {
    // SUCCESS
    
    const todo = await todoList.tasks(taskCount);
    assert.equal(
      todo.id.toNumber(),
      taskCount.toNumber(),
      "id is correct"
    );
    assert.equal(todo.content, "Learning how to build a todolist using blockchain", "content is correct");
    assert.equal(todo.completed, false, "completed is correct");
    assert.equal(taskCount.toNumber(), 1);
  });
  
  it('create task', async () => {
    // SUCCESS
    result = await todoList.createTask('Coffe time')
    taskCount = await todoList.taskCount();

    assert.equal(taskCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), taskCount.toNumber(), 'id is correct')
    assert.equal(event.content, 'Coffe time', 'content is correct')
    assert.equal(event.completed, false, 'Completed is correct')
    // console.log(result.logs);

})
  it('toggles task completion', async () => {
    // SUCCESS
    result = await todoList.toggleCompleted(1)
    task = await todoList.tasks(1);

    assert.equal(task.completed, true)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
    // console.log(result.logs);

})
});
