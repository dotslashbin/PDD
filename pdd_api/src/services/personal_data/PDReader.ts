import { getModelForClass } from '@typegoose/typegoose'
import { DEFAULT_IV } from '../../config/app'
import { Decrypt } from '../../helpers/Utilities'
import { PersonalData } from '../../models/PersonalData'
import { DBReader } from '../../structures/interfaces'
import { Hash, PDQueryPayload } from '../../structures/types'
export default class PDReader {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static Fetch(
		params: PDQueryPayload,
		db: DBReader
	): Promise<any> | { errors: string } {
		const { recordId, secretKey } = params
		const model = getModelForClass(PersonalData)

		return (
			db
				.Fetch(recordId, model)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.then((result: any) => {
					const emailHash: Hash = {
						content: result.email.toString(),
						iv: DEFAULT_IV,
					}

					const fullNameHash: Hash = {
						content: result.fullName.toString(),
						iv: DEFAULT_IV,
					}

					const attachmentHash: Hash = {
						content: result.attachment.toString(),
						iv: DEFAULT_IV,
					}

					const email = Decrypt(emailHash, secretKey)
					const fullName = Decrypt(fullNameHash, secretKey)
					const attachment = Decrypt(attachmentHash, secretKey)

					return { email, fullName, attachment }
				})
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.catch((error: any) => error)
		)
	}
}
