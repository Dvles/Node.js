const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to root URL of Server");
});


app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});

let todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build a to-do app', completed: false }
];

// GET /todos - Get all todos
app.get('/todos', (req, res) => {
    res.status(200).json(todos); // Return all to-do items
});

// GET /todos/:id - Get a single to-do by ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(todo => todo.id === parseInt(req.params.id));
    if (todo) {
        res.status(200).json(todo); 
    } else {
        res.status(404).send('To-do not found'); 
    }
});

// POST /todos - Create a new to-do
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1, // Auto-increment the ID
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo); // Add the new to-do to the list
    res.status(201).json(newTodo); // Respond with the newly created to-do
});

// PUT /todos/:id - Update an existing to-do
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(todo => todo.id === parseInt(req.params.id));
    if (todo) {
        todo.task = req.body.task || todo.task; // Update task if provided
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed; // Update completion status if provided
        res.status(200).json(todo); // Respond with the updated to-do item
    } else {
        res.status(404).send('To-do not found'); // Handle not found
    }
});

// DELETE /todos/:id - Delete a to-do by ID
app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(todo => todo.id === parseInt(req.params.id));
    if (index !== -1) {
        todos.splice(index, 1); // Remove the to-do from the array
        res.status(200).send('To-do deleted'); // Respond with success
    } else {
        res.status(404).send('To-do not found'); // Handle not found
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
