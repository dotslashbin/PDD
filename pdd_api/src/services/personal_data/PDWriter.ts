import { DBWriter } from '../../structures/interfaces'
import { Payload } from '../../structures/types'
import { getModelForClass } from '@typegoose/typegoose'
import { PersonalData } from '../../models/PersonalData'
export default class PDWriter {
	static async Create(params: Payload, db: DBWriter): Promise<any> {
		try {
			const model = getModelForClass(PersonalData)
			const result = db.Save(params, model)

			return result
		} catch (error) {
			return error
		}
	}
}
