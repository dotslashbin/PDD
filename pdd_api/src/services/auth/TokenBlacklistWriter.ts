import { getModelForClass } from '@typegoose/typegoose'
import { Blacklist } from '../../models/Blacklist'
import { DBWriter } from '../../structures/interfaces'

/**
 * Class that is responssible for writing a token into the blacklist
 */
export default class TokenBlackListWriter {
	static AddToList(token: string, db: DBWriter): void {
		const model = getModelForClass(Blacklist)

		return db.Save({ token }, model).catch((error: any) => {
			console.error(error)
		})
	}
}
