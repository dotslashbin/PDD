/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import chai from 'chai'
import 'mocha'
import { GetExpiryTimestamp } from '../helpers/Utilities'
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

