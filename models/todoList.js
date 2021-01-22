const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoListSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: '',
		},
		todos: {
			type: Array,
			default: [],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const TodoList = mongoose.model('TodoList', todoListSchema);
module.exports = TodoList;
