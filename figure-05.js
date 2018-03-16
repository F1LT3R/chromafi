const chromafi = require('.')

const obj = {
	foo: 'bar',
	baz: 1337,
	qux: true,
	zxc: null,
	'foogle-bork': function (a, b) {
		return b - a
	}
}

const chromatastic = chromafi(obj, {
	colors: {
		BASE: ['bgWhite', 'black', 'bold'],
		KEYWORD: ['red'],
		NUMBER: ['blue', 'dim'],
		FUNCTION: ['black'],
		TITLE: ['blue'],
		PARAMS: ['black'],
		STRING: ['black'],
		BUILT_IN: ['magenta'],
		LITERAL: ['blue'],
		ATTR: ['black'],
		TRAILING_SPACE: [],
		REGEXP: ['blue'],
		LINE_NUMBERS: ['bgBlue', 'white']
	}
})

console.log(chromatastic)
