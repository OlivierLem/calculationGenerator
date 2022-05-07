/**
 * * Boutton qui switch entre la class active et inactive
 * * Il cache ou non le contenu de l'élment grâce à une classe active
 * @param {HTMLElement} element 
 * @param {buttonElement} button 
 */

export function reductElement(element, button){
    button.addEventListener("click", function () {
      if (this.classList.contains("active") === true) {
        this.classList.add("inactive");
        this.classList.remove("active");
        element.classList.remove("active");
      } 
      else if (this.classList.contains("inactive") === true) {
        this.classList.remove("inactive");
        this.classList.add("active");
        element.classList.add("active");
      }
    });
  }