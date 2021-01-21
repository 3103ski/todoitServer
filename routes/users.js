var express = require('express');
var usersRouter = express.Router();

usersRouter
	.route('/')
	.get((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end('Will return all users');
	})
	.post((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end('Will create new user');
	})
	.delete((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end('Is deleting all users');
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end('Not supported at this endpoint');
	});

usersRouter
	.route('/:userID')
	.get((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(`will return user with ID ${req.params.userID}`);
	})
	.post((req, res) => {
		res.statusCode = 403;
		res.end('you cannot POST to this endpoint');
	})
	.delete((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(`Will delete user with ID ${req.params.userID}`);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end(`Will update user with ID ${req.params.userID}`);
	});

usersRouter
	.route('/signup')
	.post((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(`Will create new user`);
	})
	.get((req, res) => {
		res.statusCode = 403;
		res.end(`Unsupported method at this endpoint`);
	})
	.delete((req, res) => {
		res.statusCode = 403;
		res.end(`Unsupported method at this endpoint`);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end(`Unsupported method at this endpoint`);
	});

usersRouter
	.route('/login')
	.post((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(`Will authenticate user`);
	})
	.get((req, res) => {
		res.statusCode = 403;
		res.end(`Unsupported method at this endpoint`);
	})
	.delete((req, res) => {
		res.statusCode = 403;
		res.end(`Unsupported method at this endpoint`);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end(`Unsupported method at this endpoint`);
	});

module.exports = usersRouter;
