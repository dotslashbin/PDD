import { prop } from '@typegoose/typegoose'
/**
 * Data model definitions with validation.
 *
 * This is implementing typegoose
 */

export class PersonalData {
	@prop({
		required: [true, 'Email is required'],
	})
	email!: string

	@prop({ required: [true, 'Full Name is required'] })
	fullName!: string

	@prop()
	attachment!: string

	@prop()
	iv!: string
}
