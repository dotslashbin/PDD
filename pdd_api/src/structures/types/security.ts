import import { Session } from '../interfaces'

/**
 * Definition of a hash
 */
export type Hash = {
	iv: any
	content: string
}

/**
 * Definition of an encoded result
 */
export interface EncodeResult {
	token: string
	expires: number
}

/**
 * Definition of the types a decoded result
 */
export type DecodeResult =
	| { type: 'valid'; session: Session }
	| { type: 'integrity-error' }
	| { type: 'invalid-token' }

export type ExpirationStatus = 'expired' | 'active'

export type TokenSession = { recordId: string; expires: number }
