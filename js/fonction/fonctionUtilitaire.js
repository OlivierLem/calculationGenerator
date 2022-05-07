/**
 * @param {int} min 
 * @param {int} max 
 * @returns {int} nombre aléatoire
 */

export const randNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * * fonction pour enlever les espaces en trop
 * @param {String} str 
 * @returns {String}
 */

export function removeExtraSpace(str){
    str = str.replace(/[\s]{2,}/g," "); // Enlève les espaces doubles, triples, etc.
    str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
    str = str.replace(/[\s]$/,""); // Enlève les espaces à la fin
    return str;    
}