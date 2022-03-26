export const retenueCalc= (opérateur,...nombres) => {
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
        addZero =undefined      // supression de la variable

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
                        //console.log(testFirstNombre+ " - "+test);
                        console.log("pas de retenue dans le calcul");       
                        return false
                    } else if(test > testFirstNombre){
                        //console.log(testFirstNombre+ " - "+test);
                        console.log("il y a une retenue dans le calcul");
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
export const randNumber= (min,max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}