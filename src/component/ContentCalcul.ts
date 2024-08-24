import { createElement } from "../fonction/createElement";
import { toggleDisabledButton } from "../fonction/disabledButton";
import { createRandomArrayNumber } from "../fonction/fonctionUtiltaire";
import { retenueCalc } from "../fonction/retenueCalc";
import { FormType, OperatorType } from "../types/form";

type SymbolOperator = {
  addition: string;
  soustraction: string;
};

export class ContentCalcul extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Création d'une racine fantôme
    const shadow: ShadowRoot = this.attachShadow({ mode: "open" });

    // création des élément du composant
    const contentCalcul = createElement("div","contentCalcul") as HTMLDivElement;
    const buttonGroup = createElement("div", "buttonGroup") as HTMLDivElement;
    const backgroundElement = createElement("span","background") as HTMLSpanElement;

    buttonGroup.innerHTML = `
      <button>+1</button>
      <button>-1</button>
    `;
    // on récupére les 2 boutons pour les événement click
    const buttonAdd = buttonGroup.children[0];
    const buttonDelete = buttonGroup.children[1];
    // événement qui ajoute un calcul dans l'élément content-calcul
    buttonAdd.addEventListener("click", (e) =>
      this.eventAddOperation(e, setting)
    );
    // événement qui supprime un calcul dans l'élément content-calcul
    buttonDelete.addEventListener("click", this.eventDeleteOperation);
    let buildSetting: object | undefined = {}; // objet temporaire pour la création de l'objet avec les valeur de ces attribut
    // modifie le nom des attribut pour correspondre aux type 'FormType'
    const convertNameAttribute: { [key: string]: keyof FormType } = {
      noperation: "nOperation",
      typecalcul: "typeCalcul",
      nnumber: "nNumber",
      ndigit: "nDigit",
      retenue: "retenue",
    };

    // on créer l'objet en ajoutant ces clé venant des attributs et ces valeur  
    for (let name of this.getAttributeNames()) {
      let value = this.getAttribute(name);
      if (value !== undefined) {
        const key: keyof FormType = convertNameAttribute[name];
        buildSetting = {
          ...buildSetting,
          [key]: value,
        };
      }
    }
    // on ajoute les éléments de l'objet setting avec les données de la variable temporaire
    const setting = {
      ...buildSetting,
    } as FormType;
    buildSetting = undefined;
    // Ajout et création des éléments d'opérations  
    this.createOperationComponent(setting, contentCalcul, setting.nOperation);

    const style: HTMLStyleElement = document.createElement("style");
    style.textContent = `
        .contentCalcul {
          display: flex;
          position: relative;
          justify-content: center;
          align-items: center;
          gap: 2rem 0;
          padding: 1rem;
          padding-left: 3rem;
          flex-wrap: wrap;
        }

        .contentCalcul .buttonGroup {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          position: absolute;
          top: 0;
          left: -2%;
          width: 6%;
          height: 100%;
          border-radius: .8rem 0 0 .8rem ;
          background-color: pink;
          opacity: 0;
          transition: opacity ease-in-out .25s;
        }

        .contentCalcul:hover .buttonGroup {
          z-index: 100;
          opacity: 1;
          transition: opacity ease-in-out .25s;
        }

        .contentCalcul .buttonGroup > button {
          width: 2.5rem;
          aspect-ratio: 1 / 1;
          margin-left: .5rem;
          border-radius: 50%;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 3px;
          opacity: 0;
          border: none;
          color: #fff;
          background-color: #da83f5;
          transition: opacity ease-in-out .25s,
                      background-color ease-in-out .25s;
        }

        .contentCalcul .buttonGroup > button:hover {
          background-color: #ba4edb;

        }
        .contentCalcul:hover .buttonGroup > button {
          opacity: 1;
          transition: opacity ease-in-out .25s,
                      background-color ease-in-out .25s;
        }
        .contentCalcul > .background {
          position: absolute;
          z-index: 10;
          top: 0;
          left: 4%;
          width: 96%;
          height: 100%;
          border-radius: 0 .8rem .8rem 0;
          opacity: 0;
          background-color: pink;
          transition: opacity ease-in-out .25s;
        }

        .contentCalcul:hover > .background {
          opacity: 1;
        }

        .contentCalcul > .background::before {
          content: "";
          display: block;
          position: absolute;
          width: 97%;
          height: calc(100% - (1rem * 2));
          top: 1rem;
          right: 1rem;
          border-radius: .8rem;
          background-color: #fff;
        }
      `;

    contentCalcul.appendChild(backgroundElement);
    contentCalcul.appendChild(buttonGroup);
    shadow.appendChild(contentCalcul);
    shadow.appendChild(style);
  }

  // ajout d'une opération dans l'élément courrant
  eventAddOperation(e: Event, setting: FormType) {
    e.stopPropagation();
    let currentElement = this.shadowRoot?.children[0] as HTMLElement;
    if (currentElement) {
      this.createOperationComponent(setting, currentElement, "addOne");
    }
  }

  // supprimer une opération dans l'élément
  eventDeleteOperation(e: Event) {
    e.stopPropagation();
    const currentContentCalcul = this.parentElement?.parentElement as HTMLDivElement;
    const ContentElements = document.querySelectorAll<Element>("content-calcul");
    let previousElement: HTMLDivElement | HTMLHeadingElement | undefined;
    // on vérifie qu'on se situe dans le bon élément content-calcul puis on récupére l'élément au dessus de l'élément courrant
    for (const content of ContentElements) {
      let shadowElement = content.shadowRoot?.children[0];
      if (currentContentCalcul === shadowElement) {
        previousElement = content &&
          (content.parentElement?.children[
            content.parentElement?.children.length - 2
          ] as HTMLDivElement | HTMLHeadingElement);
        break;
      } else {
        console.log("diff");
      }
    }
    // on supprime une opération et si il n'en reste qu'un on supprime le composant 
    // ainsi que le sous titre si il n'y a plus de calcul en dessous
    if (currentContentCalcul?.children.length) {
      const contentChildren: HTMLCollection = currentContentCalcul.children;
      if (
        currentContentCalcul?.lastElementChild !== null &&
        currentContentCalcul?.children.length > 3
      ) {
        currentContentCalcul?.children[contentChildren.length - 3].remove();
        return;
      }
      if (
        previousElement &&
        previousElement.classList.contains("subtitleCalc")
      ) {
        previousElement.remove();
      }
      //  supprime l'élément content-calcul et vérifie si il reste du contenue sinon on disabled le boutton pour créer un fichier pdf
      for (const content of ContentElements) {
        let shadowElement = content.shadowRoot?.children[0];
        if (currentContentCalcul === shadowElement) {
          content.remove();
          toggleDisabledButton();
          break;
        } else {
          console.log("diff");
        }
      }
    }
  }

  // ! bug si un élément operation-component est en dessous de la div button group l'event click ne fonctionne plus
  createOperationComponent(
    setting: FormType,
    contentCalcul: Element,
    nOperation: string | "addOne" = "1"
  ) {

    if (setting !== undefined) {
      // variable contenant les données du formulaire précédemment validé
      let nNumber: number = parseInt(setting.nNumber);
      let digit: number = parseInt(setting.nDigit);
      // pour convertir les clé dy type de calcul en symbole 
      const convertSymbol: SymbolOperator = {
        addition: "+",
        soustraction: "-",
      };
      let operator = convertSymbol[setting.typeCalcul] as OperatorType;
      // limit les nombres possible selon la quantité de nombres dans l'opération
      let limitNumber: boolean = setting.retenue === "sans retenue" && parseInt(setting.nNumber) < 6;
      // si on a un/des opération on ajoute et créer des élément operation-component selon la valeur de nNumber
      if (parseInt(nOperation) > 0) {
        for (let i = 0; i < parseInt(nOperation); i++) {
          let randomArrayNumber: number[] = createRandomArrayNumber(
            nNumber,
            digit,
            limitNumber
          );
          if (
            (setting.retenue === "avec retenue" &&
              retenueCalc(operator, ...randomArrayNumber) === true) ||
            (setting.retenue === "sans retenue" &&
              retenueCalc(operator, ...randomArrayNumber) === false) ||
            setting.retenue === "mix" ||
            setting.retenue === undefined
          ) {
            contentCalcul.innerHTML += `
              <operation-component 
                operator="${operator}"
                numbers="${randomArrayNumber}"
              >
              </operation-component>
            `;
            continue;
          }
          i--;
        }
      }
      // si nOperation égale 'addOne' on ajoute 1 seul élément operation-component dans l'élément content-calcul déjà créer
      if (nOperation === "addOne") {
        let backgroundElement =
          contentCalcul.children[contentCalcul.children.length - 2];
        for (let i = 0; i < 1; i++) {
          let randomArrayNumber: number[] = createRandomArrayNumber(nNumber, digit, limitNumber);

          if (
            (setting.retenue === "avec retenue" &&
              retenueCalc(operator, ...randomArrayNumber) === true) ||
            (setting.retenue === "sans retenue" &&
              retenueCalc(operator, ...randomArrayNumber) === false) ||
            setting.retenue === "mix" ||
            setting.retenue === undefined
          ) {
            const element = createElement("div", "") as HTMLDivElement;
            element.innerHTML = `
                <operation-component 
                  operator="${operator}"
                  numbers="${randomArrayNumber}"
                >
                </operation-component>
              `;
              // on ajoute l'élément juste avent backgroundElement
            backgroundElement.insertAdjacentElement("beforebegin", element);
            continue;
          }
          i--;
        }
      }
    }
  }
}
