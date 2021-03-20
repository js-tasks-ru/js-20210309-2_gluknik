/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const getter = (obj) => {
    return path.split('.').reduce((previous, current) => {
      if (previous !== undefined) {
        return previous[current];
      }
      return undefined;
    }, obj);
  };

  return getter;
}
