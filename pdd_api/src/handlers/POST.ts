import { Request, Response } from 'express'
import PDWriter from '../services/personal_data/PDWriter'
import { ReturnSuccess } from '../helpers/Response'
import MongoWriter from '../db/Mongodb/MongoWriter'

export async function Create(
	request: Request,
	response: Response
): Promise<void> {
	const { email, name } = request.body
	const db = new MongoWriter()
	const result = await PDWriter.Create({ email, name }, db)
	ReturnSuccess(201, response, 'create', result, 'do this')
}
