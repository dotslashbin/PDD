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
	recordId: any
	secretKey: any
}

export type SearchPayload = {
	key: string
	value: string
}
