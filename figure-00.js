const chromafi = require('.')

const obj = {foobar: 1337, 'baz-qux': function (a, b) {return 'Wombat!'}}

const options = {
	lineNumberPad: 1,
	codePad: 1,
	indent: 2,
	lineNumbers: true,
	colors: {
		line_numbers: chalk.grey
	}
}

chromatastic = chromafi(obj, options)

console.log(chromatastic)
