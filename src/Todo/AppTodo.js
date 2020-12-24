import React, { useState, useEffect } from 'react'
import TodoList from "./TodoList/TodoList"
import Context from "./context"
import Preloader from "../Components/Preloader/Preloader"

const AddTodo = React.lazy(() => new Promise(resolve => {
	setTimeout(() => {
		resolve(import('./AddTodo/AddTodo'))
	}, 3000)
}))

export default function AppTodo () {
	const [ todos, setTodos ] = useState([])
	const [ loading, setLoading ] = useState(true)
	
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
			.then(response => response.json())
			.then(todos => {
				setTimeout(() => {
					setTodos(todos)
					setLoading(false)
				}, 2000)
			})
	}, [])
	
	function toggleTodo (id) {
		setTodos(
			todos.map(todo => {
				if ( id === todo.id ) {
					todo.completed = !todo.completed
				}
				return todo
			})
		)
	}
	
	function removeTodo (id) {
		setTodos(todos.filter(todo => todo.id !== id))
	}
	
	function addTodo (title) {
		setTodos(todos.concat([
			{
				title,
				id: Date.now(),
				completed: false
			}
		]))
	}
	
	return (
		<Context.Provider value={ { removeTodo } }>
			<h1>Learn React</h1>
			<React.Suspense fallback={<Preloader/>}>
				<AddTodo onCreate={ addTodo }/>
			</React.Suspense>
			{ loading && <Preloader/> }
			{ todos.length
				? (<TodoList todos={ todos } onToggle={ toggleTodo }/>)
				: loading ? null : (<p>No todos</p>) }
		
		</Context.Provider>
	)
}