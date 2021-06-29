import { Payload } from '../../structures/types'
import { DBWriter } from '../../structures/interfaces'
import DBCore from '../DBCore'

import { getModelForClass } from '@typegoose/typegoose'
import { PersonalData } from '../../models/PersonalData'

export default class MongoWriter extends DBCore implements DBWriter {
	Save(params: Payload): any {
		const model = getModelForClass(PersonalData)
		try {
			return model.create(params)
		} catch (error) {
			console.error(error)
		}
	}
}
