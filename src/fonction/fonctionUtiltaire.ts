import { intRange } from "aimless.js";

export function createRandomArrayNumber(
  nNumber: number,
  digit: number,
  limitNumber: boolean
): number[] {
  let randomNumber: number[] = [];
  let digitMax: number = Math.round(16 / nNumber) // si il on ne veut pa de retenue on limite les chiffres possible sur le nombre
  for (let i = 0; i < nNumber; i++) {
    if(limitNumber === false) {
      // intRange fonction aimless qui donne un nombre au hazard
      // ? Ex digit=3: (10 puissance 3) - 1 pour avoir 999 et 10 puissance (3-1) pour avoir 100
      let range: number = 0;
      range = intRange(10 ** (digit - 1), 10 ** digit - 1);
      randomNumber.push(range);
    } else {
        let range: string = ""
        for (let j = 0; j < digit; j++) {
          if(j === 0 ) {
            range += intRange(1, digitMax).toString();
            continue
          }
          range += intRange(0, digitMax).toString();
        }

        randomNumber.push(parseInt(range));
    }
  }
  return randomNumber;
}

export function removeExtraSpace(str: string): string {
  str = str.replace(/[\s]{2,}/g, " "); // Enlève les espaces doubles, triples, etc.
  str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
  str = str.replace(/[\s]$/, ""); // Enlève les espaces à la fin
  return str;
}
