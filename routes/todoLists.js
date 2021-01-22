var express = require('express');
var todoListsRouter = express.Router();
const TodoList = require('../models/todoList');
const Todo = require('../models/todo');
const cors = require('./cors');
const auth = require('../authenticate');

todoListsRouter
	.route('/')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
		TodoList.find()
			.then((lists) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(lists);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
		req.body.user = req.user._id;
		TodoList.create(req.body)
			.then((todoList) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(todoList);
			})
			.catch((err) => next(err));
	})
	.delete(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
		TodoList.deleteMany()
			.then((response) => {
				Todo.deleteMany()
					.then((response) => {
						res.statusCode = 200;
						res.setHeader('Content-Type', 'application/json');
						res.json(response);
					})
					.catch((err) => next(err));
			})
			.catch((err) => next(err));
	})
	.put(cors.corsWithOptions, auth.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end('Not supported at this endpoint');
	});

todoListsRouter
	.route('/:todoListID')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, auth.verifyUser, (req, res, next) => {
		TodoList.findById(req.params.todoListID)
			.then((todoList) => {
				if (todoList.user.equals(req.user._id) || req.user.isAdmin) {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(todoList);
				} else {
					res.statusCode = 403;
					res.end('You do not have access to this list.');
				}
			})
			.catch((err) => next(err));
	})
	.delete(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
		TodoList.findById(req.params.todoListID)
			.then((todoList) => {
				if (todoList.user.equals(req.user._id) || req.user.isAdmin) {
					TodoList.findByIdAndDelete(req.params.todoListID)
						.then(
							Todo.deleteMany({ todoListID: todoList._id })
								.then((response) => {
									res.statusCode = 200;
									res.setHeader('Content-Type', 'application/json');
									res.json(response);
								})
								.catch((err) => next(err))
						)
						.catch((err) => next(err));
				}
			})
			.catch((err) => next(err));
	})
	.put(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
		TodoList.findById(req.params.todoListID)
			.then((todoList) => {
				if (todoList.user.equals(req.user._id)) {
					todoList = req.body;
					todoList.save();
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(todoList);
				} else {
					res.statusCode = 403;
					res.end('This todoList does not belong tot he authenticated user.');
				}
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, auth.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end('you cannot POST to this endpoint');
	});

module.exports = todoListsRouter;
