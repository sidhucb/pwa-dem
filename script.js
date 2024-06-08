const todoList = document.getElementById('todo-list');
const addTodoForm = document.getElementById('add-todo');
const newTodoInput = document.getElementById('new-todo');

// Get existing to-do list from local storage (if any)
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to add a new to-do item
const addTodo = (todoText) => {
  const newTodo = {
    text: todoText,
    completed: false,
  };
  todos.push(newTodo);
  saveTodos();
  renderTodos();
};

// Function to render the to-do list items
const renderTodos = () => {
  todoList.innerHTML = '';
  todos.forEach((todo) => {
    const todoItem = document.createElement('li');
    todoItem.textContent = todo.text;
    todoItem.classList.add(todo.completed ? 'completed' : '');
    todoItem.addEventListener('click', () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });
    todoList.appendChild(todoItem);
  });
};

// Function to save to-do list to local storage
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Render initial to-do list
renderTodos();

// Add event listener to form submission
addTodoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTodoText = newTodoInput.value.trim();
  if (newTodoText.length) {
    addTodo(newTodoText);
    newTodoInput.value = '';
  }
});
