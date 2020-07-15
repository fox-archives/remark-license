import remark from 'remark'

interface Plugin {
	fn: Function
	options: Record<string, any>
}
export async function doRemark(input: string, plugins: Plugin[]) {
	let result = remark()
	for (const plugin of plugins) {
		result = result().use(plugin.fn, plugin.options)
	}
	return await result.process(input)
}
