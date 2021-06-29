import { DBWriter } from '../../structures/interfaces'
import { Payload } from '../../structures/types'

export default class PDWriter {
	static async Create(params: Payload, db: DBWriter): Promise<any> {
		try {
			const result = db.Save(params)

			return result
		} catch (error) {
			return error
		}
	}
}
