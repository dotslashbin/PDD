import { decode } from 'jwt-simple'
import { DecodeResult } from '../../structures/types'
import { Session } from '../../structures/interfaces'

export default class TokenValidator {
	static Decode(token: string, secretKey: string): DecodeResult {
		let result: Session

		try {
			result = decode(token, secretKey, false)

			return {
				type: 'valid',
				session: result,
			}
		} catch (_e) {
			const e: Error = _e

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
