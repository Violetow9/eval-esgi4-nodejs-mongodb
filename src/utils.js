/**
 * Return true of the keys in the given object are present and not empty
 * @param {Object} object
 * @param {string[]} fields
 */
const areObjectFieldsPresent = (object, fields) => {
    if( typeof object !== "object" || !Array.isArray(fields) || fields.length === 0 ) {
        return false
    }

    const keys = Object.keys(object)

    if( keys.length !== fields.length ) return false

    keys.forEach((singleKey) => {
        //if the key is present and it's value is not empty in the object
        if ( fields.indexOf(singleKey) === -1 || singleKey === "" ) {
            return false
        }
    })

    return true;
}

module.exports = { areObjectFieldsPresent }