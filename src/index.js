import React from "react"
import ReactDOM from "react-dom"
import "./styles.css"
import ListItem from "./components/ListItem"
import { apiUrl } from "./mockApi/mockApi"
import axios from "axios"

// import uuid from "uuid"
// Math.random().toString(34).slice(2)

export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			newTodo: "",
			editing: false,
			editingIndex: null,
			notification: null,
			todos: []
		}
	}

	async componentDidMount() {
		const response = await axios.get(`${apiUrl}/todos`)
		this.setState({
			todos: response.data
		})
	}

	handleChange = e => {
		this.setState({
			newTodo: e.target.value
		})
	}

	addTodo = async e => {
		// on previent la comportement par default du navigateur
		e.preventDefault()

		const response = await axios.post(`${apiUrl}/todos`, {
			name: this.state.newTodo
		})

		const todos = this.state.todos
		todos.push(response.data)

		// on met à jour le state et on vide l'input
		this.setState({
			todos: todos,
			newTodo: ""
		})

		this.alert("Todo added successfully")
	}

	alert = notification => {
		this.setState({
			notification: notification
		})

		setTimeout(() => {
			this.setState({
				notification: null
			})
		}, 1000)
	}

	deleteTodo = async index => {
		// creation d'une copie de todos => car state immutable
		const todosCopied = this.state.todos

		// on recupere le todo à supprimer
		const todo = todosCopied[index]

		// on fait un app https en passant l'id du toto à supprimer
		await axios.delete(`${apiUrl}/todos/${todo.id}`)

		// suppression du todo selectionné de la copie créee
		delete todosCopied[index]

		// MAJ des todos avec suppression du todo cliqué
		this.setState({
			todos: todosCopied
		})
		this.alert("Todo deleted successfully")
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

		this.alert("Todo updated successfully")
	}

	validateData = () => {
		const value = this.state.newTodo
		const test = value.length <= 5 ? true : false
		return test
	}

	render() {
		return (
			<div className="text-center m-4">
				<h1 className="card py-2 text-capitalize">todos app</h1>
				{this.setTimeOut}
				{this.state.notification && (
					<div className="alert alert-success">
						<p className="text-center my-0">
							{this.state.notification}
						</p>
					</div>
				)}

				<input
					type="text"
					name="todo"
					className="my-3 form-control"
					placeholder="Add a new todo"
					onChange={this.handleChange}
					value={this.state.newTodo}
				/>

				<button
					className="btn-success form-control mb-3"
					// disabled={this.state.newTodo.length < 5}
					disabled={this.validateData()}
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
								<ListItem
									key={todo.id}
									todo={todo}
									addTodo={() => {
										this.addTodo(index)
									}}
									deleteTodo={() => {
										this.deleteTodo(index)
									}}
									editTodo={() => {
										this.editTodo(index)
									}}
								/>
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
