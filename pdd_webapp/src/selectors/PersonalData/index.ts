import axios from 'axios'

export default class PersonalDataSelector {
	static async Create(name: string, email: string): Promise<any> {
		return await axios
			.post('http://localhost:3001/personal-data', { name, email })
			.then((result) => result)
			.catch((error) => {
				console.error(`Axios error: ${error}`)
			})
	}
}
