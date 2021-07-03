import React from 'react'
import { Container } from '@material-ui/core'
import PersonalDataSelector from '../../selectors/PersonalData'

const fetchData = async (token:string, secretKey: string):Promise<any> => {
	return PersonalDataSelector.Fetch(token, secretKey).then(result => result).catch(error => error)
}

export default function PDDisplay(props: any): any {
	const search = props.location.search
	const params = new URLSearchParams(search)

	const token = params.get('token')
	const secretKey = params.get('secretKey')

	if(token  && secretKey) {
		fetchData(token, secretKey).then(result => {
			console.log(result)
		})
	}

	return(
		<Container>
			Here isthe display
		</Container>
	)
}