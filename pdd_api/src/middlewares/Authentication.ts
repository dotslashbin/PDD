import { Request, Response, NextFunction } from 'express'
import Blacklister from '../services/auth/Blacklister'
import { ReturnError } from '../helpers/Response'
import TokenValidator from '../services/auth/TokenValidator'
import MongoWriter from '../db/Mongodb/MongoWriter'

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
export const AuthenticateToken = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	if (request.method === 'GET') {
		let { token, secretKey } = request.query
		token = token + ''
		secretKey = secretKey + ''

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

		dumpTokenToBlacklist(token)
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

const dumpTokenToBlacklist = (token: string): void => {
	const db = new MongoWriter()
	Blacklister.AddToList(token, db)
}