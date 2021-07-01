import { getModelForClass } from '@typegoose/typegoose'
import { DEFAULT_IV } from '../../config/app'
import { Decrypt } from '../../helpers/Utilities'
import { PersonalData } from '../../models/PersonalData'
import { DBReader } from '../../structures/interfaces'
import { Hash, PDQueryPayload } from '../../structures/types'
import TokenValidator from '../auth/TokenValidator'

export default class PDReader {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static Fetch(params: PDQueryPayload, db: DBReader): Promise<any> {
		const { token, secretKey } = params
		const model = getModelForClass(PersonalData)
		const decodedToken = TokenValidator.Decode(token, secretKey)

		if (decodedToken.type === 'valid') {
			return (
				db
					.Fetch(decodedToken.session.recordId, model)
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
		} else {
			// TODO: do something with invalid token
			console.log('you are here')
			return decodedToken
		}
	}
}
