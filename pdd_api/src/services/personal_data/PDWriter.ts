import { DBWriter } from '../../structures/interfaces'
import { PDDataPayload } from '../../structures/types'
import { getModelForClass } from '@typegoose/typegoose'
import { PersonalData } from '../../models/PersonalData'
import {
	Encrypt,
	GenerateSecretKey,
	GetExpiryTimestamp,
} from '../../helpers/Utilities'
import TokenGenerator from '../auth/TokenGenerator'
import { DEFAULT_IV } from '../../config/app'

export default class PDWriter {
	/**
	 * Executes the process of creating a record
	 * @param params
	 * @param db
	 * @returns
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static Create(params: PDDataPayload, db: DBWriter): Promise<any> {
		const model = getModelForClass(PersonalData)
		const iv = DEFAULT_IV

		/**
		 * Generating the secret to be used for the encryption and generating the token
		 */
		const secretKey = GenerateSecretKey()
		const { email, fullName } = this.getEncryptedValues(params, iv, secretKey)

		const { expiry } = params
		const { attachment } = params
		const timestampWithAddedMintues = GetExpiryTimestamp(expiry)

		model.updateOne

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
				const session = TokenGenerator.Generate(
					result._id,
					!expiry ? 0 : timestampWithAddedMintues,
					secretKey
				)
				return { personal_data: result, session, secretKey }
			})
			.catch((error: any) => error)
	}

	/**
	 * Responsible for encypting the fields for the data to be saved
	 * @param params
	 * @param iv
	 * @param secretKey
	 * @returns
	 */
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	private static getEncryptedValues(
		params: PDDataPayload,
		iv: any,
		secretKey: string
	): { email: string; fullName: string } {
		let { email, fullName } = params

		if (email && fullName) {
			const encEmail = Encrypt(email, iv, secretKey)
			const encFullName = Encrypt(fullName, iv, secretKey)

			email = encEmail.content
			fullName = encFullName.content
		}

		return { email, fullName }
	}
}
