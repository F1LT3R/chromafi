# Chromafi

> 💥 Syntax highlight to console: any lang - any fn, any - obj.

badges

For years, JavaScripts across the web have committed monocrimes too horrible to mention. Today it ends.

Now you can log your JavaScript object to the console, and I will look like JavaScript. Not JSON.

## Usage

```javascript
const chromafi = require('chromafi')

const obj = {
    foo: 'bar',
    baz: 1337,
    qux: true,
    zxc: null,
    'foogle-bork': function (a, b) {
        return b - a
    }
}

const chromatastic = chromafi(obj)

console.log(chromatastic)
```

![Figure 01](figure-01.png)



