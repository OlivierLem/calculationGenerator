//import { retenueCalc, randNumber } from "./fonctionUtilitaire.js";

const buttonReduct = document.querySelector(".arrow ");
const generateCalc = document.querySelector(".generateurCalcul");

reductElement(generateCalc, buttonReduct);


const inputCalc = document.querySelector("#nCalc");
inputNumber(inputCalc);


const worksheet = document.querySelector(".worksheet");
const mainTitre = document.querySelector("header > h1");

const nChiffre = document.querySelector("#chiffre");
const nNombre = document.querySelector("#nombre");
const inputOperateur = document.querySelector("#operateur");
const btnGenerate = document.querySelector("#btnGenerate");
let nombres = [];
let operateur = "";
let lastOperator = undefined;

const buttonsRadio = document.querySelectorAll("input[name='retenue']");
let retenueState = 0; //0:avec retenue, 1:sans, 2:mix
let retenueBool = false; //false:pas de retenue, true: retenue

let nameTitle = "";


btnGenerate.addEventListener("click", function (e) {
  e.preventDefault();

  const titres = document.createElement("h2");
  titres.classList.add('subTitle');
  lastOperator = operateur ? operateur : undefined;

  if (inputOperateur.selectedIndex === 0) {
    operateur = "+";
    nameTitle = "Addition";
  } else if (inputOperateur.selectedIndex === 1) {
    operateur = "-";
    nameTitle = "Soustraction";
  }

  if (lastOperator === undefined || lastOperator !== operateur) {
    titres.textContent = nameTitle;
    worksheet.appendChild(titres);
  }

  const contentCalcCurrent = document.createElement("div");
  contentCalcCurrent.classList.add("contentCalc");
  worksheet.appendChild(contentCalcCurrent);

  //Etat de la retenu (0: avec, 1: sans, 2: les 2)
  for (let i = 0; i < buttonsRadio.length; i++)
    if (buttonsRadio[i].checked == true) 
      retenueState = i;

  //créer le calcul
  for (let i = 0; i < inputCalc.value; i++) {
    let calcul = document.createElement("div");
    calcul.className = "calcul";
    //créer plusieur nombre aléatoirement
    for (let n = 0; n < nNombre.value; n++) {
      let nombre;
      let chiffre = "";

      for (let c = 0; c < nChiffre.value; c++) {
        //console.log("c: " + c);
        if (c > 0) {
          chiffre += randNumber(0, 9).toString();
        } else if (c === 0) {
          chiffre += randNumber(1, 9).toString();
        }

        if (nChiffre.value - 1 === c) {
          //console.log(chiffre);
          nombre = parseInt(chiffre);
        }
      }

      nombres.push(nombre);
      if (nNombre.value - 1 === n) {
        //console.log(nombres);
        retenueBool = retenueCalc(operateur, ...nombres);
        console.log(retenueBool);
        if (
          (retenueState === 0 && retenueBool != true) ||
          (retenueState === 1 && retenueBool != false) ||
          retenueBool === "négatif"
        ) {
          n = -1;
          nombres = [];
        }
      }
    }

    //la zone des réponses vide pour le calcul
    let videResultat = "";
    for (let i = 0; i < nChiffre.value; i++) {
      videResultat += ""; //paramétre possible ( " ", _ )
    }

    for (let j = 0; j <= nombres.length; j++) {
      if (j == 0) {
        calcul.innerHTML += `<p>${nombres[j]}</p>`;
      } else if (nombres.length == j) {
        //ligne du résultat, le signe "=" est caché pour le remettre enlever sa class
        calcul.innerHTML += `<p><span class="invisible">=</span> ${videResultat}</p>`;
      } else {
        calcul.innerHTML += `<p><span>${operateur}</span> ${nombres[j]}</p>`;
      }
    }

    nombres = [];
    worksheet.lastChild.appendChild(calcul);
  }
});

const btnRemove = document.querySelector("#btnRemove");
btnRemove.addEventListener("click", () => {
  // on reset ces variables
  worksheet.innerHTML = "";
  lastOperator = undefined;
  operateur = undefined;
});

const pdfContent = document.querySelector(".pdfContent");
const btnPdf = document.querySelector("#btnPdf");
let namePdf = "fiche de calcul";

/** 
 * ! mettre dans un element section les .contentCalc 
 * ! qui se suivent et qui ont le même opérateur 
 * ! dans la variable optPdf modifier le paramétre pagebreak.after
 * ! par la classe du nouveau élément
*/
let optPdf = {
  margin:       0.2,
  filename:     `${namePdf}.pdf`,
  pagebreak:    { mode: 'avoid-all' /* , after:'.contentCalc'  */},
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 1, scrollY: 0},
  jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
};

btnPdf.addEventListener("click", () => {
  pdfContent.classList.add("active");
  html2pdf().set(optPdf).from(pdfContent).save();
});
