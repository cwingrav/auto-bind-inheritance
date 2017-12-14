
let should = require('should');
let autoBindI = require('../index');

describe('MOCHA: auto-bind-inheritance', function() {
  console.log(this.title);

  it('MOCHA: basic binding test', function() {
    console.log(this.test.title);

    class A {
      constructor() {
        this.val = 'A';
        autoBindI(this);
      }
      method2() { return 'A.method2 '+this.val; }
    }

    class B extends A {
      constructor() {
        super();
        this.val = 'B';
      }
      method1() { return 'B.method1 '+this.val; }
    }

    let a = new A();
    let b = new B();

    let mb1 = b.method1;
    let mb2 = b.method2;

    b.method1().should.equal('B.method1 B');
    b.method2().should.equal('A.method2 B');
    mb1.name.should.equal('bound method1');
    mb2.name.should.equal('bound method2');
    mb1().should.equal('B.method1 B');
    mb2().should.equal('A.method2 B');

    console.log(b.method1()); // B.method1  B
    console.log(b.method2()); // A.method2  B
    console.log(mb1.name);    // bound method1
    console.log(mb2.name);  // bound method2
    console.log(mb1());     // B.method1  B
    console.log(mb2());     // A.method2  B

  });


  describe('MOCHA: getter issue', function() {
    console.log(this.title);

    it('MOCHA: getter issue', function() {
      console.log(this.test.title);

      class A {
        constructor() {
          autoBindI(this);
        }
      }

      class B extends A {
        constructor() {
          super();
          this.foo = [];
        }

        // when `autoBindI` detects this method, this.foo is still undefined
        // `self[key] = val.bind(self);` will now result in
        // "Cannot read property '0' of undefined"
        get bar() {
          console.log('get bar');
          return this.foo[0];
        }
      }

      try {
        let b = new B();
        throw new Error('Should have thrown error!');
      } catch (err) {
        err.message.should.equal('getter implementation issue with auto-bind-inheritance.');

      }

    });


    it('MOCHA: getter issue corrected 1, in-getter check', function() {
      console.log(this.test.title);

      class A { constructor() { autoBindI(this); } }

      class B extends A {
        constructor() { super(); this.foo = []; } 
        get bar() {
          if ( this.foo == null ) return null;
          console.log('get bar');
          return this.foo[0];
        } }
      let b = new B();
      should.equal( b.bar, null);
    });


    it('MOCHA: getter issue corrected 2, autoBindI called at end', function() {
      console.log(this.test.title);

      class A { constructor() { } }

      class B extends A {
        constructor() { super(); this.foo = []; autoBindI(this); } 
        get bar() {
          console.log('get bar');
          return this.foo[0];
        } }
      let b = new B();
      should.equal( b.bar, null);
    });


    it('MOCHA: getter issue corrected 3, manually call autoBindI', function() {
      console.log(this.test.title);

      class A { constructor() { } }

      class B extends A {
        constructor() { super(); this.foo = []; } 
        get bar() {
          console.log('get bar');
          return this.foo[0];
        } }
      let b = new B();
      autoBindI(b);
      should.equal( b.bar, null);
    });


    it('MOCHA: getter issue corrected 4, avoid getter', function() {
      console.log(this.test.title);

      class A { constructor() { autoBindI(this); } }

      class B extends A {
        constructor() { super(); this.foo = []; } 
        bar() {
          console.log('get bar');
          return this.foo[0];
        } 
      }

      let b = new B();
      should.equal( b.bar(), null);
    });
  });
});
