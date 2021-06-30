import { DBWriter } from '../../structures/interfaces'
import { Payload } from '../../structures/types'
import { getModelForClass } from '@typegoose/typegoose'
import { PersonalData } from '../../models/PersonalData'
import { Encrypt } from '../../helpers/Utilities'
import crypto from 'crypto'

export default class PDWriter {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static async Create(params: Payload, db: DBWriter): Promise<any> {
		const model = getModelForClass(PersonalData)
		const iv = crypto.randomBytes(16)

		const { email, fullName, attachment } = this.getEncryptedValues(params, iv)

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
			.catch((error: any) => error)
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	private static getEncryptedValues(params: Payload, iv: any): Payload {
		let { email, fullName, attachment } = params

		if (email && fullName) {
			const encEmail = Encrypt(email, iv)
			const encFullName = Encrypt(fullName, iv)

			if (attachment) {
				const encAttachment = Encrypt(attachment, iv)
				attachment = encAttachment.content
			}

			email = encEmail.content
			fullName = encFullName.content
		}

		return { email, fullName, attachment }
	}
}
