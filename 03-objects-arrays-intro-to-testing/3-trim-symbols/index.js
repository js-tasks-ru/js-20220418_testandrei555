/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
   const strToArr = string.split("");

   const copy = [...strToArr];
   const newArr = [];
   divideStr();
   return newArr.join("");

   function divideStr() {
      for (let i = 0; i < copy.length; i++) {
         if (copy[i] !== copy[i + 1]) {
            const removed = copy.splice(0, i + 1);
            newArr.push(removed.join("").slice(0, size));
            return divideStr();
         }
      }
   }
}
