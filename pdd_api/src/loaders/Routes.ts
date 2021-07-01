import express from 'express'
import { VERSION } from '../config/app'
import { Create, Fetch } from '../handlers'

/**
 * Route definitions with references to handlers
 */
export default ({ app }: { app: express.Application }): void => {
	// Index -> shows version
	app.get('/', (request, response) => {
		response.status(200)
		response.json({ body: request.body, version: VERSION })
	})

	app.get('/personal-data', express.urlencoded({ extended: true }), Fetch)
	app.post('/personal-data', express.json({ limit: '500kb' }), Create)
}
