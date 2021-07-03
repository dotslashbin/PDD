/**
 * Returns an array of messages for the alert
 * @param input
 * @returns
 */
export const GetMessagesArray = (input: string): string[] => {
	input = input.replace('PersonalData validation failed:', '')
	const container = input.split(',')

	if (container.length > 1) {
		// This means that there  is a possible array
		return container.map((message) => message.split(':')[1])
	}

	return [input]
}
