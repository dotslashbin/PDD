import { Session } from '../../structures/interfaces'
import { EncodeResult } from '../../structures/types'
import { encode } from 'jwt-simple'

export default class TokenGenerator {
	static Generate(
		recordId: string,
		expires: number,
		secret: string
	): EncodeResult {
		const session: Session = {
			recordId,
			expires,
		}

		return {
			token: encode(session, secret),
			expires,
		}
	}
}
