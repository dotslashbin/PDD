import React from 'react'
import './App.css'
import CreateForm from './views/forms/CreateForm'

import Container from '@material-ui/core/Container'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function App(): any {
	return (
		<Container className="App">
			<CreateForm />
		</Container>
	)
}
