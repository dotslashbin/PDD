import crypto from 'crypto'
import { Hash } from '../structures/types'

const algorithm = 'aes-256-ctr'

/**
 * Decrypts a hash based on a given secret
 * @param hash
 * @param secretKey
 * @returns
 */
export const Decrypt = (hash: Hash, secretKey: string): string => {
	const decipher = crypto.createDecipheriv(
		algorithm,
		secretKey,
		Buffer.from(hash.iv, 'hex')
	)

	const decrpyted = Buffer.concat([
		decipher.update(Buffer.from(hash.content, 'hex')),
		decipher.final(),
	])

	return decrpyted.toString()
}

/**
 * Encrypts a hash
 * @param text
 * @param iv
 * @param secretKey
 * @returns
 */
export const Encrypt = (text: string, iv: Buffer, secretKey: string): Hash => {
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

	const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

	return {
		iv: iv.toString('hex'),
		content: encrypted.toString('hex'),
	}
}

/**
 * Returns a generate dsecret key
 * @returns
 */
export const GenerateSecretKey = (): string => {
	return crypto.randomBytes(16).toString('hex')
}

/**
 * Returns a new timestamp based on the current time plus the added minutes
 * @param inputInIminutes
 * @returns
 */
export const GetExpiryTimestamp = (inputInIminutes: number): number => {
	const currentDate = new Date()
	return new Date(currentDate.getTime() + inputInIminutes * 60000).getTime()
}
