import { createElement } from "../fonction/createElement";
import { toggleDisabledButton } from "../fonction/disabledButton";
import { FormType } from "../types/form";


const worksheet= document.querySelector<HTMLElement>(".worksheet");
export const formComponent = document.querySelector<HTMLFormElement>("form.generateCalcul");

formComponent?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  // récupére les donnée du formulaire et le transforme en objet
  const formData: FormData = new FormData(formComponent); 
  const entries = formData.entries();
  const obj: any = Object.fromEntries(entries);
  formValidate(obj); 
});

// On créer l'élément content-calcul avec les données du formulaire 
const formValidate = (setting: FormType) => {
  const subtitleCalc = document.querySelector(".subtitleCalc:last-of-type") as HTMLHeadingElement;
  
  // si on a pas de sous-titre lié au type d'opération ('addition'/'soustraction') on créer un et on l'ajoute
  if (subtitleCalc?.textContent !== setting.typeCalcul) {
    const subtitleElement = createElement("h5","subtitleCalc",setting.typeCalcul) as HTMLHeadingElement;
    worksheet?.appendChild(subtitleElement);
  }
  
  const contentCalcul = createElement('content-calcul', '', '', {
    nOperation: setting.nOperation,
    typeCalcul: setting.typeCalcul,
    nNumber: setting.nNumber,
    nDigit: setting.nDigit
  }) as HTMLElement;
  
  if(setting.retenue) {
    contentCalcul.setAttribute('retenue', setting.retenue)
  }
  worksheet?.appendChild(contentCalcul)
  toggleDisabledButton()
};

