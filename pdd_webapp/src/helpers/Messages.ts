export const GetMessagesArray = (input: string): string[] => {
	input = input.replace('PersonalData validation failed:', '')
	const container = input.split(',').map((message) => message.split(':')[1])
	
	return container
}
