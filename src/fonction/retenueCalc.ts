export const retenueCalc = (
  operator: "+" | "-",
  ...numbers: number[]
): boolean | "négatif" => {
  // valeur du tableaux numbers transformé en string
  let numbersToString: string[] = [];
  numbersToString = numbers.map((n) => n.toString());

  // création d'un tableau comportant le nombre de caractère de chaque valeur
  let numberLength: number[] = numbersToString.map((n) => n.length);
  let maxDigit: number = Math.max(...numberLength); // recherche le nombre de caratère le plus élever des valeur du tableaux
  // on modifie le tableau pour ajouter des 0 au valeur n'ayant pas assez de caratère
  let editedNumber: string[] = numbersToString.map((n) => {
    // si il manque des caractère on ajoute autant de 0 que nécessaire à la valeur
    // sinon on laisse la valeur initiale
    if (n.length < maxDigit) {
      let diffDigit: number = maxDigit - n.length;
      let zeroAdded: string = "";
      for (let i = 0; i < diffDigit; i++) {
        zeroAdded = zeroAdded + "0";
      }
      return zeroAdded + n;
    }
    return n;
  });

  switch (operator) {
    case "+":
      // dans une boucle on prend le 1er caractére de chaque caractère que l'on transforme en nombre
      // on fait la somme de ces chiffres si il est supérieur à 9 l'opération possédent 1 retenue
      // donc on retourne true si ce n'est pas le cas on continue jusqu'à ne plus avoir de chiffre
      for (let i = maxDigit - 1; i >= 0; i--) {
        let sumDigit: number= editedNumber
          .map((n) => parseInt(n[i]))
          .reduce((acc, curr) => curr + acc);
        if (sumDigit > 9) {
          return true;
        }
      }
      return false; // l'opération n'a pas de retenue on retourne false
    case "-":
      let sustractNumber: number = editedNumber
        .map((n) => parseInt(n))
        .reduce((acc, curr) => acc - curr);
      if (sustractNumber < 0) {
        return "négatif";
      }

      // dans une boucle on prend le 1er caractére de chaque caractère que l'on transforme en nombre
      // on soustrait les chiffres si c'est inférieur à 0 l'opération possédent 1 retenue
      // donc on retourne true si ce n'est pas le cas on continue jusqu'à ne plus avoir de chiffre
      for (let i = maxDigit - 1; i >= 0; i--) {
        let substractDigit: number = editedNumber
          .map((n) => parseInt(n[i]))
          .reduce((acc, curr) => acc - curr);
        if (substractDigit < 0) {
          return true;
        }
      }
      return false; // l'opération n'a pas de retenue on retourne false
    default:
      break;
  }
  return false;
};
