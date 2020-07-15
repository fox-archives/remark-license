import path from 'path'
import assert from 'assert'

interface IRemarkLicense {
	spdxId: string
}

export default function checkTitle(options: IRemarkLicense) {
	return function checkTitleTransformer(ast: any, file: any) {
		const licenseHeading = {
			type: 'heading',
			depth: 2,
			children: [
				{
					type: 'text',
					value: 'License',
				},
			],
		}
		const licenseText = {
			type: 'text',
			value: `Licensed under ${options.spdxId}`,
		}

		for (let i = 0; i < ast.children.length; ++i) {
			const node = ast.children[i]
			// if the first element is not a heading, add it
			if (
				ast.children[i].type === 'heading' &&
				ast.children[i].children[0].value === 'License'
			) {
				ast.children[i + 1] = licenseText
				return
			}
		}

		ast.children.unshift(licenseText)
		ast.children.unshift(licenseHeading)
	}
}
