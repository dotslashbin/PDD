/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import chai from 'chai'
import 'mocha'
import { GenerateSecretKey, GetExpiryTimestamp } from '../helpers/Utilities'
import TokenGenerator from '../services/auth/TokenGenerator'
import TokenValidator from '../services/auth/TokenValidator'
const expect = chai.expect

const secretKey = GenerateSecretKey()
let tokenToTest = ''

// eslint-disable-next-line @typescript-eslint/no-explicit-any
describe('Utilities -> GetExpiryTimetamp', () => {
	const expiryInMinutes = 10
	it('Should return a valid unix time stamp', () => {
		const result = GetExpiryTimestamp(expiryInMinutes)
		const isValid = new Date(result).getTime() > 0
		expect(isValid).true
	})
})

describe('Token Generator Service', () => {
	const sampleExpiry = 10
	it('Should generate a proper token when correct parameters are supplied', () => {
		const result = TokenGenerator.Generate('abc123', sampleExpiry, secretKey)

		expect(result.token).not.null
		expect(result.token).length.greaterThan(0)
		expect(result.token).string
		expect(result.expires).is.greaterThanOrEqual(0)
		expect(result.expires).equal(sampleExpiry)

		tokenToTest = result.token
	})
})

describe('Token Validator Service', () => {
	it('Should be able to decode a valid token resulting to correct structure', () => {
		const decodedToken = TokenValidator.Decode(tokenToTest, secretKey)
		expect(decodedToken.type).equal('valid')
	})

	const invalidToken =
		'eyJ1eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZWNvcmRJZCI6IjYwZGQ3NDQzYjdlMWRhNjU0M2UwNThlNCIsImV4cGlyZXMiOjJ9.EylQEVu63VDiJxFLDxyjMNStalXJXco9D5bjM4y'

	it('Should give invalid results for invlaid tokens', () => {
		const decodedToken = TokenValidator.Decode(invalidToken, secretKey)
		expect(decodedToken.type).not.equal('valid')
	})

	it('Should result to an invalid token if supplied with the wrong key', () => {
		const validButWrongKey = GenerateSecretKey()
		const decodedToken = TokenValidator.Decode(invalidToken, validButWrongKey)
		expect(decodedToken.type).not.equal('valid')
	})
})
