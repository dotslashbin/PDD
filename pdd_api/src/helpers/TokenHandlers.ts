import MongoWriter from '../db/Mongodb/MongoWriter'
import { MongoReader } from '../db/Mongodb/MongoReader'
import TokenBlacklistReader from '../services/auth/TokenBlacklistReader'
import TokenBlackListWriter from '../services/auth/TokenBlacklistWriter'
import { ExpirationStatus, TokenSession } from '../structures/types/security'

/**
 *
 * @param token Saves a token into the blacklist
 */
export const DumpTokenToBlacklist = (token: string): void => {
	const db = new MongoWriter()
	TokenBlackListWriter.AddToList(token, db)
}

/**
 *
 * @param token Checks to see if token is blacklisted
 * @returns
 */
export const IsTokenBlacklisted = (token: string): boolean => {
	const db = new MongoReader()
	return TokenBlacklistReader.IsBlacklistedToken(token, db)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const HandleToken = (token: string, session: TokenSession) => {
	if (session.expires <= 0) {
		// Immediately dump the token into the blacklist if there is no indicated expiry
		DumpTokenToBlacklist(token)
	}
}

export function checkExpirationStatus(session: TokenSession): ExpirationStatus {
	const now = Date.now()

	if (session.expires > now) return 'active'

	return 'expired'
}
