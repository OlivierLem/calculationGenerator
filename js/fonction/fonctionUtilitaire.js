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
 * Fonction qui créer un event pour n'écrire que des chiffres dans un inputText
 * @param {inputTextElement} input
 */

export function inputNumber(input){
  // ! Ajout des touche pour se déplacé avec le clavier
  input.addEventListener("keydown", (event) => {
    if (event.keyCode < 96 || event.keyCode > 105)
      if ((event.keyCode < 8 || event.keyCode > 9) && event.keyCode !== 46)
        event.preventDefault();
  });
}

/**
 * fonction pour enlever les espaces en trop
 * @param {String} str 
 * @returns {String}
 */
export function removeExtraSpace(str){
    str = str.replace(/[\s]{2,}/g," "); // Enlève les espaces doubles, triples, etc.
    str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
    str = str.replace(/[\s]$/,""); // Enlève les espaces à la fin
    return str;    
}