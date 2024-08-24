// fonction pour créer un élément html avec balise, class et textcontent
export function createElement(
  balise: string,
  className: string[] | string = "",
  textContent: string = "",
  attributes: {} = {}
) {
  const element: HTMLElement = document.createElement(balise);
  if (className) {
    const classElement: string | string[] = className;
    if (typeof classElement === "string") {
      element.classList.add(classElement);
    } else {
      for (const c of classElement) {
        element.classList.add(c);
      }
    }
  }
  if (textContent) {
    element.textContent = textContent;
  }
  if(attributes) {
    let attributesKey: string[] = Object.keys(attributes);
    let attributesValue: string[] = Object.values(attributes);
    for (let i = 0; i < attributesKey.length; i++) {
      element.setAttribute(attributesKey[i], attributesValue[i])
    }
  }
  return element;
}
