import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CreateForm from './views/forms/CreateForm'
import PDDisplay from './views/display/PDDisplay'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function App(): any {
	return (
		<Router>
			<Route exact path="/" component={CreateForm} />
			<Route exact path="/view" component={PDDisplay} />
		</Router>
	)
}
