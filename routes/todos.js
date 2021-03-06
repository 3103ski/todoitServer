var express = require('express');
var todosRouter = express.Router();
const Todo = require('../models/todo');
const TodoList = require('../models/todoList');

const cors = require('./cors');
const auth = require('../authenticate');

todosRouter
	.route('/')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
		Todo.find()
			.then((todos) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(todos);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
		req.body.user = req.user;
		TodoList.find({ _id: req.body.todoListID })
			.then((list) => {
				if (list[0] && list[0].user.equals(req.user._id)) {
					Todo.create(req.body)
						.then((todo) => {
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json(todo);
						})
						.catch((err) => next(err));
				} else {
					res.statusCode = 500;
					res.end('The list ID was valid but there is an issue with the data it found.');
				}
			})
			.catch((err) => {
				res.statusCode = 404;
				res.setHeader('Content-Type', 'application/json');
				res.json({
					mongooseErr: err,
					errMsg: 'You are trying to add a list item to a list that does not exist',
				});
			});
	})
	.delete(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
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
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, auth.verifyUser, (req, res, next) => {
		TodoList.findById(req.params.listID)
			.then((list) => {
				if (list.user.equals(req.user._id)) {
					Todo.find({ todoListID: req.params.listID })
						.then((todos) => {
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json(todos);
						})
						.catch((err) => next(err));
				} else {
					res.statusCode = 403;
					res.end('This list does not belong to the authenticated user');
				}
			})
			.catch((err) => next(err));
	})
	.delete(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
		TodoList.findById(req.params.listID)
			.then((list) => {
				if (list.user.equals(req.user._id) || req.user.isAdmin) {
					Todo.deleteMany({ todoListID: req.params.listID })
						.then((response) => {
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json(response);
						})
						.catch((err) => next(err));
				} else {
					res.statusCode = 403;
					res.end('You must be the list owner or admin to remove a list');
				}
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, auth.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end('you cannot POST to this endpoint');
	})
	.put(cors.corsWithOptions, auth.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end(`Unsupported method for this endpoint`);
	});

todosRouter
	.route('/:todoID')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, auth.verifyUser, (req, res, next) => {
		Todo.findById(req.params.todoID)
			.then((todo) => {
				if (todo.user.equals(req.user._id)) {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(todo);
				} else {
					res.statusCode = 403;
					res.end('This todo does not belong to the authenticated user');
				}
			})
			.catch((err) => next(err));
	})
	.delete(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
		Todo.findById(req.params.todoID)
			.then((todo) => {
				if (todo.user.equals(req.user._id)) {
					Todo.findByIdAndDelete(req.params.todoID)
						.then((response) => {
							res.statusCode = 200;
							res.setHeader('Content-Type', 'application/json');
							res.json(response);
						})
						.catch((err) => next(err));
				}
			})
			.catch((err) => next(err));
	})
	.put((req, res, next) => {
		Todo.findById(req.params.todoID)
			.then((todo) => {
				if (todo.user.equals(req.user._id)) {
					todo = req.body;
					todo.save((err) => {
						res.statusCode = 500;
						res.setHeader('Content-Type', 'application/json');
						res.json({ error: err });
					});
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(todo);
				} else {
					res.statusCode = 403;
					res.end('This todo does not belong tot he authenticated user.');
				}
			})
			.catch((err) => next(err));
	})
	.post((req, res) => {
		res.statusCode = 403;
		res.end('you cannot POST to this endpoint');
	});

module.exports = todosRouter;
