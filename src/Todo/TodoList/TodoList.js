import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from "../TodoItem/TodoItem"
import './index.scss'

function TodoList (props) {
	const todos = props.todos.map((todo, index) => {
		return <TodoItem key={ todo.id } todo={ todo } index={ index } onChange={ props.onToggle }/>
	})
	
	return (
		<ul className="todo-list">
			{ todos }
		</ul>
	)
}

TodoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.object).isRequired,
	onToggle: PropTypes.func.isRequired
}


export default TodoList
