import {css} from '../scss/style.scss'
import { reductElement } from "./fonction/reductElement";
import { retenueCalc } from "./fonction/retenueCalc";
import { randNumber, removeExtraSpace } from "./fonction/fonctionUtilitaire";

const buttonReduct = document.querySelector(".arrow ");
const generateCalc = document.querySelector(".generateurCalcul");

reductElement(generateCalc, buttonReduct);

const worksheet = document.querySelector(".worksheet");
const mainTitre = document.querySelector("header > h1");

const inputCalc = document.querySelector("#nCalc");
let inputCalc_PreviousValue = 0;

inputCalc.addEventListener('input', function(event){
  if(this.value.length > this.maxLength)
    this.value = this.value.slice(0, this.maxLength);
    
  if(parseInt(this.value, 10) > 30)
    this.value = 30;
  else if(this.value === 0)
    this.value = 0;

  if(event.data === "e" || event.data === "-" || event.data === "+" || event.data === "*" || event.data === "/" || event.data === "+" || event.data === "." || event.data === ",")
    this.value = inputCalc_PreviousValue;

  inputCalc_PreviousValue = this.value;
})

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

    // ! mettre un event pour n'utiliser que des chiffres et limiter le nombre de caratére possible à rentrer
    for (let j = 0; j <= nombres.length; j++) {
      if (j == 0) {
        calcul.innerHTML += `<p><span contenteditable="true">${nombres[j]}</span></p>`;
      } else if (nombres.length == j) {
        //ligne du résultat, le signe "=" est caché pour le remettre enlever sa class
        calcul.innerHTML += `<p><span class="invisible">=</span> ${videResultat}</p>`;
      } else {
        calcul.innerHTML += `<p><span>${operateur}</span> <span contenteditable="true">${nombres[j]}</span></p>`;
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

let namePdf = "fiche de calcul";
const fileName = document.querySelector('.fileName');
const buttonEditNamePdf = document.querySelector('header > div > button');
const modifyNamePdf = document.querySelector('#modifyNamePdf');
modifyNamePdf.value = namePdf;

//Dévoile l'élément input:text pour modifier le noms du fichier pdf
buttonEditNamePdf.addEventListener('click', function(){
  this.classList.toggle('active')
  modifyNamePdf.classList.toggle('visible');
})

const pdfContent = document.querySelector(".pdfContent");
const btnPdf = document.querySelector("#btnPdf");

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


modifyNamePdf.addEventListener('input', function(){
  fileName.textContent=`${removeExtraSpace(this.value)}.pdf`
  namePdf=removeExtraSpace(this.value)
  optPdf.filename=`${removeExtraSpace(this.value)}.pdf`
  console.log(namePdf);
})

btnPdf.addEventListener("click", () => {
  pdfContent.classList.add("active");
  html2pdf().set(optPdf).from(pdfContent).save();
});
