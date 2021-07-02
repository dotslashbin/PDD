/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab/'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	messagesContainer: {
		marginBottom: '5px'
	}, 
	message: {
		fontWeight: 'bold',
	},
	alertContainer: {
		minWidth: '100%'
	}
}))

export default function DisplayMessage(props: any): any {

	const classes = useStyles()

	return (
		<div className={classes.alertContainer}>
			<Alert severity={props.severity}>
				<AlertTitle>{props.severity.toUpperCase() }</AlertTitle>
				<div className={classes.messagesContainer}>
					{props.messages.map((message: string) => (
						// eslint-disable-next-line react/jsx-key
						<div className={classes.message}>{message}</div>
					))}
				</div>
			</Alert>
		</div>
	)
}