const hljs = require('highlight.js')
const cheerio = require('cheerio')
const chalk = require('chalk')
const stripAnsi = require('strip-ansi')
const merge = require('deepmerge')

const darkPalette = {
	base: chalk.white,
	keyword: chalk.red,
	comment: chalk.white.dim,
	symbol: chalk.cyan,
	meta: chalk.cyan,
	number: chalk.green,
	function: chalk.white,
	title: chalk.green,
	params: chalk.blue,
	string: chalk.yellow,
	// eslint-disable-next-line camelcase
	built_in: chalk.blue,
	literal: chalk.magenta,
	attr: chalk.yellow,
	// eslint-disable-next-line camelcase
	attr_string: chalk.cyan,
	// eslint-disable-next-line camelcase
	trailing_space: chalk,
	regexp: chalk.magenta,
	// eslint-disable-next-line camelcase
	line_numbers: chalk.grey
}

const filter = (node, opts) => {
	let color
	let text
	let childText

	if (node.type === 'text') {
		text = node.data
		return text
	}

	if (node.name === 'span' && node.type === 'tag') {
		color = node.attribs.class.split('-')[1].toLowerCase()
	}

	if (node.childNodes && node.childNodes.length > 0) {
		childText = node.childNodes.map(childNode => filter(childNode, opts)).join('')

		if (typeof color === 'string') {
			return opts.colors[color](childText)
		}

		return childText
	}

	return ''
}

const maxLength = text => {
	const lines = text.split('\n')
	let max = 0
	lines.forEach(line => {
		line = stripAnsi(line)
		if (line.length > max) {
			max = line.length
		}
	})
	return max
}

const padLine = (line, padding) => String()
	.padStart(padding, ' ') + line + String().padEnd(padding, ' ')

const syntaxHlStr = (lang, script, opts) => {
	let output = ''

	script = script.replace('\t', '    ')
	const code = hljs.highlight(lang, script).value
	const lines = code.split('\n')

	lines.forEach((line, lineNumber) => {
		const html = `<code>${line}</code>`
		const $body = cheerio.load(html).root().find('code')[0]
		const text = filter($body, opts)
		output += text
		if (lineNumber !== lines.length - 1) {
			output += '\n'
		}
	})

	return output
}

const syntaxHlJson = (json, opts) => {
	json = JSON.stringify(json, (key, val) => {
		if (val instanceof Function) {
			return `[FUNCTION]${String(val)}[FUNCTION]`
		}
		return val
	}, opts.indent)

	try {
		const highlighted = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, match => {
			let colorClass = 'number'

			// eslint-disable-next-line unicorn/prefer-starts-ends-with
			if (/^"/.test(match)) {
				// eslint-disable-next-line unicorn/prefer-starts-ends-with
				if (/:$/.test(match)) {
					if (match.includes('-')) {
						colorClass = 'attr_string'
						match = match.replace(/"/g, '\'')
					} else {
						colorClass = 'attr'
						match = match.replace(/"/g, '')
					}
				} else {
					colorClass = 'string'

					match = match.replace(/"/g, '\'')
						.replace(/\\n/g, '\n')
						.replace(/\\t/g, String().padStart(opts.indent, ' '))

					if (match.substr(1, 10) === '[FUNCTION]' &&
						match.substr(match.length - 11, 10) === '[FUNCTION]') {
						match = match.substr(11, match.length - 22)
						match = syntaxHlStr('javascript', match, opts)
						colorClass = 'function'
					}
				}
			} else if (/true|false/.test(match)) {
				colorClass = 'literal'
			} else if (/null/.test(match)) {
				colorClass = 'literal'
			}

			return opts.colors[colorClass](match)
		})

		return highlighted
	} catch (err) {
		throw (err)
	}
}

const bgLineNos = (text, opts) => {
	let output = ''

	const lines = text.split('\n')
	const max = maxLength(text)

	lines.forEach((line, lineNumber) => {
		let lineOutput = ''

		if (opts.lineNumbers) {
			const lineNum = opts.colors.line_numbers(
				padLine(
					String(lineNumber + 1)
						.padStart(String(lines.length + 1).length, ' '),
					opts.lineNumberPad
				)
			)
			lineOutput += lineNum
		}

		const plain = stripAnsi(line)
		const padToEnd = String().padEnd(max - plain.length, ' ')
		const runLengthLine = line + opts.colors.trailing_space(padToEnd)
		const paddedLine = padLine(runLengthLine, opts.codePad)
		lineOutput += paddedLine

		output += lineOutput + '\n'
	})

	return opts.colors.base(output)
}

const tabToSpaceIndent = (str, opts) => str.replace(/\t/g, String().padStart(opts.indent, ' '))

const procOpts = (opts = {}) => {
	let options = {
		lineNumbers: true,
		lang: 'javascript',
		lineNumberPad: 1,
		codePad: 1,
		indent: 4,
		colors: darkPalette
	}

	if (opts) {
		options = merge(options, opts)
	}

	return options
}

const chromafi = (monocrime, opts) => {
	opts = procOpts(opts)

	if (typeof monocrime === 'function') {
		const fnStr = tabToSpaceIndent(String(monocrime), opts)
		const colorized = syntaxHlStr(opts.lang, fnStr, opts)
		return bgLineNos(colorized, opts)
	}

	if (typeof monocrime === 'string') {
		const script = tabToSpaceIndent(monocrime, opts)
		const colorized = syntaxHlStr(opts.lang, script, opts)
		return bgLineNos(colorized, opts)
	}

	if (typeof monocrime === 'object') {
		const colorized = syntaxHlJson(monocrime, opts)
		return bgLineNos(colorized, opts)
	}
}

module.exports = chromafi
