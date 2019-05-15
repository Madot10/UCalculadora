let UC;

function add(simb){
    //si esta un 0 >> primer digito
    if(document.getElementsByClassName("cal")[0].textContent == '0')
        clean(false);

    document.getElementsByClassName("cal")[0].innerHTML += simb;
}

function clean(){
    let str = document.getElementsByClassName("cal")[0].textContent;
    let nstr;

    //Al eliminar UC
    if( str[str.length-1] == 'C'){
        nstr = str.substring(0, str.length-1);
        nstr = nstr.substring(0, nstr.length-1);
    }else{
        nstr = str.substring(0, str.length-1);
    }

    //si queda vacio >> poner 0
    if(!(str== 0) && nstr == ''){
        nstr = '0';
    }

    document.getElementsByClassName("cal")[0].textContent = nstr;
}

function cleanAll(){
    document.getElementsByClassName("cal")[0].innerHTML = '0';
    document.getElementById('result').innerHTML = '0';
}

function preformatUC(allOpe){
    let start = 0;
    let i = allOpe.indexOf("UC");

    //Encontramos / Verificamos a Der e Izq
    while(i != -1){
        i = allOpe.indexOf("UC", start);
        
        
        //DER
        let der = allOpe.substring(i-1, i);
        if(der.match(/([0-9])/g)){
            //Hay numero
            allOpe = allOpe.substring(0, i) + "*" + allOpe.substring(i, allOpe.length);
        }
        //IZQ
        let izq = allOpe.substring(i+2, i+3);
        if(izq.match(/([0-9])/g)){
            //Hay numero
            allOpe = allOpe.substring(0, i+2) + "*" + allOpe.substring(i+2, allOpe.length+1);
        }
        start = i+2;
    }
    //console.log(i, allOpe, der.match(/([0-9])/g), izq.match(/([0-9])/g));
    return allOpe;
}

function calcular(){
    //console.log(document.getElementsByClassName("cal")[0].textContent);
    let operations = preformatUC(document.getElementsByClassName("cal")[0].textContent);
    document.getElementById('result').innerHTML = formatNumber.new(eval(operations));
}
