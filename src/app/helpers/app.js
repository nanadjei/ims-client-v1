
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

/** Hide some portion of email. Example: na**********@gmail.com */
export const partiallyHideEmail = function (email) {
    return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
        for (let i = 0; i < gp3.length; i++) {
            gp2 += "*";
        }
        return gp2;
    });
};

/** Route to a specific component
     * @var object routerName  - Eg; {'name': 'dashboard'}
     */
export const navigateToRouter = (route) => {
    if (this.$route.name !== route.name) this.$router.push(route);
};