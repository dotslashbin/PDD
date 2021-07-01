import { Request, Response } from 'express'
import PDWriter from '../services/personal_data/PDWriter'
import { ReturnError, ReturnSuccess } from '../helpers/Response'
import MongoWriter from '../db/Mongodb/MongoWriter'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function Create(
	request: Request,
	response: Response
): Promise<void> {
	const { email, fullName, attachment, expiry } = request.body
	const db = new MongoWriter()
	const result = await PDWriter.Create(
		{ email, fullName, attachment, expiry },
		db
	)

	if (result.errors) {
		ReturnError(422, response, result.errors, result.message)
	} else {
		ReturnSuccess(
			201,
			response,
			'create',
			result,
			'Successfully saved a new record'
		)
	}
}
