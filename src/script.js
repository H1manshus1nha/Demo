document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');
    const clearAllBtn = document.getElementById('clear-all-btn');

    // --- Helper Functions ---

    /**
     * Saves the current state of the todo list to localStorage.
     */
    const saveTodos = () => {
        const todos = [];
        document.querySelectorAll('.todo-item').forEach(item => {
            todos.push({
                text: item.querySelector('.todo-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    /**
     * Creates a new todo list item element.
     * @param {string} text - The text content of the todo.
     * @param {boolean} completed - Whether the todo is completed.
     * @returns {HTMLLIElement} The created list item element.
     */
    const createTodoElement = (text, completed = false) => {
        const listItem = document.createElement('li');
        listItem.classList.add('todo-item');
        if (completed) {
            listItem.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo-checkbox');
        checkbox.checked = completed;
        checkbox.addEventListener('change', () => {
            listItem.classList.toggle('completed');
            saveTodos(); // Save state after toggling completion
        });

        const todoText = document.createElement('span');
        todoText.classList.add('todo-text');
        todoText.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            listItem.remove();
            saveTodos(); // Save state after deleting
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(todoText);
        listItem.appendChild(deleteBtn);

        return listItem;
    };

    /**
     * Loads todos from localStorage and renders them.
     */
    const loadTodos = () => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            const todos = JSON.parse(storedTodos);
            todos.forEach(todo => {
                const newTodo = createTodoElement(todo.text, todo.completed);
                todoList.appendChild(newTodo);
            });
        }
    };

    /**
     * Adds a new todo item to the list.
     */
    const addTodo = () => {
        const todoText = todoInput.value.trim();

        if (todoText === '') {
            alert('Please enter a task!');
            return;
        }

        const newTodo = createTodoElement(todoText);
        todoList.appendChild(newTodo);
        todoInput.value = ''; // Clear input field
        saveTodos(); // Save state after adding
    };

    // --- Event Listeners ---

    // Add todo on button click
    addTodoBtn.addEventListener('click', addTodo);

    // Add todo on Enter key press in input field
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    // Clear all tasks
    clearAllBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all tasks?')) {
            todoList.innerHTML = ''; // Remove all child elements
            saveTodos(); // Clear from localStorage
        }
    });

    // --- Initial Load ---
    loadTodos(); // Load tasks when the page loads
});