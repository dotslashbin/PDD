import { DBReader } from '../../structures/interfaces'
import DBCore from '../DBCore'

export class MongoReader extends DBCore implements DBReader {
	Fetch(id: string, model: any): any {
		try {
			return model.findById(id)
		} catch (error) {
			console.error(error)
		}
	}
}
