import { SearchPayload } from '../../structures/types'
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

	Search(params: SearchPayload, model: any): any {
		const { key, value } = params

		try {
			return model.find({ key: value })
		} catch (error) {
			console.error(error)
		}
	}
}
