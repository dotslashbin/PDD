import { Request, Response, NextFunction } from 'express'
import { ReturnError } from '../helpers/Response'
import { HandleToken, IsTokenBlacklisted } from '../helpers/TokenHandlers'
import TokenValidator from '../services/auth/TokenValidator'

/**
 * Authentication middleware.
 *
 * NOTE: This is missing an implementation to check for the expiry, and
 * it mnay be added as needed. The structure is ready for it
 * @param request
 * @param response
 * @param next
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const AuthenticateToken = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	if (request.method === 'GET') {
		let { token, secretKey } = request.query
		token = token + ''
		secretKey = secretKey + ''

		if ((await IsTokenBlacklisted(token)) === true) {
			ReturnError(
				401,
				response,
				'blacklisted-token',
				'Your token is no longer active.'
			)
			return
		}

		const tokenValidationResult = TokenValidator.Decode(token, secretKey)
		if (tokenValidationResult.type !== 'valid') {
			ReturnError(
				401,
				response,
				tokenValidationResult.type,
				'Your token is no longer active.'
			)

			return
		}

		request.query.recordId = tokenValidationResult.session.recordId

		HandleToken(token, tokenValidationResult.session)
	}

	/**
	if (
		decodedSession.type === 'integrity-error' ||
		decodedSession.type === 'invalid-token'
	) {
		Unauthorized(`Token validaton failed: ${decodedSession.type}`, response)
	}

	response.locals = {
		...response.locals,
		session: decodedSession,
	}
	 */

	next()
}
