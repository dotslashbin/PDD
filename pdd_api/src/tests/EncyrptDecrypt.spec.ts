import chai from 'chai'
import 'mocha'
const expect = chai.expect

import { GenerateSecretKey, Encrypt } from '../helpers/Utilities'
import { DEFAULT_IV } from '../config/app'

describe('Inputs should be encrypted, and be decrypted', () => {
	const email = 'johnDoe@testmail.com'

	it('SHould return an output that is not the original', () => {
		expect(Encrypt(email, DEFAULT_IV, GenerateSecretKey())).not.equal('email')
	})

	it('Should return a hash value', () => {
		const encryptedText = Encrypt(email, DEFAULT_IV, GenerateSecretKey())
		expect(encryptedText.iv && encryptedText.content).to.be.true
	})
})
