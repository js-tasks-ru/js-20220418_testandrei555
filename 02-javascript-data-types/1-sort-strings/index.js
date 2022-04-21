/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
   let arrCopy = [...arr];
   if (param === "asc") {
      arrCopy.sort((a, b) => a.localeCompare(b, "kf", {caseFirst: "upper"}));
   }
   if (param === "desc") {
      arrCopy.sort((a, b) => b.localeCompare(a));
   }
   return arrCopy;
}
