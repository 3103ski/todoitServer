var express = require('express');
var todosRouter = express.Router();

todosRouter
	.route('/')
	.get((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end('Will return all todos');
	})
	.post((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end('Will create new todo');
	})
	.delete((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end('Is deleting all todos');
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end('Not supported at this endpoint');
	});

todosRouter
	.route('/collection/:listID')
	.get((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(`will return all todos for list with ID: ${req.params.todoID}`);
	})
	.delete((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(`Will delete all todos associated with todo list ID: ${req.params.todoID}`);
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
