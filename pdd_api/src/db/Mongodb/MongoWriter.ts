import { Payload } from '../../structures/types'
import { DBWriter } from '../../structures/interfaces'
import DBCore from '../DBCore'

export default class MongoWriter extends DBCore implements DBWriter {
	Save(params: Payload): any {
		console.log('call ogno', params)
	}
}
