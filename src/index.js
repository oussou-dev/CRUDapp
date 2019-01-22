import React from "react"
import ReactDOM from "react-dom"
import "./styles.css"
// Math.random().toString(34).slice(2)

export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			newTodo: "",
			todos: [
				{
					id: 1,
					name: "Play golf"
				},
				{
					id: 2,
					name: "Buy some clothes"
				},
				{
					id: 3,
					name: "Write some code"
				},
				{
					id: 4,
					name: "Watch Netflix"
				}
			]
		}
	}

	handleChange = e => {
		this.setState({
			newTodo: e.target.value
		})
	}

	addTodo = e => {
		e.preventDefault()
		const newTodo = {
			id: this.state.todos[this.state.todos.length - 1].id + 1,
			name: this.state.newTodo
		}
		this.setState({
			todos: [...this.state.todos, newTodo],
			newTodo: ""
		})
	}

	render() {
		return (
			<div className="text-center m-4">
				<h1 className="text-capitalize">todos app</h1>
				<input
					type="text"
					name="todo"
					className="my-3 form-control"
					placeholder="Add a new todo"
					onChange={this.handleChange}
					value={this.state.newTodo}
				/>

				<button
					className="btn-info form-control mb-3"
					onClick={this.addTodo}
				>
					Add Todo
				</button>

				<div className="container">
					<ul className="list-group">
						{this.state.todos.map(todo => {
							return (
								<li key={todo.id} className="list-group-item">
									{todo.name}
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
