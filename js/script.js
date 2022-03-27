import { retenueCalc, randNumber } from "./fonctionUtilitaire.js";

const reduct = document.querySelector('.arrow ')
const generateCalc =document.querySelector('.generateurCalcul')

reduct.addEventListener('click',function(){

    /* reduct switch entre la class active et inactive
     * il cache ou non le contenu du formulaire */
    if(this.classList.contains('active')===true){
        this.classList.add('inactive')
        this.classList.remove('active')
        generateCalc.classList.remove('active')
        
    }
    else if(this.classList.contains('inactive')===true){
        this.classList.remove('inactive')
        this.classList.add('active')
            generateCalc.classList.add('active')
    }
    //console.log(this.className);
})

const inputCalc= document.querySelector('#nCalc')

//event pour n'écrire que des chiffres
inputCalc.addEventListener('keypress', (event) =>{
    if(event.keyCode < 48 || event.keyCode > 57) 
        event.preventDefault()
})

const worksheet= document.querySelector('.worksheet')
const mainTitre=document.querySelector('header > h1')

const nChiffre= document.querySelector('#chiffre')
const nNombre= document.querySelector('#nombre')
const inputOperateur= document.querySelector('#operateur')
const btnGenerate= document.querySelector('#btnGenerate')
const btnRemove= document.querySelector('#btnRemove')

let nombres=[]
let operateur=""
let lastOperator=undefined

const buttonsRadio= document.querySelectorAll("input[name='retenue']")
let retenueState= 0       //0:avec retenue, 1:sans, 2:mix
let retenueBool=false       //false:pas de retenue, true: retenue

let nameTitle = ""
btnGenerate.addEventListener('click',function (e){
    e.preventDefault()

    const titres= document.createElement('h2')
    lastOperator= operateur
    
    if(inputOperateur.selectedIndex===0){
        operateur='+'
        nameTitle='Addition'
    } 
    else if(inputOperateur.selectedIndex===1){
        operateur='-'
        nameTitle='Soustraction'
    }
    if(lastOperator != undefined){
        if(lastOperator !== operateur){
            titres.textContent= nameTitle;
            worksheet.appendChild(titres)
        }
    }
    const contentCalcCreate= document.createElement('div')
    contentCalcCreate.classList.add("contentCalc")
    worksheet.appendChild(contentCalcCreate)

    //Etat de la retenu (0: avec, 1: sans, 2: les 2)
    for(let i=0; i < buttonsRadio.length; i++)
        if(buttonsRadio[i].checked == true)
            retenueState = i
    
    //créer le calcul
    for(let i=0; i<inputCalc.value; i++){
        let calcul=document.createElement('div')
        calcul.className='calcul'
        //créer plusieur nombre aléatoirement
        for(let n=0; n < nNombre.value; n++){
            let nombre
            let chiffre=""

            for(let c=0; c < nChiffre.value; c++){
                
                //console.log("c: " + c);
                if(c>0){
                    chiffre+= randNumber(0,9).toString()
                }
                else if(c===0){
                    chiffre+= randNumber(1,9).toString()
                } 

                if((nChiffre.value-1)===c){
                    
                    //console.log(chiffre);
                    nombre = parseInt(chiffre)
                    /* if(nombre<=9){
                        c=-1
                        chiffre=""
                    } */
                } 
            }
            
            nombres.push(nombre)
            if((nNombre.value-1)===n){
                //console.log(nombres);
                retenueBool= retenueCalc(operateur, ...nombres)
                //console.log(retenueBool);       
                if(retenueState===0 && retenueBool != true){
                    n=-1
                    nombres=[]
                } else if(retenueState===1 && retenueBool != false){
                    n=-1
                    nombres=[]
                }          
            }
        }

        //la zone des réponses vide pour le calcul    
        let videResultat=""
        for(let i=0; i < nChiffre.value; i++){
            videResultat+=""    //paramétre possible ( " ", _ )
        }

        for(let j=0; j<=nombres.length; j++){
            if(j==0){
                calcul.innerHTML+=`<p>${nombres[j]}</p>`
            }else if(nombres.length==j){ 
                //ligne du résultat, le signe "=" est caché pour le remettre enlever sa class
                calcul.innerHTML+=`<p><span class="invisible">=</span> ${videResultat}</p>`
            }else{
                calcul.innerHTML+=`<p><span>${operateur}</span> ${nombres[j]}</p>`
            }
        }

        nombres=[] 
        worksheet.lastChild.appendChild(calcul)
    }
})

btnRemove.addEventListener('click', () =>  worksheet.innerHTML= "")

const pdfContent = document.querySelector('.pdfContent')
const btnPdf = document.querySelector('#btnPdf')
btnPdf.addEventListener('click',function(){
    console.log('ici');
    pdfContent.classList.add('active')
    html2pdf().from(pdfContent).save()
})
