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

		// Step 1: Check if token has been black listed
		// Check for blacklisted token
		if ((await IsTokenBlacklisted(token)) === true) {
			ReturnError(
				401,
				response,
				'blacklisted-token',
				'Your token has reached the maximum allowable usage'
			)
			return
		}

		// Decodes the token if it has passed
		const tokenValidationResult = TokenValidator.Decode(token, secretKey)

		// Step 2: Checks for token validity
		// Checks for token validity
		if (tokenValidationResult.type !== 'valid') {
			ReturnError(
				401,
				response,
				tokenValidationResult.type,
				'Your token may be missing or could not be validated'
			)

			return
		}

		request.query.recordId = tokenValidationResult.session.recordId

		HandleToken(token, tokenValidationResult.session)
	}

	next()
	
}
