const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		isComplete: {
			type: Boolean,
			default: false,
		},
		todoListID: {
			type: String,
			required: true,
		},
		priority: {
			type: Number,
			min: 1,
			max: 5,
			default: null,
		},
		dueDate: {
			type: Date,
			default: null,
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

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
