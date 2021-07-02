import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab/'

export default function DisplayMessage(props: any): any {

	return (
		<div>
			<Alert severity={props.severity}>
				<AlertTitle>{props.severity.toUpperCase() }</AlertTitle>
				{props.message}
			</Alert>
		</div>
	)
}