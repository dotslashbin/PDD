import { DBWriter } from '../../structures/interfaces'
import { Payload } from '../../structures/types'
import { getModelForClass } from '@typegoose/typegoose'
import { PersonalData } from '../../models/PersonalData'
import { Encrypt } from '../../helpers/Utilities'
import crypto from 'crypto'

export default class PDWriter {
	static async Create(params: Payload, db: DBWriter): Promise<any> {
		try {
			const model = getModelForClass(PersonalData)

			const { email, fullName, attachment } = params

			const iv = crypto.randomBytes(16)

			const encEmail = Encrypt(email, iv)
			const encFullName = Encrypt(fullName, iv)

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			return db.Save(
				{
					email: encEmail.content,
					fullName: encFullName.content,
					attachment,
					iv: encEmail.iv,
				},
				model
			)
		} catch (error) {
			return error
		}
	}
}
