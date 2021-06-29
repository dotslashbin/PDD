import _ from 'lodash'

const dafunc = (): void => {
	const out = _.join(['hello', 'wepback'], 'XX')

	console.log(out)
}

const lonelyInteger = (collection: number[]): number[] => {
	const result: number[] = []

	for (let i = 0; i < collection.length; i++) {
		const currentInt = collection[i]
		let hasDup = false
		for(let k = 0; k < collection.length; k++) {
			if(k != i) {
				if(currentInt === collection[k]) {
					hasDup = true
				}
			}
		}

		if(!hasDup) {
			result.push(currentInt)
		}
	}
	

	return result
}

const whatXOR = (): void => {
	const x = 10 
	const y = 15

	const result  = x ^ y
	console.log(result)
}

dafunc()
const lonely = lonelyInteger([1, 2, 3, 4, 3, 2, 1, 4, 23, 44,55,11,2, 66, 55, 44])
console.log(lonely)

whatXOR()
