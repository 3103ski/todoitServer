var express = require('express');
var todoListsRouter = express.Router();

todoListsRouter
	.route('/')
	.get((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end('Will return all todo lists');
	})
	.post((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end('Will create new todo list');
	})
	.delete((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end('Is deleting all todo lists');
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end('Not supported at this endpoint');
	});

todoListsRouter
	.route('/:todoListID')
	.get((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(`will return todo list with ID ${req.params.todoListID}`);
	})
	.delete((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(`Will delete todo list with ID ${req.params.todoListID}`);
	})
	.put((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(`Will update todo list with ID ${req.params.todoListID}`);
	})
	.post((req, res) => {
		res.statusCode = 403;
		res.end('you cannot POST to this endpoint');
	});

module.exports = todoListsRouter;
