import axios from 'axios'

export default class PersonalDataSelector {
	static async Create(
		email: string,
		fullName: string,
		expiry: string,
		attachment: string
	): Promise<any> {
		return axios
			.post('http://localhost:3001/personal-data', {
				email,
				fullName,
				expiry,
				attachment,
			})
			.then((result) => {
				return result.data
			})
			.catch((error) => {
				const { status, message } = error.response.data
				return { error:true, status, message }
			})
	}
}
