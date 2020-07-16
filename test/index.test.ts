import remark from 'remark'
import remarkLicense from '../src'

interface Plugin {
	fn: Function
	options: Record<string, any>
}

async function doRemark(input: string, plugins: Plugin[]) {
	let result = remark()
	for (const plugin of plugins) {
		result = result().use(plugin.fn, plugin.options)
	}
	return await result.process(input)
}

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
		expect(vfile.contents).toBe(output)
	})

	/**
	 * @description note that it is not the responsibility of this
	 * plugin to check that identifiers are valid
	 */
	test('it works with different spdx id', async () => {
		const input = '# Heading\n## License\n\nSome text here'
		const output = '# Heading\n\n## License\n\nLicensed under iinvalid\n'

		const vfile = await doRemark(input, [
			{
				fn: remarkLicense,
				options: {
					spdxId: 'iinvalid',
				},
			},
		])
		expect(vfile.contents).toBe(output)
	})
})
