const randNumber= (min,max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

const retenueCalc= (opérateur="+",...nombres) => {
    let nombre=[]             //Tableaux à 2 dimension vide (si l'opérateur est - on ne récupére pas le premier nombre)      
    let chiffre =[]
    let firstNombre = []      // pour la soustraction récupére juste le premier nombre

    function returnInt(element) {
        return parseInt(element, 10);
      }
    /* bloucle qui stock le nombre actuelle dans le tableau chiffre
    /* puis on inverse le tableaux chiffre et on envoie le tableau dans la variable nombre */   
    if(opérateur==="+"){
        for(let n of nombres){
            let chiffre=n.toString().split('').map(returnInt);
            nombre.push(chiffre.reverse())
       }
       nombre.sort()    

    } else if(opérateur==="-"){
        for(let i=0; i < nombres.length; i++){
            if(i===0){
                firstNombre=nombres[i].toString().split('').map(returnInt).reverse();
            }else{
                let chiffre=nombres[i].toString().split('').map(returnInt);
                nombre.push(chiffre.reverse())
            }
           
       }
    }
       
    let test = 0            // variable qui permettra de vérifié si l'une des rangé de nombre à une retenue 
    let testFirstNombre     // récupére la valeur du premier nombre testé
    let testLine=0          // permet de verifié la colonne actuelle 
    let addZero = 1         // variable qui ajoutera 1 zéro aux nombre pour ne pas vidé les tableaux 

    for(let i=0; i < nombre.length;i++){
    if(addZero ===1)
        addZero = nombre.length
    else
        delete addZero      // supression de la variable

        test+= nombre[i].shift() // on fait la somme des premier éléments des tableaux
        testFirstNombre = firstNombre[testLine]

        if(firstNombre.length < nombre[0].length){
            firstNombre.push(0)         // on rajoute des 0 à firstNombre pour qu'il est autant de chiffres que les autres nombres
        }
        for(let j=0; j< nombre[i].length; j++){
                
                if(nombre[i].length<(nombre[0].length || firstNombre.length)){
                    nombre[i].push(0)                   // pour que tout les tableaux est la même taille on rajoute des 0 au tableaux
                } else if(nombre[i].length === nombre[0].length && addZero > 0){
                    nombre[i].push(0)                   // on ajoute des 0 à la fin de chaque tableaux pour qu'il ne soit pas vidé
                    addZero--
                }
              if(opérateur === "+"){
                    if(nombre[i].length === 1 && test < 10){
                        console.log("pas de retenue dans le calcul");   
                        return false                // la somme des nombres ne possédent pas de retenue on return false
                    } else if(test>=10){
                        console.log("retenue dans le calcul");   
                        return true                  // la somme des nombres possédent au moins une  retenue on return true
                    }
              } else if(opérateur === "-"){
                    if(nombre[i].length === 1 && test <= testFirstNombre){
                        console.log(testFirstNombre+ " - "+test);
                        console.log("pas de retenue dans le calcul");       
                        return false
                    } else if(test > testFirstNombre){
                        //console.log(testFirstNombre+ " - "+test);
                        //console.log("il y a une retenue dans le calcul");
                        return true
                    }
              }
               

        }
        // si la colone testé n'a pas de retenue on réinitialise les variable i et test 
        if(opérateur === "+"){
            if(test < 10 && (nombre.length-1) == i){
                //console.log(test);                // vérifie la somme final des chiffres de la colonne en cours   
                testLine++          
                //console.log("pas de retenu dans la colonne " + testLine);
                i=-1
                test=0 
            } 
        } else if(opérateur ==="-"){
            if(test <= testFirstNombre && (nombre.length-1) == i){
                testLine++  
                //console.log(testFirstNombre+ " - "+test);
                //console.log("pas de retenu dans la colonne " + testLine);
                i=-1
                test=0 
            }
        }
        
    }
    
}


const reduct = document.querySelector('.arrow ')
const generateCalc =document.querySelector('.generateurCalcul')



reduct.addEventListener('click',function(){

    /* reduct switch entre la class active et inactive
    /* il cache ou non le contenu du formulaire */
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

const contentCalc= document.querySelector('.contentCalc')
const titre=document.querySelector('header > h1')

const nChiffre= document.querySelector('#chiffre')
const nNombre= document.querySelector('#nombre')
const inputOperateur= document.querySelector('#operateur')
const btnGenerate= document.querySelector('#btnGenerate')
const btnRemove= document.querySelector('#btnRemove')
const inputCalc= document.querySelector('#nCalc')

//event pour n'écrire que des chiffres
inputCalc.addEventListener('keypress', (event) =>{
    if(event.keyCode < 48 || event.keyCode > 57) 
        event.preventDefault()
})

let nombres=[]


let operateur=""

const buttonsRadio= document.querySelectorAll("input[name='retenue']")
let retenueState= 0       //0:avec retenue, 1:sans, 2:mix
let retenueBool=false       //false:pas de retenue, true: retenue

btnGenerate.addEventListener('click',function (e){
    e.preventDefault()

    if(inputOperateur.selectedIndex===0){
        operateur='+'
        titre.textContent='Addition'
    } 
    else if(inputOperateur.selectedIndex===1){
        operateur='-'
        titre.textContent='Soustraction'
    }

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
        // console.log('boucle calcul: ' + j);
        }
        nombres=[] 
        contentCalc.appendChild(calcul)
    }
})
btnRemove.addEventListener('click', function(){
    contentCalc.innerHTML= ""
    titre.innerHTML=""
    console.log(contentCalc + " " + titre);
})

const pdfContent = document.querySelector('.pdfContent')
const btnPdf = document.querySelector('#btnPdf')
const body=document.body
btnPdf.addEventListener('click',function(){
    console.log('ici');
    pdfContent.classList.add('active')
    html2pdf().from(pdfContent).save()
    
   
})
