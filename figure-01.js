const chromafi = require('.')

const obj = {
	foo: 'bar',
	baz: 1337,
	qux: true,
	zxc: null,
	// eslint-disable-next-line object-shorthand
	'foogle-bork': function (a, b) {
		return b - a
	}
}

const chromatastic = chromafi(obj)

// eslint-disable-next-line no-console
console.log(chromatastic)
