import { prop } from '@typegoose/typegoose'

/**
 * Data model definitions with validation.
 *
 * This is implementing typegoose
 */

export class PersonalData {
	@prop({ required: true })
	email!: string

	@prop({ required: true })
	name!: string
}
