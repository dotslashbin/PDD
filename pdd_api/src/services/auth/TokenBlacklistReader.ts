import { getModelForClass } from '@typegoose/typegoose'
import { Blacklist } from '../../models/Blacklist'
import { DBReader } from '../../structures/interfaces'

export default class TokenBlacklistReader {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static IsBlacklistedToken(token: string, db: DBReader): boolean | any {
		const model = getModelForClass(Blacklist)

		return db
			.Search({ token }, model)
			.then((result: any) => (result.length > 0 ? true : false))
			.catch((error: any) => error)
	}
}
