/**
 * Definition of REST payload
 */
export type PDDataPayload = {
	email: string
	fullName: string
	expiry: number
	attachment?: string
}

export type PDQueryPayload = {
	token: string
	secret: string
}
