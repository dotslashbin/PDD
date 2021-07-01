import { decode } from 'jwt-simple'
import { Session } from '../../structures/interfaces'
// import { DecodeResult } from '../../structures/types'

export default class TokenValidator {
	// TODO: change to return DecodeResult
	static Decode(token: string, secretKey: string): any {
		let result: Session

		try {
			result = decode(token, secretKey)

			console.log(result)

			return {
				type: 'valid',
				session: result,
			}
		} catch (error) {
			console.error(error)
		}
	}
}
