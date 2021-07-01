/**
 * Definition of a session to be stored in token
 */
export interface Session {
	recordId: string
	expires: number
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

export type ExpirationStatus = 'expired' | 'active' | 'grace'
