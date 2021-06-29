import { DBWriter } from '../../structures/interfaces'
import { Payload } from '../../structures/types'
import { getModelForClass } from '@typegoose/typegoose'
import { PersonalData } from '../../models/PersonalData'
export default class PDWriter {
	static async Create(params: Payload, db: DBWriter): Promise<any> {
		try {
			const model = getModelForClass(PersonalData)
			return db.Save(params, model)
		} catch (error) {
			return error
		}
	}
}
