/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  const arr = [];
  let counter = 0;
  
  switch (size) {
    case 0:
      return '';
    case undefined:
      return string;
  }

  string.split('').forEach(item => {
    const lastValue = arr[arr.length - 1];
    if (arr.length !== 0) {
      if (item === lastValue && counter < size) {
        arr.push(item);
        counter++;
      } else if (item !== lastValue) {
        arr.push(item);
        counter = 1;
      }
    } else {
      arr.push(item);
      counter++;
    }
  });

  return arr.join('');
}
