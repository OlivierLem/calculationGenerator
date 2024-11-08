import { formComponent } from "./component/FormCalcul";
import { OperationComponent } from "./component/OperationComponent";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toggleDisabledButton } from "./fonction/disabledButton";
import { ContentCalcul } from "./component/ContentCalcul";
import { PdfSetting } from "./types/pdfSetting";

formComponent; // appel de l'event submit du composant form
const worksheet = document.querySelector<HTMLDivElement>(".worksheet"); // fiche de calcul
const generateCalculElement =
  document.querySelector<HTMLDivElement>(".generateCalcul");
const buttonReductComponent =
  document.querySelector<HTMLButtonElement>(".reductComponent");

// element pour la modification du noms de fichier pdf
let nameFile: string = "fiche de calcul";
const nameFileElement = document.querySelector<HTMLSpanElement>(".nameFile");
const inputContainer =
  document.querySelector<HTMLDivElement>(".inputContainer");
const inputNameFile = document.querySelector<HTMLInputElement>(
  "header .editNameFile"
);
const buttonEditNameFile =
  document.querySelector<HTMLButtonElement>(".editFile");

// boutons pour controler la création d'un fiche calcul
const buttonCreatePdf = document.querySelector<HTMLButtonElement>(
  ".groupButton .buttonPdf"
);
const buttonDelete = document.querySelector<HTMLButtonElement>(".deleteButton");

if (inputNameFile) inputNameFile.value = nameFile;
if (nameFileElement) nameFileElement.textContent = nameFile + ".pdf";

// evenement pour changer le nom du fichier pdf qui sera créer
inputNameFile?.addEventListener("keyup", (e: KeyboardEvent) => {
  toggleDisabledButton();

  let currentElement = e.currentTarget as HTMLInputElement;
  if (inputNameFile && inputNameFile.value.length <= 30 && nameFileElement) {
    nameFileElement.textContent = currentElement.value + ".pdf";
    nameFile = inputNameFile.value;
  } else {
    inputNameFile.value = nameFile;
  }
});

// evenement pour afficher/caché l'élément input pour modifier le noms du fichier pdf créer
buttonEditNameFile?.addEventListener("click", () => {
  inputContainer?.classList.toggle("active");
});

// evenement pour afficher/caché le formulaire pour ajouter.supprimer des opération et créer le fichier pdf
buttonReductComponent?.addEventListener("click", () => {
  generateCalculElement?.classList.toggle("active");
});

// ! si il y'a trop d'élément la page est compressé au lieu de créer une 2e page
buttonCreatePdf?.addEventListener("click", async (e: any) => {
  let isButtonDisabled: boolean =
    e.currentTarget.classList.contains("disabled");
  // si le fichier pdf à  créer à un noms et à du contenu alors le fichier se créer
  if (worksheet && nameFile !== "" && isButtonDisabled === false) {
    let pdf: jsPDF = new jsPDF("portrait", "mm", "a4", true);
    let listPage = worksheet.children as HTMLCollectionOf<HTMLDivElement>;
    for (let i = 0; i < listPage.length; i++) {
      let page = listPage[i];
      console.log(i > 0 ? 'yes' : 'no' )
      await html2canvas(page).then((canvas) => {
        const pdfSetting: PdfSetting = {
          imgData: canvas.toDataURL("image/png"),
          imgWidth: canvas.width,
          imgHeight: canvas.height,
          pdfWidth: pdf.internal.pageSize.getWidth(),
          pdfHeight: pdf.internal.pageSize.getHeight(),
          get ratio() {
            return Math.min(
              this.pdfWidth / this.imgWidth,
              this.pdfHeight / this.imgHeight
            );
          },
          // position sur l'axe x et y du contenu
          get imgX() {
            return (this.pdfWidth - this.imgWidth * this.ratio) / 5;
          },
          imgY: 4,
        };
        const { imgData, imgWidth, imgHeight, ratio, imgX, imgY } = pdfSetting;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        // ajoute une page si il y'a une div.page qui succéde celle courante
        if(i >= 0 && i < (listPage.length - 1)) {
          pdf.addPage(imgData, 'portrait')
        }
      });
    }

    pdf.save(`${nameFile}.pdf`);
  }
});

// événement pour supprimer un élément personaliser content-calcul déjà créer
buttonDelete?.addEventListener("click", () => {
  const contentCalcul = document.querySelector<HTMLDivElement>(
    "content-calcul:last-of-type"
  );
  const previousElement =
    contentCalcul &&
    (contentCalcul.parentElement?.children[
      contentCalcul.parentElement?.children.length - 2
    ] as HTMLDivElement | HTMLHeadingElement);
  if (previousElement && previousElement.classList.contains("subtitleCalc")) {
    previousElement.remove(); // si il ne reste qu'un titre au dessus des élément content-calcul on supprimer aussi le titre
  }
  if (contentCalcul) {
    contentCalcul.remove(); // supprimer content-calcul
  }
  toggleDisabledButton();
});

const radioGroup = document.getElementById("inputRetenue") as HTMLDivElement;
const listRadioButton = document.querySelectorAll<Element>(
  ".radioGroup input[name='retenue']"
);
const selectNumber = document.getElementById("nNumber") as HTMLSelectElement;

// si on change la valeur du select et quelle est supérieur à 5 on ne peut plus choisir si il y'a une retenue
selectNumber.addEventListener("change", (e: Event) => {
  const selectElement = e.currentTarget as HTMLSelectElement;
  if (parseInt(selectElement.value) > 5) {
    radioGroup?.classList.add("disabled");
    for (const radioButton of listRadioButton) {
      radioButton.setAttribute("disabled", "");
    }
  } else {
    radioGroup?.classList.remove("disabled");
    for (const radioButton of listRadioButton) {
      radioButton.removeAttribute("disabled");
    }
  }
});

// On définie ces composant personalisé
customElements.define("operation-component", OperationComponent);
customElements.define("content-calcul", ContentCalcul);
