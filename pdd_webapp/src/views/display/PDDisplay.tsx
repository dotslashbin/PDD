import React, { useEffect, useState } from 'react'
import { Card, CardContent, Container, makeStyles, Typography } from '@material-ui/core'
import PersonalDataSelector from '../../selectors/PersonalData'
import { GetMessagesArray } from '../../helpers/Messages'
import DisplayMessage from '../notices/DisplayMessage'

const useStyles = makeStyles((theme) => ({
	pageMessage: {
		marginTop: '50px',
		marginBottom: '50px',
	},
	root: {
		minWidth: 275,
	},
	email: {
		color: 'red'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}))

const fetchData = async (token:string, secretKey: string):Promise<any> => {
	return PersonalDataSelector.Fetch(token, secretKey).then(result => result).catch(error => error)
}

const personalDataSkeleton = { email:'', fullName: '', attachment: '' }

export default function PDDisplay(props: any): any {

	const classes = useStyles()

	const [message, setMessage] = useState('')
	const [severity, setSeverity] = useState('')
	const [status, setStatus] = useState(0)
	const [attachment, setAttachment] = useState('')
	const [personalData, setPersonalData] = useState(personalDataSkeleton)


	const search = props.location.search

	const params = new URLSearchParams(search)
	const token = params.get('token')
	const secretKey = params.get('secretKey')

	useEffect(() => {
		if(token && secretKey) {
			fetchData(token, secretKey).then(result => {
				if(result.status === 401) {
					setStatus(result.status)
					setSeverity('error')
					setMessage(result.data.message)
					setPersonalData(personalDataSkeleton)
				} else if (result.status === 200) {
					
					setStatus(result.status)
					setPersonalData(result.data)
					const attachmentValue = (result.data.attachment)?`data:application/pdf;base64,${result.data.attachment}`:''
					setAttachment(attachmentValue)
				}
			})
		}
	}, [])

	return(
		<Container>
			{(status === 401)? 
				<div className={classes.pageMessage}>
					<DisplayMessage messages={GetMessagesArray(message)} severity={severity} />
				</div>: 
				<div>
					<br />
					<br />
					<br />
					<Card className={classes.root} variant="outlined">
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
							You are viewing the personal data  of ... 
							</Typography>
							<Typography variant="h5" component="h2">
								{personalData.fullName}
							</Typography>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
							Try reaching out through: 
							</Typography>
							<Typography variant="subtitle1">
								<span className={classes.email}>{personalData.email}</span>
							</Typography>
							{(attachment)?<Typography>
								<a href={attachment} download>Download CV</a>
							</Typography>:''}
							
						</CardContent>
					</Card>
					<hr />
					{(attachment)?
						<Card>
							<CardContent>
								<Typography variant="caption">
								PDF view
								</Typography>
								<iframe src={attachment} height="800px" width="100%"></iframe>
							</CardContent>
						</Card>:''}
				</div>
			}
		</Container>
	)
}