/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let newArr = [];

  function ascOrder(a, b) {
    return a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper'});
  }

  function descOrder(a, b) {
    return b.localeCompare(a, ['ru', 'en'], { caseFirst: 'upper'});
  }

  for (let i = 0; i < arr.length; i++) {
    newArr[i] = arr[i];
  }

  if (param === 'desc') {
    return newArr.sort(descOrder);
  }

  return newArr.sort(ascOrder);
}
