import crypto from 'crypto'
import { Hash } from '../structures/types'

const algorithm = 'aes-256-ctr'

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

export const Encrypt = (text: string, iv: Buffer, secretKey: string): Hash => {
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

	const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

	return {
		iv: iv.toString('hex'),
		content: encrypted.toString('hex'),
	}
}

export const GenerateSecretKey = (): string => {
	return crypto.randomBytes(16).toString('hex')
}
