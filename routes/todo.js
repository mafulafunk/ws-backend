const express = require('express');
const router = express.Router();
const Todo = require('../model/Todo');
const auth = require('../auth');

router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.json(todos);
  } catch (err) {
    console.log(err);
    return res.status(500).send('server errror');
  }
});

router.route('/:id').get(function(req, res) {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
    res.json(todo);
    console.log('looking for : ' + id);
  });
});

router.route('/').post(function(req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      res.status(200).json({ todo: 'todo added successfully' });
    })
    .catch(err => {
      res.status(400).send('adding new todo failed');
    });
});

router.route('/update/:id').post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) res.status(404).send('data is not found');
    else todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

    todo
      .save()
      .then(todo => {
        res.json('Todo updated!');
      })
      .catch(err => {
        res.status(400).send('Update not possible');
      });
  });
});

module.exports = router;
