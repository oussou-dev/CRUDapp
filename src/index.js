import React from "react"
import ReactDOM from "react-dom"
import "./styles.css"
// import uuid from "uuid"
// Math.random().toString(34).slice(2)

export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			newTodo: "",
			editing: false,
			editingIndex: null,
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

	generateTodoId() {
		const lastTodo = this.state.todos[this.state.todos.length - 1]
		if (lastTodo) {
			return lastTodo.id + 1
		}
		return 1
	}

	handleChange = e => {
		this.setState({
			newTodo: e.target.value
		})
	}

	addTodo = e => {
		// on previent la comportement par default du navigateur
		e.preventDefault()

		// on recupere les donnees de la new todo
		const newTodo = {
			id: this.generateTodoId,
			name: this.state.newTodo
		}

		// si l'input contient une valeur
		if (newTodo.name) {
			// on ajoute la new todo au tableau des todos
			const todos = this.state.todos
			todos.push(newTodo)

			// on met à jour le state et on vide l'input
			this.setState({
				todos: todos,
				newTodo: ""
			})
		} else {
			alert("Ajouter un titre !")
		}
	}

	deleteTodo = index => {
		// console.log(index)

		// creation d'une copie de todos => car state immutable
		const todosCopied = this.state.todos
		// suppression du todo selectionné de la copie créee
		delete todosCopied[index]
		// MAJ des todos avec suppression du todo cliqué
		this.setState({
			todos: todosCopied
		})
	}

	editTodo = index => {
		// console.log(index)

		// on recupere le Todo que l'on veut modifier
		const todo = this.state.todos[index]

		// au clic du button on passse en mode editing
		this.setState({
			editing: true,
			newTodo: todo.name,
			editingIndex: index
		})
	}

	updateTodo = () => {
		// on recupere la liste des todos
		const todos = this.state.todos

		// on recupere le todo à editer
		const todoToUpdate = todos[this.state.editingIndex]

		// on maj le nom du todo avec les modifs
		todoToUpdate.name = this.state.newTodo

		this.setState({
			todos: todos,
			newTodo: "",
			editing: false,
			editingIndex: null
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
					onClick={
						this.state.editing ? this.updateTodo : this.addTodo
					}
				>
					{this.state.editing ? "Update Todo" : "Add Todo"}
				</button>

				{!this.state.editing && (
					<ul className="list-group">
						{this.state.todos.map((todo, index) => {
							return (
								<li
									key={index}
									className="list-group-item d-flex my-1 justify-content-between"
								>
									{todo.name}
									<div className="todo-icon">
										<span
											className="mx-2 text-success"
											onClick={() => {
												this.editTodo(index)
											}}
										>
											<i className="fas fa-pen" />
										</span>
										<span
											className="mx-2 text-danger"
											onClick={() => {
												this.deleteTodo(index)
											}}
										>
											<i className="fas fa-trash-alt" />
										</span>
									</div>
								</li>
							)
						})}
					</ul>
				)}
			</div>
		)
	}
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
