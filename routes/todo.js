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

router.get('/:id', auth, async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id);
    if (todo) {
      return res.json(todo);
    } else {
      return res.status(404).json({ msg: `id ${id} not found` });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('server errror');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const todo = await new Todo(req.body).save();
    if (todo) {
      const location =
        req.protocol + '://' + req.get('host') + req.originalUrl + todo.id;
      res
        .status(201)
        .location(location)
        .json({ todo: 'todo added successfully' });
    }
  } catch (err) {
    res.status(400).send('adding new todo failed');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send('data is not found');
    } else {
      const {
        todo_description,
        todo_responsible,
        todo_priority,
        todo_completed
      } = req.body;

      if (todo_description) todo.todo_description = todo_description;
      if (todo_responsible) todo.todo_responsible = todo_responsible;
      if (todo_priority) todo.todo_priority = todo_priority;
      if (todo_completed) todo.todo_completed = todo_completed;

      await todo.save();

      const location = req.protocol + '://' + req.get('host') + req.originalUrl;
      return res
        .status(201)
        .location(location)
        .json({ todo: 'todo updated successfully' });
    }
  } catch (err) {
    return res.status(400).send('Update not possible');
  }
});

module.exports = router;
