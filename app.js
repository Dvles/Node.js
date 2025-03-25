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

