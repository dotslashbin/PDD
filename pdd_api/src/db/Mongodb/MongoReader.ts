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

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	Search(params: any, model: any): any {
		try {
			return model.find(params)
		} catch (error) {
			console.error(error)
		}
	}
}
