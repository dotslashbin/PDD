import { Request, Response } from 'express'
import { ReturnError, ReturnSuccess } from '../helpers/Response'
import { MongoReader } from '../db/Mongodb/MongoReader'
import PDReader from '../services/personal_data/PDReader'
export async function Fetch(
	request: Request,
	response: Response
): Promise<void> {
	const { token, secretKey } = request.query
	const db = new MongoReader()
	const result = await PDReader.Fetch({ token, secretKey }, db)

	if (result.errors) {
		ReturnError(401, response, result.errors, 'Your token is no longer active.')
	} else {
		ReturnSuccess(200, response, 'fetch', result, 'Successfully fetched record.')
	}
}
