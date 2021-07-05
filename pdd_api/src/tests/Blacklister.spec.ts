import chai from 'chai'
import 'mocha'
const expect = chai.expect

const testFunc = (): string => {
	return 'xxx'
}

describe('something...', () => {
	it('Should return xxx', () => {
		expect(testFunc()).equal('xxx')
	})
})
