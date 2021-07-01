import { Request, Response } from 'express'
import { MongoReader } from '../db/Mongodb/MongoReader'
import PDReader from '../services/personal_data/PDReader'
export async function Fetch(
	request: Request,
	response: Response
): Promise<void> {
	const { token, secretKey } = request.query
	const db = new MongoReader()
	await PDReader.Fetch({ token, secretKey }, db)
	response.status(200)
	response.json(token)
}
