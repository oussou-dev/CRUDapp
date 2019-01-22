import React from "react"
import ReactDOM from "react-dom"

import "./styles.css"

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
		// console.log(e.target.name, e.target.value)
	}

	render() {
		console.log(this.state.newTodo)

		return (
			<div className="text-center p-4">
				<h1 className="text-capitalize">todos app</h1>
				<input
					type="text"
					name="todo"
					className="my-3 form-control"
					placeholder="Add a new todo"
					onChange={this.handleChange}
					value={this.state.newTodo}
				/>
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
