import React, { useEffect, useState } from 'react'
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

const personalDataSkeleton = { email:'', fullName: '', attachment: '' }

export default function PDDisplay(props: any): any {

	const classes = useStyles()

	const [message, setMessage] = useState('')
	const [severity, setSeverity] = useState('')
	const [email, setEmail] = useState('')
	const [personalData, setPersonalData] = useState(personalDataSkeleton)


	const search = props.location.search

	const params = new URLSearchParams(search)
	const token = params.get('token')
	const secretKey = params.get('secretKey')

	useEffect(() => {
		if(token && secretKey) {
			fetchData(token, secretKey).then(result => {
				if(result.status === 401) {
					setSeverity('error')
					setMessage(result.data.message)
					setPersonalData(personalDataSkeleton)
				} else if (result.status === 200) {
					setPersonalData(result.data)
				}
			})
		}
	}, [])

	return(
		<Container>
			<div className={classes.pageMessage}>
				<DisplayMessage messages={GetMessagesArray(message)} severity={severity} />
			</div>
			<div>
				{(personalData && personalData.email)? personalData.email:''}
			</div>
		</Container>
	)
}