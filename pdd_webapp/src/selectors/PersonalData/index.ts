import axios from 'axios'

/**
 * Static class that is responsible for making axios calls to the API
 */
export default class PersonalDataSelector {
	/**
	 * Calls API to create a new record
	 * @param email
	 * @param fullName
	 * @param expiry
	 * @param attachment
	 * @returns
	 */
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
			.catch((createError) => {
				const { status, message } = createError.response.data
				return { error: true, status, message }
			})
	}
	/**
	 * Calls API to fetch a record with the token and secret
	 * @param token
	 * @param secretKey
	 * @returns
	 */
	static async Fetch(token: string, secretKey: string): Promise<any> {
		return axios
			.get(`http://localhost:3001/personal-data?token=${token}&secretKey=${secretKey}`)
			.then((result) => {
				return result.data
			})
			.catch((fetchError) => {
				return fetchError.response
			})
	}
}
