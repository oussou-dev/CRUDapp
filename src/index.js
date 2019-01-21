import React from "react"
import ReactDOM from "react-dom"

import "./styles.css"

function App() {
	return (
		<div className="text-center p-4">
			<h1 className="text-capitalize">
				todos app
			</h1>
			<div className="container">
				<ul className="list-group">
					<li className="list-group-item">
						BUY SOME CLOTHES
					</li>
					<li className="list-group-item">
						WRITE SOME CODE
					</li>
					<li className="list-group-item">
						WATCH NETFLIX
					</li>
				</ul>
			</div>
		</div>
	)
}

const rootElement = document.getElementById(
	"root"
)
ReactDOM.render(
	<App />,
	rootElement
)
