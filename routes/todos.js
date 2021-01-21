var express = require('express');
var todosRouter = express.Router();
const Todo = require('../models/todo');

todosRouter
	.route('/')
	.get((req, res, next) => {
		Todo.find()
			.then((todos) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(todos);
			})
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		Todo.create(req.body)
			.then((todo) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(todo);
			})
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		Todo.deleteMany()
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end('Not supported at this endpoint');
	});

todosRouter
	.route('/collection/:listID')
	.get((req, res, next) => {
		Todo.find({ todoListID: req.params.listID })
			.then((todos) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(todos);
			})
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		Todo.deleteMany({ todoListID: req.params.listID })
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	})
	.post((req, res) => {
		res.statusCode = 403;
		res.end('you cannot POST to this endpoint');
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end(`Unsupported method for this endpoint`);
	});

todosRouter
	.route('/:todoID')
	.get((req, res, next) => {
		Todo.findById();
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(`will return todo with ID ${req.params.todoID}`);
	})
	.delete((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(`Will delete todo with ID ${req.params.todoID}`);
	})
	.put((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(`Will update todo with ID ${req.params.todoID}`);
	})
	.post((req, res) => {
		res.statusCode = 403;
		res.end('you cannot POST to this endpoint');
	});

module.exports = todosRouter;
