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

function calcular(){
    //console.log(document.getElementsByClassName("cal")[0].textContent);
    document.getElementById('result').innerHTML = formatNumber.new(eval(document.getElementsByClassName("cal")[0].textContent));
}
