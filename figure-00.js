const chromafi = require('.')

const obj = {foobar: 1337, 'baz-quz': function (a, b) { return 'Wombat!'}}

const options = {
	lineNumberPad: 1,
	codePad: 1,
	indent: 2,
	lineNumbers: true,
	colors: {
		LINE_NUMBERS: ['reset', 'gray']
	}
}

chromatastic = chromafi(obj, options)

console.log(chromatastic)
