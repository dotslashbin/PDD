import { Request, Response } from 'express'
export async function Fetch(
	request: Request,
	response: Response
): Promise<void> {
	const { token } = request.query
	console.log(token)

	response.status(200)
	response.json(token)
}
