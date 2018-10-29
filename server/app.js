const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
let mock = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

// add your code here

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', (req, res, next) => {
    if (res.status(200)) {
        next(); 
    } else {
        res.end();
    }
});

// Condition one: GET 200 status and respond with JSON object 'ok'
app.get('/', (req, res, next) => {
    res.status(200).json('ok').end();
});

// Condition two: GET array and respond with it
app.get('/api/TodoItems', (req, res, next) => {
    res.json(mock).end();

});

// Condition 3: GET params and respond with correspodning array index
app.get('/api/TodoItems/:number', (req, res, next) => {
    let i = req.params.number;
    res.status(200).json(mock[i-1]);

});

//Condition 4: POST item to mock dataset, and overwrite existing if exists.
app.post('/api/TodoItems/', (req, res, next) => {
    let newItem = {
    todoItemId: req.body.todoItemId, 
    name: req.body.name,
    priority:  req.body.priority,
    completed: req.body.completed
};

    mock.forEach((item) => {
        if (item.todoItemId === req.body.todoItemId) {
            item = newItem;
            res.status(201).send(req.body).end();
        } else {
            res.end();
        }
    });

}); 

//Condition 5: Delete item from mock dataset.
app.delete('/api/TodoItems/:number', (req, res, next) => {
    let i = req.params.number;
    let deletedItem = mock[i];
    mock.splice(i, 1);
    res.status(200).json(deletedItem).end();    
});

module.exports = app;