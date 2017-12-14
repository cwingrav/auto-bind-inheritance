/**
 * Auto-bind methods of an object to the object.
 *
 *   NOTE: potential issue with getter functions, so:
 *     1) initialize the getter/setter inside the getter/setter (not ideal)
 *     2) call autoBindI at end of final child (not ideal)
 *     3) manually call autoBindI
 *     4) avoid getter/setters
 *
 * @param {object} self - object to bind its own functions to
 * @return {this}
 */
module.exports = (self) => {

  for (const key of getAllPropertyNames(self)) {
    let val = null
    
    try {
      val = self[key];
    } catch (err) {
      let pd = null;
      let obj = self;

      do {
        pd = Object.getOwnPropertyDescriptor(obj, key);
        if ( pd != null ) {
          if ( pd.get ) {
            console.log('\nNOTE: potential issue with getter functions, so:');
            console.log('  1) initialize the getter/setter inside the getter/setter (not ideal)');
            console.log('  2) call autoBindI at end of final child (not ideal)');
            console.log('  3) manually call autoBindI');
            console.log('  4) avoid getter/setters');
            throw new Error('getter implementation issue with auto-bind-inheritance.');
          }
        }
      } while( obj = Object.getPrototypeOf(obj) );
    }

    if (key !== 'constructor' && typeof val === 'function' &&
         (!self[key].name.startsWith('bound ')) ) {
      self[key] = val.bind(self);
//      console.log(`  --- bind '${key}' as '${self[key].name}'`);
    }
  }



 /**
  * Get all property names by walking up prototype chain
  * @param {*} obj
  * @return {array}
  */
	function getAllPropertyNames( obj ) {
		let props = [];

		do {
			Object.getOwnPropertyNames( obj )
				.forEach(( prop ) => {
					if ( props.indexOf( prop ) === -1 ) {props.push( prop );}
				});
		} while ( obj = Object.getPrototypeOf( obj ) );

		return props;
	};


  return self;
};
