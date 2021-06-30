import axios from 'axios'

export default class PersonalDataSelector {
	static async Create(
		name: string,
		email: string,
		attachment: string
	): Promise<any> {
		return axios
			.post('http://localhost:3001/personal-data', { name, email, attachment })
			.then((result) => result)
			.catch((error) => {
				console.error(`Axios error: ${error}`)
			})
	}
}
