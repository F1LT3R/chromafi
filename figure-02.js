const chromafi = require('.')

function add (a, b) {
	return a + b
}
const chromatastic = chromafi(add)

// eslint-disable-next-line no-console
console.log(chromatastic)
