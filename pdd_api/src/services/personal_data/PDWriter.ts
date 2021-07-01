import { DBWriter } from '../../structures/interfaces'
import { Payload } from '../../structures/types'
import { getModelForClass } from '@typegoose/typegoose'
import { PersonalData } from '../../models/PersonalData'
import { Encrypt, GenerateSecretKey } from '../../helpers/Utilities'
import crypto from 'crypto'
import TokenGenerator from '../auth/TokenGenerator'

export default class PDWriter {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static Create(params: Payload, db: DBWriter): Promise<any> {
		const model = getModelForClass(PersonalData)
		const iv = crypto.randomBytes(16)

		/**
		 * Generating the secret to be used for the encryption and generating the token
		 */
		const secretKey = GenerateSecretKey()
		const { email, fullName, attachment } = this.getEncryptedValues(
			params,
			iv,
			secretKey
		)

		const { expiry } = params

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		return db
			.Save(
				{
					email,
					fullName,
					attachment,
					iv,
				},
				model
			)
			.then((result: any) => {
				// TODO: chante the 5 into a dynamic input
				const token = TokenGenerator.Generate(result._id, expiry, secretKey)
				return { personal_data: result, token }
			})
			.catch((error: any) => error)
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	private static getEncryptedValues(
		params: Payload,
		iv: any,
		secretKey: string
	): { email: string; fullName: string; attachment: any } {
		let { email, fullName, attachment } = params

		if (email && fullName) {
			const encEmail = Encrypt(email, iv, secretKey)
			const encFullName = Encrypt(fullName, iv, secretKey)

			if (attachment) {
				const encAttachment = Encrypt(attachment, iv, secretKey)
				attachment = encAttachment.content
			}

			email = encEmail.content
			fullName = encFullName.content
		}

		return { email, fullName, attachment }
	}
}
