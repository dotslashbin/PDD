import { DBWriter } from '../../structures/interfaces'
import { PDDataPayload } from '../../structures/types'
import { getModelForClass } from '@typegoose/typegoose'
import { PersonalData } from '../../models/PersonalData'
import { Encrypt, GenerateSecretKey } from '../../helpers/Utilities'
import TokenGenerator from '../auth/TokenGenerator'
import { DEFAULT_IV } from '../../config/app'

export default class PDWriter {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static Create(params: PDDataPayload, db: DBWriter): Promise<any> {
		const model = getModelForClass(PersonalData)
		const iv = DEFAULT_IV

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
				},
				model
			)
			.then((result: any) => {
				const session = TokenGenerator.Generate(result._id, expiry, secretKey)
				return { personal_data: result, session, secretKey }
			})
			.catch((error: any) => error)
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	private static getEncryptedValues(
		params: PDDataPayload,
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
