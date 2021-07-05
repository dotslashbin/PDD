import chai from 'chai'
import 'mocha'
const expect = chai.expect

import { GenerateSecretKey, Encrypt, Decrypt } from '../helpers/Utilities'
import { DEFAULT_IV } from '../config/app'
import { Hash } from '../structures/types'

let secretKey = ''

const email = 'johnDoe@testmail.com'
let encryptedEmail = ''

describe('Pre-requisites of encryption and decryption', () => {
	it('A secret key must be generated', () => {
		const value = GenerateSecretKey()
		expect(value).not.null
		secretKey = value
	})
})

describe('Encyrption', () => {
	it('Should not return the original string', () => {
		expect(Encrypt(email, DEFAULT_IV, secretKey)).not.equal('email')
	})

	it('Should return a hash value', () => {
		const encryptedData = Encrypt(email, DEFAULT_IV, secretKey)

		expect(encryptedData.iv).is.not.undefined
		expect(encryptedData.content).is.not.undefined

		encryptedEmail = encryptedData.content
	})
})

describe('Decryption', () => {
	it('Should result to the original text', () => {
		const emailHash: Hash = {
			content: encryptedEmail.toString(),
			iv: DEFAULT_IV,
		}

		const decryptResult = Decrypt(emailHash, secretKey)
		expect(decryptResult).equal(email)
	})
})
