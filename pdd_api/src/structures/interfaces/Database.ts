/**
 * This file contains the the interface definitions
 * for the database classes
 */
export interface DBConnector {
	Connect(): void
}

export interface DBWriter extends DBConnector {
	Save(params: any, model: any): any
}

// export interface DBReader {
// 	FetchOne(params: any): any
// 	Fetch(params: any): any
// }
