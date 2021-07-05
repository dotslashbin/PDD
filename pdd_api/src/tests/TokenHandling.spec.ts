/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import chai from 'chai'
import 'mocha'
import { GenerateSecretKey, GetExpiryTimestamp } from '../helpers/Utilities'
import TokenGenerator from '../services/auth/TokenGenerator'
const expect = chai.expect

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
	const secretKey = GenerateSecretKey()
	const sampleExpiry = 10
	it('Should generate a proper token when correct parameters are supplied', () => {
		const result = TokenGenerator.Generate('abc123', sampleExpiry, secretKey)
		expect(result.token).not.null
		expect(result.token).length.greaterThan(0)
		expect(result.token).string
		expect(result.expires).is.greaterThanOrEqual(0)
		expect(result.expires).equal(sampleExpiry)
	})

})
