import remarkLicense from '../src'
import { doRemark } from './test.util'

const plugins = [
	{
		fn: remarkLicense,
		options: {
			spdxId: 'Apache-2.0',
		},
	},
]

describe('testing the license entry by itself', () => {
	test('it works on empty', async () => {
		const input = ''
		const output = '## License\n\nLicensed under Apache-2.0\n'

		const vfile = await doRemark(input, plugins)
		expect(vfile.contents).toBe(output)
	})

	test('it works with license heading', async () => {
		const input = '## License'
		const output = '## License\n\nLicensed under Apache-2.0\n'

		const vfile = await doRemark(input, plugins)
		expect(vfile.contents).toBe(output)
	})

	test('it works with license heading and text', async () => {
		const input = '## License\n\nSome text here'
		const output = '## License\n\nLicensed under Apache-2.0\n'

		const vfile = await doRemark(input, plugins)
		expect(vfile.contents).toBe(output)
	})
})

describe('testing with other headings and content', () => {
	test('it works with license heading and text', async () => {
		const input = '# Heading\n## License\n\nSome text here'
		const output = '# Heading\n\n## License\n\nLicensed under Apache-2.0\n'

		const vfile = await doRemark(input, plugins)
		return expect(vfile.contents).toBe(output)
	})
})
