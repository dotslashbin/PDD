import { getModelForClass } from '@typegoose/typegoose'
import { Blacklist } from '../../models/Blacklist'
import { DBWriter } from '../../structures/interfaces'

export default class Blacklister {
	static AddToList(token: string, db: DBWriter): void {
		const model = getModelForClass(Blacklist)

		return db.Save({ token }, model).catch((error: any) => {
			console.error(error)
		})
	}
}
