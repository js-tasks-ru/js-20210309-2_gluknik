/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const newArr = [...arr];

  function sortFunction(a, b) {
    let str1 = a;
    let str2 = b;

    if (param === 'desc') {
      str1 = b;
      str2 = a;
    }
    
    return str1.localeCompare(str2, ['ru', 'en'], { caseFirst: 'upper'});
  }

  return newArr.sort(sortFunction);
}
