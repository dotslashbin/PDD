import { Request, Response } from 'express'
import PDWriter from '../services/personal_data/PDWriter'
import { ReturnSuccess } from '../helpers/Response'
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
	ReturnSuccess(201, response, 'create', result, 'do this')
}
