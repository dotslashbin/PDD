import React, { useState } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import PersonalDataSelector from '../../selectors/PersonalData'
import { GetMessagesArray } from '../../helpers/Messages'
import DisplayMessage from '../notices/DisplayMessage'

const useStyles = makeStyles((theme) => ({
	pageMessage: {
		marginTop: '50px',
		marginBottom: '50px',
	}
}))

const fetchData = async (token:string, secretKey: string):Promise<any> => {
	return PersonalDataSelector.Fetch(token, secretKey).then(result => result).catch(error => error)
}

export default function PDDisplay(props: any): any {

	const classes = useStyles()

	const search = props.location.search
	const params = new URLSearchParams(search)
	const token = params.get('token')
	const secretKey = params.get('secretKey')

	const [message, setMessage] = useState('')
	const [severity, setSeverity] = useState('')

	if(token  && secretKey) {
		fetchData(token, secretKey).then(result => {
			console.log(result)
			if(result.status === 401) { // This means an error
				setSeverity('error')
				setMessage(result.data.message)
			}
		})
	}

	return(
		<Container>
			<div className={classes.pageMessage}>
				<DisplayMessage messages={GetMessagesArray(message)} severity={severity} />
			</div>
		</Container>
	)
}