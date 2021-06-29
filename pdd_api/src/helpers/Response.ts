import { Response } from 'express'
/**
 * Wrapper for successful response
 * @param status
 * @param response
 * @param data
 */
export const ReturnSuccess = (
	status: number,
	response: Response,
	endPointName: string,
	data: any,
	message: string
): void => {
	const returnFormat = {
		data,
		status,
		endPointName,
		message,
	}

	response.status(status)
	response.json(returnFormat)
}
