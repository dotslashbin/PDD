import { prop } from '@typegoose/typegoose'

/**
 * Data model definitions with validation.
 *
 * This is implementing typegoose
 */
export class Blacklist {
	@prop({ required: true })
	token!: string
}
