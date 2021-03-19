/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const newArr = [...arr];

  function sortFunction(a, b) {
    if (param === 'asc') {
      return a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper'});
    }
    return b.localeCompare(a, ['ru', 'en'], { caseFirst: 'upper'});
  }

  return newArr.sort(sortFunction);
}
