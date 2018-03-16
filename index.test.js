const chromafi = require('.')

const jsObject = {
	foo: 'bar',
	baz: 1337,
	qux: true,
	zxc: null,
	'foogle-bork': function (a, b) {
		return b - a
	}
}

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

// const chromalicious = chromafi(asm, {
// 	codePad: 1,
// 	lang: 'arm'
// })

// console.log(chromalicious)

// console.log(chromafi(code, {codePad: 1}))
console.log(chromafi(jsObject))
// console.log(chromafi(chromafi))



// chromafi({
//     foo: 'bar',
//     baz: 1337,
//     qux: true,
//     zxc: null,
//     'foogle-bork': function (a, b) {
//         return b - a
//     }
// })
