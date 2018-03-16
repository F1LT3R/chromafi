const hljs = require('highlight.js')
const cheerio = require('cheerio')
const chalk = require('chalk')
const stripAnsi = require('strip-ansi')

const DARK_COLORS = {
	BASE: ['white'],
	KEYWORD: ['red'],
	COMMENT: ['gray', 'dim'],
	SYMBOL: ['cyan'],
	META: ['cyan'],
	NUMBER: ['green'],
	FUNCTION: ['white'],
	TITLE: ['green'],
	PARAMS: ['blue'],
	STRING: ['yellow'],
	BUILT_IN: ['blue'],
	LITERAL: ['magenta'],
	ATTR: ['yellow'],
	ATTR_STRING: ['cyan'],
	TRAILING_SPACE: [],
	REGEXP: ['magenta'],
	LINE_NUMBERS: ['gray', 'dim']
}

// Light Colors
// const LIGHT_COLORS = {
// 	BASE: ['bgWhite', 'black', 'bold'],
// 	KEYWORD: ['red'],
// 	NUMBER: ['blue'],
// 	FUNCTION: ['black'],
// 	TITLE: ['blue'],
// 	PARAMS: ['black'],
// 	STRING: ['black'],
// 	BUILT_IN: ['magenta'],
// 	LITERAL: ['blue'],
// 	ATTR: ['black'],
// 	TRAILING_SPACE: [],
// 	REGEXP: ['blue'],
// 	LINE_NUMBERS: ['bgBlue', 'white']
// }

const chalkify = styleAry => {
	if (!styleAry) {
		return chalk.reset
	}

	let style = chalk

	styleAry.forEach(prop => {
		style = style[prop]
	})

	return style
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
		color = node.attribs.class.split('-')[1].toUpperCase()
	}

	if (node.childNodes && node.childNodes.length > 0) {
		childText = node.childNodes.map(childNode => filter(childNode, opts)).join('')

		if (typeof color === 'string') {
			return chalkify(opts.colors[color])(childText)
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

	lines.forEach(line => {
		const html = `<code>${line}</code>`
		const $body = cheerio.load(html).root().find('code')[0]
		const text = filter($body, opts)
		output += text + '\n'
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
		// json = json
			// .replace(/&/g, '&amp')
			// .replace(/</g, '&lt')
			// .replace(/>/g, '&gt')

		const highlighted = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, match => {
			let colorClass = 'NUMBER'

			// eslint-disable-next-line unicorn/prefer-starts-ends-with
			if (/^"/.test(match)) {
				// eslint-disable-next-line unicorn/prefer-starts-ends-with
				if (/:$/.test(match)) {
					if (match.includes('-')) {
						colorClass = 'ATTR_STRING'
						match = match.replace(/"/g, '\'')
					} else {
						colorClass = 'ATTR'
						match = match.replace(/"/g, '')
					}
				} else {
					colorClass = 'STRING'

					match = match.replace(/"/g, '\'')
						.replace(/\\n/g, '\n')
						.replace(/\\t/g, String().padStart(opts.indent, ' '))

					if (match.substr(1, 10) === '[FUNCTION]' &&
						match.substr(match.length - 11, 10) === '[FUNCTION]') {
						match = match.substr(11, match.length - 22)
						match = syntaxHlStr('javascript', match, opts)
						colorClass = 'FUNCTION'
					}
				}
			} else if (/true|false/.test(match)) {
				colorClass = 'LITERAL'
			} else if (/null/.test(match)) {
				colorClass = 'LITERAL'
			}

			const styleAry = opts.colors[colorClass]
			const style = chalkify(styleAry)
			return style(match)
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
		const plain = stripAnsi(line)
		const padToEnd = String().padEnd(max - plain.length, ' ')
		const runLengthLine = line + chalkify(opts.colors.TRAILING_SPACE)(padToEnd)
		const paddedLine = padLine(runLengthLine, opts.codePad)

		const lineNum = chalkify(opts.colors.LINE_NUMBERS)(
			padLine(
				String(lineNumber + 1)
					.padStart(String(lines.length + 1).length, ' '),
				opts.lineNumberPad
			)
		)

		output += lineNum + paddedLine + '\n'
	})

	return chalkify(opts.colors.BASE)(output)
}

const tabToSpaceIndent = (str, opts) => str.replace(/\t/g, String().padStart(opts.indent, ' '))

const procOpts = (opts = {}) => {
	const options = {
		lang: 'javascript',
		lineNumberPad: 1,
		codePad: 1,
		indent: 4,
		colors: DARK_COLORS
	}

	Reflect.ownKeys(opts).forEach(option => {
		const val = opts[option]
		if (Reflect.has(options, option)) {
			options[option] = val
		}
	})

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
