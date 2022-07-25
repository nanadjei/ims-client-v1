/**
 * Set the values of an object to a specific value;
 * Example form:{email: "email", password: "password"};
 * This method will return form:{email: "value to be assigned to", password: "value to be assigned to"}
 * @param {Object} obj is the object in context
 * @param {String} value is the value to be assigned
 * */
export const objectSetValues = (obj, value) => {
    Object.keys(obj).forEach(index => {
        obj[index] = value;
    });
};

/**
 * this method checks for the object with empty values and calls this 👆 method above
 * @param {Object} obj
 * @param {String} value
 */
export const checkAndEmtyObjVals = (obj, value) => {
    if (Object.values(obj).length > 0) {
        objectSetValues(obj, value);
    }
};

/**
 * This method capitalizes the first letter of a string.
 * @param {Sting} the string to capitalize the first letter
 */
export const ucFirst = string => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
};

/** Sum object values by it's key
 * @param { Object } items - The object you would like to sum up. Eg; { 'name': 'Elvis', 'age': '20' }, { 'name': 'Adjei', 'age': '30'}
 * @param { String } propToSum - The property to sum. Eg; "age"
 */
export const sum = (items, propToSum) => {
    return items.reduce((x, y) => {
        return parseFloat(x) + parseFloat(y[propToSum]);
    }, 0);
};

/**
 * Multiply two numbers and convert them to float.
 * 
 * @param { Number } col1 
 * @param { Number } col1 
 * @returns Float of the multiplied numbers
 */
export const multiTwoCols = (col1, col2) => {
    return (Number(col1) * Number(col2)).toFixed(2);
}

/**
 * Allow only float numbers in input fields
 * return 
 */
export const allowFloatsOnly = (arrayItems, event, index, key) => {
      var value = arrayItems[index][key];

      let keyCode = (event.keyCode ? event.keyCode : event.which);
       // only allow number and one dot
        if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || value.indexOf('.') != -1)) event.preventDefault();
    };

/** Hide some portion of email. Example: na**********@gmail.com */
export const partiallyHideEmail = function (email) {
    return email.replace(/(.{2})(.*)(?=@)/, function (gp2, gp3) {
        for (let i = 0; i < gp3.length; i++) {
            gp2 += "*";
        }
        return gp2;
    });
};

/** Route to a specific component
 * @var { String } object routerName  - Eg; {'name': 'dashboard'}
 */
export const navigateToRouter = (route) => {
    if (window.vm.$route.name !== route.name) window.vm.$router.push(route);
};

/** Auto increment numbers 
 * @var { Array } loop loop - Array of items to loop through.
 * @var { Number } counter counter - Where to start counting from.
 * @return void
*/
export const incrementor = (loop, counter) => {
    counter = 1;
        for( let i = 0; i < loop.length; i++ ) {
            loop[i].number = counter;
            counter++;
        }
    };

// If route is not the same as arg then return true.
export const ifRouteIs = (routeName) => {
    return window.vm.$route.name == routeName ? true : false;
}
/**  
 * Loop through array of items set some values and reassign the object;
 * @var { Array } loop - Array of items.
 * @var { String } key - Key to find. Eg; Item.id.
 * @var { String } isEqualTo - The truthy value. Eg; 1.
 * @var { Object } stack  - The value to set. Eg; 
*/
export const setObject = (loop, key, isEqualTo, stack ) => {
    var array = [...loop];

    const el = array.find(item => item[key] === isEqualTo);

    return Object.assign(el, stack);
}