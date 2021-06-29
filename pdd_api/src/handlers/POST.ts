import { Request, Response } from 'express'
import { ReturnSuccess } from '../helpers/Response'

export async function Create(
	request: Request,
	response: Response
): Promise<void> {
	ReturnSuccess(200, response, 'create', request.body, 'do this')
}
