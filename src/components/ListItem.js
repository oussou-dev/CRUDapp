import React from "react"

const ListItem = props => {
	return (
		<li className="list-group-item d-flex my-1 justify-content-between">
			{props.todo.name}
			<div className="todo-icon">
				<span className="mx-2 text-info" onClick={props.editTodo}>
					<i className="fas fa-pen" />
				</span>
				<span className="mx-2 text-danger" onClick={props.deleteTodo}>
					<i className="fas fa-trash-alt" />
				</span>
			</div>
		</li>
	)
}

export default ListItem
