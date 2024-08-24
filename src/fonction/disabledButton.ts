export function toggleDisabledButton() {
  const buttonPdf = document.querySelector<HTMLButtonElement>(".groupButton .buttonPdf");
  const inputNameFile = document.querySelector<HTMLInputElement>("header .editNameFile");
  const contentCalcul = document.querySelector<Element>("content-calcul");
  const shadowElement = contentCalcul?.shadowRoot?.children[0] as Element;
  // vérifie si le noms du fichier pdf est défini est si il y'a un élément content-calcul
  // si ce n'est pas le cas alors le bouton pour créer un pdf sera disabled
  if (
    typeof shadowElement?.innerHTML === "string" &&
    inputNameFile &&
    inputNameFile.value !== ""
  ) {
    buttonPdf?.classList.remove("disabled");
    return;
  }
  buttonPdf?.classList.add("disabled");
  return;
}
