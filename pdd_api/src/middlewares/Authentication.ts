import { Request, Response, NextFunction } from 'express'
import { ReturnError } from '../helpers/Response'
import {
	GetExpirationStatus,
	HandleToken,
	IsTokenBlacklisted,
} from '../helpers/TokenHandlers'
import TokenValidator from '../services/auth/TokenValidator'

const BLACKLISTED_TOKEN_TYPE = 'blacklisted-token'
const BLACKLISTED_TOKEN_MESSAGE =
	'Your token has expired or reached the maximum allowable usage'
const INVALID_TOKEN_MESSAGE =
	'Your token may be missing or could not be validated'

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
				BLACKLISTED_TOKEN_TYPE,
				BLACKLISTED_TOKEN_MESSAGE
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
				INVALID_TOKEN_MESSAGE
			)

			return
		}

		// Check to see if the token used has already expired
		if (
			tokenValidationResult.session.expires !== 0 &&
			GetExpirationStatus(tokenValidationResult.session) === 'expired'
		) {
			ReturnError(
				401,
				response,
				BLACKLISTED_TOKEN_TYPE,
				BLACKLISTED_TOKEN_MESSAGE
			)

			return
		}

		request.query.recordId = tokenValidationResult.session.recordId

		HandleToken(token, tokenValidationResult.session)
	}

	next()
}
