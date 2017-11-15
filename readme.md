# auto-bind 

> Automatically bind methods to their class instance and works on parent methods.


## Install

```
$ npm install --save auto-bind-inheritance
```


## Usage

```js
// const autoBind = require('auto-bind'); // drop-in replacement
const autoBindI = require('auto-bind-inheritance');

class A {
	constructor() {
		this.val = 'A';
		autoBindI(this);
	}
	method2() { console.log('A.method2 ', this.val); }
}
  
class B extends A {
	constructor() {
		super();
		this.val = 'B';
		autoBindI(this);
	}
	method1() { console.log('B.method1 ', this.val); }
}


let a = new A();
let b = new B();


b.method1();
b.method2();
let mb1 = b.method1;
let mb2 = b.method2;
console.log(mb1.name);
console.log(mb2.name);
mb1();
mb2();


// With `autoBind(this)`, the above would have resulted in
//=> 'B.method1  B'
//=> 'A.method2  B'
//=> 'bound bound method1'
//=> 'method2'
//=> 'B.method1  B'
//=> 'exception "Cannot read property 'val' of undefined"'

// With `autoBindI(this)`, the above would have resulted in
//=> 'B.method1  B'
//=> 'A.method2  B'
//=> 'method1'
//=> 'method2'
//=> 'B.method1  B'
//=> 'A.method2  B'



```


## API

### autoBind(self)

Bind methods in `self` to their class instance. Returns the `self` object. Can be placed in the parent and will be call on all child classes because the prototype chain has already been created.

#### self

Type: `Object`

Object with methods to bind.


## Related

- [auto-bind](https://github.com/sindresorhus/auto-bind) - Automatically bind methods to their class instance


## License

MIT © [Chad Wingrave](https://github.com/cwingrav)
