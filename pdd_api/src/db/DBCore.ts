import { DBConnector } from '../structures/interfaces'

/**
 * Abstract class that lays the foundation of a "Database core".
 * This is meant to be used as any database class to be created,
 * which gives possiblity to have multiple database sources under
 * one interface
 */
export default abstract class DBCore implements DBConnector {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	Connect() {
		return
	}
}
