import express from 'express'
import { VERSION } from '../config/app'
import { Create } from '../handlers/POST'

/**
 * Route definitions with references to handlers
 */
export default ({ app }: { app: express.Application }): void => {
	// Index -> shows version
	app.get('/', (request, response) => {
		response.status(200)
		response.json({ body: request.body, version: VERSION })
	})

	app.post('/personal-data', express.json(), Create)
}
