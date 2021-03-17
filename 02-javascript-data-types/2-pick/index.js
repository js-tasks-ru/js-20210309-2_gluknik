/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  let newObject = {};
  let arr = [];
  
  newObject = Object.fromEntries(Object.entries(obj).map(([key, value]) => {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] === key) {
        return [key, value];
      }
    }

    return arr;
  }));

  return newObject;
};
