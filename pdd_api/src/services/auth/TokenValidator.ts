import { decode } from 'jwt-simple'
import { Session } from '../../structures/interfaces'
// import { DecodeResult } from '../../structures/types'

export default class TokenValidator {
	// TODO: change to return DecodeResult
	static Decode(token: string, secretKey: string): any {
		let result: Session

		try {
			result = decode(token, secretKey, false)

			return {
				type: 'valid',
				session: result,
			}
		} catch (_e) {
			const e: Error = _e

			console.log(e)

			if (
				e.message === 'No token supplied' ||
				e.message === 'Not enough or too many segments'
			) {
				return {
					type: 'invalid-token',
				}
			}

			if (
				e.message === 'Signature verification failed' ||
				e.message === 'Algorithm not supported'
			) {
				return {
					type: 'integrity-error',
				}
			}

			// Handle json parse errors, thrown when the payload is nonsense
			if (e.message.indexOf('Unexpected token') === 0) {
				return {
					type: 'invalid-token',
				}
			}

			throw e
		}
	}
}
