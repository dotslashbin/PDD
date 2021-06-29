import expressLoader from './routes'
import cors from 'cors'
import helmet from 'helmet'

/**
 * A function that loads the middlewares for express AND express itself
 * @param expressApp
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function (expressApp: any): Promise<any> {
	expressApp.use(cors())
	expressApp.use(helmet())

	// Express
	await expressLoader({ app: expressApp })
}
