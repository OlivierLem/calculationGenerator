import { createElement } from "../fonction/createElement";
import { OperatorType } from "../types/form";

export class OperationComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Création d'une racine fantôme
    const shadow: ShadowRoot = this.attachShadow({ mode: "open" });

    // on récupére le nombres sous une chaine de caractère est avec le délimiteur "," on créer un tableau
    let numbersString: string = this.getAttribute("numbers") ?? "0";
    let numbers: string[] = numbersString?.split(",");
    let nDigit: number = numbers[0].length; // Nombre de chiffre
    let operator: OperatorType | undefined;
    let checkOperator: string[] = ["+", "-"]; // pour vérifier si operator posséde l'un des symbole autorisé
    let getOperator = this.getAttribute("operator") as string;
    if (checkOperator.includes(getOperator)) {
      operator = this.getAttribute("operator") as OperatorType;
    }
    const operationElement = createElement(
      "div",
      "operationBlock"
    ) as HTMLDivElement;

    // création d'élément p + span pour chaque nombres et si on est aux 2e nombre on ajoute l'opérateur dans une balise span
    for (let i = 0; i < numbers.toReversed().length; i++) {
      let number: string = numbers.toReversed()[i];
      const numberElement = createElement(
        "p",
        "numberElement"
      ) as HTMLParagraphElement;
      const spanNumber = createElement("span", "", number, {
        contenteditable: "true",
      }) as HTMLSpanElement;
      spanNumber.addEventListener("keydown", (e) => this.onKeyDown(e, nDigit));

      if (
        i !== numbers.toReversed().length - 1 &&
        checkOperator?.includes(operator ?? "+")
      ) {
        numberElement.innerHTML += `<span class="operatorSpan">${operator}</span>`;
      }
      if (!checkOperator?.includes(operator ?? "+")) {
        console.error(
          "The operator attribute must be filled in and can only be '+' or '-' "
        );
        return;
      }
      numberElement.appendChild(spanNumber);
      operationElement.insertAdjacentElement("afterbegin", numberElement);
    }

    const style: HTMLStyleElement = document.createElement("style");
    // style du composant
    style.textContent = `
      .operationBlock {
        display: flex;
        position: relative;
        z-index: 100;
        flex-direction: column;
        gap: .4rem;
        width: fit-content;
        padding: 0 .75rem .5rem 2.5rem;
        margin: 1rem;    
        text-align: right;
        font-weight: 600;
        border-bottom: solid 2px black;
      }

      .numberElement {
        margin: 0;
        letter-spacing: .3rem;
        border:solid 2px transparent;
        border-radius: .5rem;
        transition: border-color ease-in-out .25s,
                    color ease-in-out .25s;
      }

      .numberElement:hover {
        color: #ba4edb;
        border: solid 2px #ba4edb;
      }
        
      .operatorSpan {
        position: absolute;
        left: .5rem;
      }
    `;

    shadow.appendChild(operationElement);
    shadow.appendChild(style);
  }

  // événement qui modifie la balise span contenant le nombre séléctionner
  onKeyDown(e: KeyboardEvent, digit: number) {
    const numberRegex: RegExp = /[0-9]/g;
    const deleteEventKey: string[] = ["Delete", "Backspace"];
    let value = e.currentTarget as HTMLSpanElement;
    // si on utilise une touche qui n'est pas un chiffre on bloque l'action
    // sauf si touche de suppresion utilisé et on renvoie une erreur
    if (!e.key.match(numberRegex) && !deleteEventKey.includes(e.key)) {
      e.preventDefault();
      console.error("Le caratère '" + e.key + "' n'est pas autorisé");
      return;
    }

    // si le nombre a autant de chiffre que lors de sa création on bloque l'action
    // sauf si touche de suppresion utilisé et on renvoie une erreur
    if (
      value.textContent &&
      value.textContent.length >= digit &&
      !deleteEventKey.includes(e.key)
    ) {
      e.preventDefault();
      console.error("trop de caractère");
      return;
    }
    // si il n'y a plus qu'1 chiffre alors on bloque l'action de supression
    if (
      value.textContent &&
      value.textContent.length === 1 &&
      deleteEventKey.includes(e.key)
    ) {
      e.preventDefault();
      console.error("Il ne reste plus qu'un caractère");
      return;
    }
  }
}
