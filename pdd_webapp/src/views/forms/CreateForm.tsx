import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, TextField } from '@material-ui/core'
import PersonalDataSelector from '../../selectors/PersonalData'
import DisplayMessage from '../notices/DisplayMessage'
import { GetMessagesArray } from '../../helpers/Messages'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CreateForm(): any {
	const classes = useStyles()

	const [email, setEmail] = useState('')
	const [fullName, setFullName] = useState('')
	const [expiry, setExpiry] = useState('')
	const [attachement, setAttachment] = useState('')
	const [message, setMessage] = useState('')
	const [serverity, setSeverity] = useState('')

	const updateEmailValue = (value: string) => {
		setEmail(value)
	}

	const updateFullName = (value: string) => {
		setFullName(value)
	}

	const updateExpiry = (value: string) => {
		setExpiry(value)
	}

	const updateAttachment = (e: any) => {
		e.preventDefault()

		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (readerEvt: any) => {
				const binaryString = readerEvt.target.result
				setAttachment(binaryString)
			}
			reader.readAsBinaryString(file)
		}
	}

	const submitForm = async () => {
		try {
			const result = await PersonalDataSelector.Create(email, fullName, expiry, attachement)	
			if (result.error) {
				setMessage(result.message)
				setSeverity('error')
			}

			setMessage(result.data.message)
			setSeverity('info')
		} catch (error) {
			console.error(`There is an error: ${error}`)
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Please enter your personal data
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={(input: any) => {updateEmailValue(input.target.value)}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="name"
						label="Full Name"
						name="name"
						autoComplete="name"
						value={fullName}
						onChange={(input: any) => {updateFullName(input.target.value)}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						id="expiry"
						label="Token expiry (in minutes)"
						name="expiry"
						autoComplete="expiry"
						onChange={(input: any) => {updateExpiry(input.target.value)}}
					/>
					<input type="file" name="cv" onChange={updateAttachment} />
					<Button
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={() => {submitForm()}}
					>
            Submit
					</Button>
				</form>
				<DisplayMessage messages={GetMessagesArray(message)} severity={serverity}/>
			</div>
		</Container>
	)
}