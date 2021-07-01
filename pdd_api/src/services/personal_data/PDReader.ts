import { getModelForClass } from '@typegoose/typegoose'
import { PersonalData } from '../../models/PersonalData'
import { DBReader } from '../../structures/interfaces'
import { PDQueryPayload } from '../../structures/types'
import TokenValidator from '../auth/TokenValidator'

export default class PDReader {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static Fetch(params: PDQueryPayload, db: DBReader): Promise<any> {
		const { token, secretKey } = params

		const model = getModelForClass(PersonalData)

		const result = TokenValidator.Decode(token, secretKey)

		return (
			db
				.Fetch(result.recordId, model)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.then((result: any) => {
					console.log(result)

					return result
				})
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.catch((error: any) => error)
		)
	}
}
