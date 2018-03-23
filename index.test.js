import test from 'ava'
import chalk from 'chalk'
import chromafi from '.'

// Encode: get escaped, testable string of correct result
// const encode = result => {
// 	const json = JSON.stringify(result)
// 	console.log(json.replace(/\'/g, '\\\''))
// }

test('JavaScript function', t => {
	function add (a, b) {
		return a + b
	}

	const result = chromafi(add)
	t.is(typeof result, 'string')
	// eslint-disable-next-line unicorn/escape-case
	t.is(result, '\u001b[37m\u001b[90m 1 \u001b[37m \u001b[37m\u001b[31mfunction\u001b[37m \u001b[32madd\u001b[37m(\u001b[34ma, b\u001b[37m) \u001b[37m{  \u001b[39m\n\u001b[37m\u001b[90m 2 \u001b[37m         \u001b[31mreturn\u001b[37m a + b; \u001b[39m\n\u001b[37m\u001b[90m 3 \u001b[37m     }                 \u001b[39m\n\u001b[37m\u001b[39m')
})

test('JavaScript object', t => {
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

	const result = chromafi(obj)
	t.is(typeof result, 'string')
	// eslint-disable-next-line unicorn/escape-case
	t.is(result, '\u001b[37m\u001b[90m  1 \u001b[37m {                                    \u001b[39m\n\u001b[37m\u001b[90m  2 \u001b[37m     \u001b[33mfoo:\u001b[37m \u001b[33m\'bar\'\u001b[37m,                      \u001b[39m\n\u001b[37m\u001b[90m  3 \u001b[37m     \u001b[33mbaz:\u001b[37m \u001b[32m1337\u001b[37m,                       \u001b[39m\n\u001b[37m\u001b[90m  4 \u001b[37m     \u001b[33mqux:\u001b[37m \u001b[35mtrue\u001b[37m,                       \u001b[39m\n\u001b[37m\u001b[90m  5 \u001b[37m     \u001b[33mzxc:\u001b[37m \u001b[35mnull\u001b[37m,                       \u001b[39m\n\u001b[37m\u001b[90m  6 \u001b[37m     \u001b[36m\'foogle-bork\':\u001b[37m \u001b[37m\u001b[37m\u001b[31mfunction\u001b[37m (\u001b[34ma, b\u001b[37m) \u001b[37m{\u001b[37m \u001b[39m\n\u001b[37m\u001b[90m  7 \u001b[37m \u001b[37m            \u001b[31mreturn\u001b[37m b - a;\u001b[37m            \u001b[39m\n\u001b[37m\u001b[90m  8 \u001b[37m \u001b[37m        }\u001b[37m                            \u001b[39m\n\u001b[37m\u001b[90m  9 \u001b[37m }                                    \u001b[39m\n\u001b[37m\u001b[39m')
})

test('JavaScript code string', t => {
	const code = `
	const a = 2
	function abc = (d, e, f) { return 'foo' }
	const b = 2
	const c = (a, b) => {
		return b - a
	}

	var str = "Hello, world!"

	console.log(true, null, new Date())

	const jsObj = {
		foo: 'bar',
		baz: 1337,
		qux: true,
		'test-thing': 'cool',
		zxc: null,
		spqr: function (a, b) {
			return b - a
		}
	}
	`

	const result = chromafi(code)
	t.is(typeof result, 'string')
	// eslint-disable-next-line unicorn/escape-case
	t.is(result, '\u001b[37m\u001b[90m  1 \u001b[37m                                               \u001b[39m\n\u001b[37m\u001b[90m  2 \u001b[37m     \u001b[31mconst\u001b[37m a = \u001b[32m2\u001b[37m                               \u001b[39m\n\u001b[37m\u001b[90m  3 \u001b[37m     \u001b[37m\u001b[31mfunction\u001b[37m \u001b[32mabc\u001b[37m = (\u001b[34md, e, f\u001b[37m) \u001b[37m{ \u001b[31mreturn\u001b[37m \u001b[33m\'foo\'\u001b[37m } \u001b[39m\n\u001b[37m\u001b[90m  4 \u001b[37m     \u001b[31mconst\u001b[37m b = \u001b[32m2\u001b[37m                               \u001b[39m\n\u001b[37m\u001b[90m  5 \u001b[37m     \u001b[31mconst\u001b[37m c = \u001b[37m(\u001b[34ma, b\u001b[37m) =>\u001b[37m {                     \u001b[39m\n\u001b[37m\u001b[90m  6 \u001b[37m         \u001b[31mreturn\u001b[37m b - a                          \u001b[39m\n\u001b[37m\u001b[90m  7 \u001b[37m     }                                         \u001b[39m\n\u001b[37m\u001b[90m  8 \u001b[37m                                               \u001b[39m\n\u001b[37m\u001b[90m  9 \u001b[37m     \u001b[31mvar\u001b[37m str = \u001b[33m"Hello, world!"\u001b[37m                 \u001b[39m\n\u001b[37m\u001b[90m 10 \u001b[37m                                               \u001b[39m\n\u001b[37m\u001b[90m 11 \u001b[37m     \u001b[34mconsole\u001b[37m.log(\u001b[35mtrue\u001b[37m, \u001b[35mnull\u001b[37m, \u001b[31mnew\u001b[37m \u001b[34mDate\u001b[37m())       \u001b[39m\n\u001b[37m\u001b[90m 12 \u001b[37m                                               \u001b[39m\n\u001b[37m\u001b[90m 13 \u001b[37m     \u001b[31mconst\u001b[37m jsObj = {                           \u001b[39m\n\u001b[37m\u001b[90m 14 \u001b[37m         \u001b[33mfoo\u001b[37m: \u001b[33m\'bar\'\u001b[37m,                           \u001b[39m\n\u001b[37m\u001b[90m 15 \u001b[37m         \u001b[33mbaz\u001b[37m: \u001b[32m1337\u001b[37m,                            \u001b[39m\n\u001b[37m\u001b[90m 16 \u001b[37m         \u001b[33mqux\u001b[37m: \u001b[35mtrue\u001b[37m,                            \u001b[39m\n\u001b[37m\u001b[90m 17 \u001b[37m         \u001b[33m\'test-thing\'\u001b[37m: \u001b[33m\'cool\'\u001b[37m,                 \u001b[39m\n\u001b[37m\u001b[90m 18 \u001b[37m         \u001b[33mzxc\u001b[37m: \u001b[35mnull\u001b[37m,                            \u001b[39m\n\u001b[37m\u001b[90m 19 \u001b[37m         \u001b[33mspqr\u001b[37m: \u001b[37m\u001b[31mfunction\u001b[37m (\u001b[34ma, b\u001b[37m) \u001b[37m{               \u001b[39m\n\u001b[37m\u001b[90m 20 \u001b[37m             \u001b[31mreturn\u001b[37m b - a                      \u001b[39m\n\u001b[37m\u001b[90m 21 \u001b[37m         }                                     \u001b[39m\n\u001b[37m\u001b[90m 22 \u001b[37m     }                                         \u001b[39m\n\u001b[37m\u001b[90m 23 \u001b[37m                                               \u001b[39m\n\u001b[37m\u001b[39m')
})

test('Highlights ARM assembler syntax', t => {
	const asm = `
	.text

	.global connect
	connect:
		mov     r3, #2              ; s->sin_family = AF_INET
		strh    r3, [sp]
		ldr     r3, =server_port    ; s->sin_port = server_port
		ldr     r3, [r3]
		strh    r3, [sp, #2]
		ldr     r3, =server_addr    ; s->sin_addr = server_addr
		ldr     r3, [r3]
		str     r3, [sp, #4]
		mov     r3, #0              ; bzero(&s->sin_zero)
		str     r3, [sp, #8]
		str     r3, [sp, #12]
		mov     r1, sp      ; const struct sockaddr *addr = sp

		ldr     r7, =connect_call
		ldr     r7, [r7]
		swi     #0

		add     sp, sp, #16
		pop     {r0}        ; pop sockfd

		pop     {r7}
		pop     {fp, ip, lr}
		mov     sp, ip
		bx      lr

	.data
	socket_call:   .long 281
	connect_call:  .long 283

	/* all addresses are network byte-order (big-endian) */
	server_addr:            .long 0x0100007f ; localhost
	server_port:            .hword 0x0b1a
	`

	const result = chromafi(asm)
	t.is(typeof result, 'string')
	// eslint-disable-next-line unicorn/escape-case
	t.is(result, '\u001b[37m\u001b[90m  1 \u001b[37m                                                                 \u001b[39m\n\u001b[37m\u001b[90m  2 \u001b[37m     .text                                                       \u001b[39m\n\u001b[37m\u001b[90m  3 \u001b[37m                                                                 \u001b[39m\n\u001b[37m\u001b[90m  4 \u001b[37m     .global connect                                             \u001b[39m\n\u001b[37m\u001b[90m  5 \u001b[37m     connect:                                                    \u001b[39m\n\u001b[37m\u001b[90m  6 \u001b[37m         mov     r3, #2              ; s->sin_family = AF_INET   \u001b[39m\n\u001b[37m\u001b[90m  7 \u001b[37m         strh    r3, [sp]                                        \u001b[39m\n\u001b[37m\u001b[90m  8 \u001b[37m         ldr     r3, =server_port    ; s->sin_port = server_port \u001b[39m\n\u001b[37m\u001b[90m  9 \u001b[37m         ldr     r3, [r3]                                        \u001b[39m\n\u001b[37m\u001b[90m 10 \u001b[37m         strh    r3, [sp, #2]                                    \u001b[39m\n\u001b[37m\u001b[90m 11 \u001b[37m         ldr     r3, =server_addr    ; s->sin_addr = server_addr \u001b[39m\n\u001b[37m\u001b[90m 12 \u001b[37m         ldr     r3, [r3]                                        \u001b[39m\n\u001b[37m\u001b[90m 13 \u001b[37m         str     r3, [sp, #4]                                    \u001b[39m\n\u001b[37m\u001b[90m 14 \u001b[37m         mov     r3, #0              ; bzero(&s->sin_zero)       \u001b[39m\n\u001b[37m\u001b[90m 15 \u001b[37m         str     r3, [sp, #8]                                    \u001b[39m\n\u001b[37m\u001b[90m 16 \u001b[37m         str     r3, [sp, #12]                                   \u001b[39m\n\u001b[37m\u001b[90m 17 \u001b[37m         mov     r1, sp      ; const struct sockaddr *addr = sp  \u001b[39m\n\u001b[37m\u001b[90m 18 \u001b[37m                                                                 \u001b[39m\n\u001b[37m\u001b[90m 19 \u001b[37m         ldr     r7, =connect_call                               \u001b[39m\n\u001b[37m\u001b[90m 20 \u001b[37m         ldr     r7, [r7]                                        \u001b[39m\n\u001b[37m\u001b[90m 21 \u001b[37m         swi     #0                                              \u001b[39m\n\u001b[37m\u001b[90m 22 \u001b[37m                                                                 \u001b[39m\n\u001b[37m\u001b[90m 23 \u001b[37m         add     sp, sp, #16                                     \u001b[39m\n\u001b[37m\u001b[90m 24 \u001b[37m         pop     {r0}        ; pop sockfd                        \u001b[39m\n\u001b[37m\u001b[90m 25 \u001b[37m                                                                 \u001b[39m\n\u001b[37m\u001b[90m 26 \u001b[37m         pop     {r7}                                            \u001b[39m\n\u001b[37m\u001b[90m 27 \u001b[37m         pop     {fp, ip, lr}                                    \u001b[39m\n\u001b[37m\u001b[90m 28 \u001b[37m         mov     sp, ip                                          \u001b[39m\n\u001b[37m\u001b[90m 29 \u001b[37m         bx      lr                                              \u001b[39m\n\u001b[37m\u001b[90m 30 \u001b[37m                                                                 \u001b[39m\n\u001b[37m\u001b[90m 31 \u001b[37m     .data                                                       \u001b[39m\n\u001b[37m\u001b[90m 32 \u001b[37m     socket_call:   .long 281                                    \u001b[39m\n\u001b[37m\u001b[90m 33 \u001b[37m     connect_call:  .long 283                                    \u001b[39m\n\u001b[37m\u001b[90m 34 \u001b[37m                                                                 \u001b[39m\n\u001b[37m\u001b[90m 35 \u001b[37m     /* all addresses are network byte-order (big-endian) */     \u001b[39m\n\u001b[37m\u001b[90m 36 \u001b[37m     server_addr:            .long 0x0100007f ; localhost        \u001b[39m\n\u001b[37m\u001b[90m 37 \u001b[37m     server_port:            .hword 0x0b1a                       \u001b[39m\n\u001b[37m\u001b[90m 38 \u001b[37m                                                                 \u001b[39m\n\u001b[37m\u001b[39m')
})

test('Change colors', t => {
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

	const options = {
		colors: {
			base: chalk.bgWhite.black.bold,
			keyword: chalk.red,
			number: chalk.blue.dim,
			function: chalk.black,
			title: chalk.blue,
			params: chalk.black,
			string: chalk.black,
			// eslint-disable-next-line camelcase
			built_in: chalk.blue,
			literal: chalk.blue,
			attr: chalk.black,
			// eslint-disable-next-line camelcase
			trailing_space: chalk,
			regexp: chalk.blue,
			// eslint-disable-next-line camelcase
			line_numbers: chalk.bgBlue.white
		}
	}

	const result = chromafi(obj, options)
	t.is(typeof result, 'string')
	// eslint-disable-next-line unicorn/escape-case
	t.is(result, '\u001b[47m\u001b[30m\u001b[1m\u001b[44m\u001b[37m  1 \u001b[30m\u001b[47m {                                    \u001b[22m\u001b[39m\u001b[49m\n\u001b[47m\u001b[30m\u001b[1m\u001b[44m\u001b[37m  2 \u001b[30m\u001b[47m     \u001b[30mfoo:\u001b[30m \u001b[30m\'bar\'\u001b[30m,                      \u001b[22m\u001b[39m\u001b[49m\n\u001b[47m\u001b[30m\u001b[1m\u001b[44m\u001b[37m  3 \u001b[30m\u001b[47m     \u001b[30mbaz:\u001b[30m \u001b[34m\u001b[2m1337\u001b[1m\u001b[30m,                       \u001b[22m\u001b[39m\u001b[49m\n\u001b[47m\u001b[30m\u001b[1m\u001b[44m\u001b[37m  4 \u001b[30m\u001b[47m     \u001b[30mqux:\u001b[30m \u001b[34mtrue\u001b[30m,                       \u001b[22m\u001b[39m\u001b[49m\n\u001b[47m\u001b[30m\u001b[1m\u001b[44m\u001b[37m  5 \u001b[30m\u001b[47m     \u001b[30mzxc:\u001b[30m \u001b[34mnull\u001b[30m,                       \u001b[22m\u001b[39m\u001b[49m\n\u001b[47m\u001b[30m\u001b[1m\u001b[44m\u001b[37m  6 \u001b[30m\u001b[47m     \u001b[36m\'foogle-bork\':\u001b[30m \u001b[30m\u001b[30m\u001b[31mfunction\u001b[30m (\u001b[30ma, b\u001b[30m) \u001b[30m{\u001b[30m \u001b[22m\u001b[39m\u001b[49m\n\u001b[47m\u001b[30m\u001b[1m\u001b[44m\u001b[37m  7 \u001b[30m\u001b[47m \u001b[30m            \u001b[31mreturn\u001b[30m b - a;\u001b[30m            \u001b[22m\u001b[39m\u001b[49m\n\u001b[47m\u001b[30m\u001b[1m\u001b[44m\u001b[37m  8 \u001b[30m\u001b[47m \u001b[30m        }\u001b[30m                            \u001b[22m\u001b[39m\u001b[49m\n\u001b[47m\u001b[30m\u001b[1m\u001b[44m\u001b[37m  9 \u001b[30m\u001b[47m }                                    \u001b[22m\u001b[39m\u001b[49m\n\u001b[47m\u001b[30m\u001b[1m\u001b[22m\u001b[39m\u001b[49m')
})

test('Change options', t => {
	const obj = {foobar: 1337}

	const options = {
		lineNumberPad: 0,
		codePad: 0,
		indent: 2,
		lineNumbers: true,
		colors: {
			base: chalk.bgBlack.white.bold,
			// eslint-disable-next-line camelcase
			line_numbers: chalk.bgCyan.black
		}
	}

	const result = chromafi(obj, options)
	t.is(typeof result, 'string')
	// eslint-disable-next-line unicorn/escape-case
	t.is(result, '\u001b[40m\u001b[37m\u001b[1m\u001b[46m\u001b[30m1\u001b[37m\u001b[40m{             \u001b[22m\u001b[39m\u001b[49m\n\u001b[40m\u001b[37m\u001b[1m\u001b[46m\u001b[30m2\u001b[37m\u001b[40m  \u001b[33mfoobar:\u001b[37m \u001b[32m1337\u001b[37m\u001b[22m\u001b[39m\u001b[49m\n\u001b[40m\u001b[37m\u001b[1m\u001b[46m\u001b[30m3\u001b[37m\u001b[40m}             \u001b[22m\u001b[39m\u001b[49m\n\u001b[40m\u001b[37m\u001b[1m\u001b[22m\u001b[39m\u001b[49m')
})

test('Highlights HTML', t => {
	const html = `
	<body>
		<div>
			<span>Good</span>
			<span>Bad</span>
		</div>
	<body>
	`

	const result = chromafi(html, {lang: 'html'})
	t.is(typeof result, 'string')
	// eslint-disable-next-line unicorn/escape-case
	t.is(result, '\u001b[37m\u001b[90m 1 \u001b[37m                               \u001b[39m\n\u001b[37m\u001b[90m 2 \u001b[37m     \u001b[34m<\u001b[36mbody\u001b[34m>\u001b[37m                    \u001b[39m\n\u001b[37m\u001b[90m 3 \u001b[37m         \u001b[34m<\u001b[36mdiv\u001b[34m>\u001b[37m                 \u001b[39m\n\u001b[37m\u001b[90m 4 \u001b[37m             \u001b[34m<\u001b[36mspan\u001b[34m>\u001b[37mGood\u001b[34m</\u001b[36mspan\u001b[34m>\u001b[37m \u001b[39m\n\u001b[37m\u001b[90m 5 \u001b[37m             \u001b[34m<\u001b[36mspan\u001b[34m>\u001b[37mBad\u001b[34m</\u001b[36mspan\u001b[34m>\u001b[37m  \u001b[39m\n\u001b[37m\u001b[90m 6 \u001b[37m         \u001b[34m</\u001b[36mdiv\u001b[34m>\u001b[37m                \u001b[39m\n\u001b[37m\u001b[90m 7 \u001b[37m     \u001b[34m<\u001b[36mbody\u001b[34m>\u001b[37m                    \u001b[39m\n\u001b[37m\u001b[90m 8 \u001b[37m                               \u001b[39m\n\u001b[37m\u001b[39m')
})

test('Line number offset', t => {
	const html = `
	<body>
		<div>
			<span>Good</span>
			<span>Bad</span>
		</div>
	<body>
	`

	const result = chromafi(html, {
		lang: 'html',
		lineNumberStart: 123
	})

	t.is(typeof result, 'string')

	// eslint-disable-next-line unicorn/escape-case
	t.is(result, '\u001b[37m\u001b[90m 123 \u001b[37m                               \u001b[39m\n\u001b[37m\u001b[90m 124 \u001b[37m     \u001b[34m<\u001b[36mbody\u001b[34m>\u001b[37m                    \u001b[39m\n\u001b[37m\u001b[90m 125 \u001b[37m         \u001b[34m<\u001b[36mdiv\u001b[34m>\u001b[37m                 \u001b[39m\n\u001b[37m\u001b[90m 126 \u001b[37m             \u001b[34m<\u001b[36mspan\u001b[34m>\u001b[37mGood\u001b[34m</\u001b[36mspan\u001b[34m>\u001b[37m \u001b[39m\n\u001b[37m\u001b[90m 127 \u001b[37m             \u001b[34m<\u001b[36mspan\u001b[34m>\u001b[37mBad\u001b[34m</\u001b[36mspan\u001b[34m>\u001b[37m  \u001b[39m\n\u001b[37m\u001b[90m 128 \u001b[37m         \u001b[34m</\u001b[36mdiv\u001b[34m>\u001b[37m                \u001b[39m\n\u001b[37m\u001b[90m 129 \u001b[37m     \u001b[34m<\u001b[36mbody\u001b[34m>\u001b[37m                    \u001b[39m\n\u001b[37m\u001b[90m 130 \u001b[37m                               \u001b[39m\n\u001b[37m\u001b[39m')
})

