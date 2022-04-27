/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
   if (!obj) return;

   const newObj = {};
   const keys = Object.keys(obj);
   const values = Object.values(obj);

   for (let i = 0; i < keys.length; i++) {
      newObj[values[i]] = keys[i];
   }

   return newObj;
}
