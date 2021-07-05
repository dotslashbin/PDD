import chai from 'chai'
import 'mocha'
import { GenerateSecretKey } from '../helpers/Utilities'

const expect = chai.expect

describe('Utilities', () => {
	it('Should return a secret key', () => {
		expect(GenerateSecretKey()).not.null
	})
})
