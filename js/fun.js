// 22/02/2018 Madot Ucab
//console.log(jsonCarrera);

//variables
let inOpt;
let ValueUC;
let optSl;
let jdatasl;

let stSede = false;
let stPer = false;
var Perio;
var Tbs;

var modal;
var span;

//SYSTEM TABLA MATERIA
//inicia en 1 (0=null)
var ArrMat = [null,true,false,false,false,false,false,false,false,false,false];
//inicia en 1
var listFila;

//SYSTEM TABLE
var ColorArray = ['#fed20180','#34b2e466'];
var ScolorUsed = false;

//SYSTEM uc
//var Auc = [345000, 1400000, 1400] ;
var isFuerte = true;
let sum;

//DIVs system
let menuDiv;
let CalDiv;
let loadDiv;
let NotDiv;

let SusDiv;
let NsusDiv;
    let acPdiv;
    let nePdiv;

window.onload = function() {
    document.getElementById("sl_carrera").selectedIndex = 0;
    document.getElementById("sl_sede").selectedIndex = 0;

    // Get the modal
    modal = document.getElementById('myModal');
    moig = document.getElementById('IgModal');

    // Get the <span> element that closes the modal
    span = document.getElementsByClassName("close")[0];

    //alert("Realizando cambios con respeto a MONTO A PAGAR en este primer periodo. Intente más tarde!");
    listFila = document.getElementsByTagName("tr");

    //LOAD SYSTEM
    //divs

    menuDiv = document.getElementById("menu");
    CalDiv = document.getElementById("container");
    NotDiv = document.getElementById("contNoti");
    loadDiv = document.getElementsByClassName("loader")[0];

    SusDiv = document.getElementById("susc");
    NsusDiv = document.getElementById("Nsusc");

    loadDiv.style.display = "none";
    menuDiv.style.display = "block";

    acPdiv = document.getElementById("accept");
    nePdiv = document.getElementById("negate");

}

//Load Calculadora
function OpenCalculadora(){
    let CalDiv = document.getElementById("container");
    let menuDiv = document.getElementById("menu");

    menuDiv.style.display = "none";
    CalDiv.style.display = "block";
}

//Open div Page
async function OpenDiv(divName){

    switch (divName) {
        case 'calculadora':
            menuDiv.style.display = "none";
            NotDiv.style.display = "none";
            CalDiv.style.display = "block";
            NsusDiv.style.display = "none";
            SusDiv.style.display = "none";

            break;

        case 'menu':
            menuDiv.style.display = "block";
            NotDiv.style.display = "none";
            CalDiv.style.display = "none";
            NsusDiv.style.display = "none";
            SusDiv.style.display = "none";

            break;

        case 'notificaciones':
            CalDiv.style.display = "none";
            menuDiv.style.display = "none";
            

            let valSus = await checkSusc();
            //let valSus = false;

            // Revisamos estado de suscripcion
           //console.log("ValSUS: ");
          //console.log(valSus);

            if(valSus == true){
                //esta suscrito
                loadDiv.style.display = "block";
                LoadConfig();

                SusDiv.style.display = "block";
                NsusDiv.style.display = "none";

            }else{
                //no esta
                SusDiv.style.display = "none";
                NsusDiv.style.display = "block";

                //Chequeamos si pop fue bloqueado o no
                //statePermission()
                if(statePermission()){
                    //aceptada
                    lauchPermission();

                    acPdiv.style.display = "block";
                    nePdiv.style.display = "none";
                }else{
                    //bloqueada

                    acPdiv.style.display = "none";
                    nePdiv.style.display = "block";
                }

            }

            NotDiv.style.display = "block";
            break;

        default:
            break;
    }
}

//load config notificaciones
async function LoadConfig(){

    let jsonTags = await getTagsJson();

        loadDiv.style.display = "none";
        //console.log("Json tag");
        //console.log(jsonTags);

        //carrera
        document.getElementById('carreraRes').value = jsonTags.user_type;

        //Conf General
        document.getElementById('SavisosUcab').checked = (jsonTags.avisosUcab == "true");
        document.getElementById('SeventosUcab').checked = (jsonTags.eventosUcab == "true");
        document.getElementById('SeventosEst').checked = (jsonTags.eventosEst == "true");
        document.getElementById('SserPublico').checked = (jsonTags.serPublico == "true");
        document.getElementById('Spromo').checked = (jsonTags.promo == "true");

        //Intereses
        document.getElementById('Sagrup').checked = (jsonTags.agrup == "true");
        document.getElementById('Smodels').checked = (jsonTags.models == "true");
        document.getElementById('Sdeportes').checked = (jsonTags.deportes == "true");
        document.getElementById('Svoluntariado').checked = (jsonTags.voluntariado == "true");
    
}

//Periodo Selecionado
function OnPerSelect(){
    var slP = document.getElementById("sl_per");
    Perio = slP.value;
    Tbs = slP.selectedOptions[0].dataset.bs;
    //ValueUC =  Auc[Perio];
    ValueUC =  slP.selectedOptions[0].dataset.uc;
    stPer = true;

    //volvemos visible
    var pUC = document.getElementById("pVUC");
    //document.getElementById("ucShow").innerHTML = formatNumber.new(ValueUC, "Bs.F. ");
    pUC.style.display = "block";
    var suBs = document.getElementById("uBS");

    switch (Tbs) {
        case "F":
            //BS.F
            isFuerte = true;
            suBs.innerHTML = "Bs.F";
            document.getElementById("ucShow").innerHTML = formatNumber.new(ValueUC, "Bs.F. ");
        break;

        case "S":
            //BS.S.
            isFuerte = false;
            suBs.innerHTML = "Bs.S";
            document.getElementById("ucShow").innerHTML = formatNumber.new(ValueUC, "Bs.S. ");
        break;

        default:
            break;
    }

    

    //Hacemos recalculo de todo?
    for(y = 0; y < 10; y++){
        OnChangeMat(y);
    }

    //ocultamos tabla pagos antigua?
   /* var x = document.getElementById("tbTotal");
    x.style.display = "none";

    var x = document.getElementById("tbTotal2nd");
    x.style.display = "none";*/

    let table = document.getElementById('tablaPago');
    table.innerHTML ='';
}

//AddNew Materia
function AddNewMat(){
    var ix = ArrMat.indexOf(false);

    if(ix != -1){
        ArrMat[ix] = true;
        listFila[ix].style.display = "table-row";  
        //console.log(ix);
    }else{
        alert("Numero maximo de materias alcanzadas!");
    }  
}

//delete materia
function OnDeleteMat(iPos){
    console.log("Delete I: "+ iPos);
    ArrMat[iPos] = false;
    listFila[iPos].style.display = "none"; 
    //limpiamos fila
    CleanFila(iPos-1);
    //Recalculamos el total
    TotalUC();
}

//limpiar fila
function CleanFila(pos){
    //contadores inician en 0

    var sMat = document.getElementsByClassName("sl_mat")[pos];
    //reset a "seleccione"
    sMat.selectedIndex = 0;

    var spuc = document.getElementsByClassName("uc")[pos];
    var sptax = document.getElementsByClassName("tax")[pos];
    var spvc = document.getElementsByClassName("valuC")[pos];

    spuc.innerHTML = '';
    sptax.innerHTML = '';
    spvc.innerHTML = '';
}

//open modals segun string
function LauchModal(tModal){
    switch (tModal) {
        case "ig":
            moig.style.display = "block";
            break;

        default:
            break;
    }
}

// When the user clicks on <span> (x), close the modal
function closeModal(tModal) {
    switch (tModal) {
        case "ig":
        moig.style.display = "none";
            break;

        default:
            break;
    }
    
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == moig) {
        moig.style.display = "none";
    }
}

//Send tag for OneSignal
function LoadTag(tagname, tagval){


    if(tagname == 'user_type'){
        var sltag = document.getElementById("carreraRes");
        var tuser = sltag.options[sltag.selectedIndex].value;

        OneSignal.push(function () {
        
            OneSignal.sendTag("user_type",tuser);
            OneSignal.sendTag("user_completed","v2");
        });
    }else{
        OneSignal.push(function () {
            OneSignal.sendTag(tagname,tagval);
            OneSignal.sendTag("user_completed","v2");
        });
    }
    //retornamos a web
    //location.href="https://madot10.github.io/UCalculadora/";
    
}

//Fun retorna jsonData de carrera
function GetJsonDataCarrera(tx){
    tx = tx.replace(/\s/g,'');
    tx = tx.toLowerCase();

    //console.log("TX " + tx);
   return tx = window[tx];
}


//cargar datos de carrera
function OnLoadCarrera(){

    if(stPer){
        let sl = document.getElementById("sl_carrera");
        optSl = sl.options[sl.selectedIndex].value;

        let optText = sl.options[sl.selectedIndex].text;
        jdatasl = GetJsonDataCarrera(optText);
        
        //console.log(jdatasl);

        CleanSpace();
        //console.log(optSl);

        /* inOpt = jsonCarrera.findIndex(function(item, i){
            return item.carrera === optSl
        });
    */
        //console.log(inOpt);
        //console.log(jsonCarrera[inOpt]);
        
        var tb = document.getElementsByClassName("tabM")[0];
        tb.style.visibility = "visible";
        
        document.getElementById("sl_sede").selectedIndex = 0;
        //document.getElementById("sl_coop").selectedIndex = 0;

        let spInfo2 = document.getElementById("info2").innerHTML = "";
        let spInfo = document.getElementById("info").innerHTML = "";

        /*
        var x = document.getElementById("tbTotal");
        x.style.display = "none";
        */
        let table = document.getElementById('tablaPago');
        table.innerHTML ='';

        ListMaterias();
    }else{
        //Periodo no selecionada
        alert("¡Debe seleccionar un periodo para el valor de la UC!");
        let sl = document.getElementById("sl_carrera");
        sl.selectedIndex = 0;

    }
}

//cargar  listas de materias
function ListMaterias(){
    let selectMat = document.getElementsByClassName("sl_mat");

    //borramos todo en listas
    for(i = 0; i < selectMat.length; i++){
        //console.log(i);
        selectMat[i].options.length = 0;
    }

    for(i = 0; i < selectMat.length; i++){
        //console.log(i);
        selectMat[i].options[selectMat[i].options.length] = new Option("Seleccione", i);
            for(x = 0; x < jdatasl.length; x++){
                var textToshow = "(" + jdatasl[x].Semestre + ") " + jdatasl[x].Asignatura;

                selectMat[i].options[selectMat[i].options.length] = new Option(textToshow, x);
            }
        
    }
}

//limpiador de campos
function CleanSpace(){
    let spUC = document.getElementsByClassName("uc");
    let spTAX = document.getElementsByClassName("tax");
    let spVc = document.getElementsByClassName("valuC");

    for(y = 0; y < 10; y++){
        spUC[y].innerHTML = '';
        spTAX[y].innerHTML = '';
        spVc[y].innerHTML = '';
    }

    let spTU = document.getElementById("TotalUC");

    spTU.innerHTML = '';
/*
    let sp75 = document.getElementById("der75");
    let sp60 = document.getElementById("sem60");
    let spMar = document.getElementById("marzo");
    let spAbr = document.getElementById("abril");
    let spMay = document.getElementById("mayo");

*/
    let table = document.getElementById('tablaPago');
    table.innerHTML ='';
/*
    sp75.innerHTML= '';
    sp60.innerHTML = '';
    spMar.innerHTML = '';
    spAbr.innerHTML = '';
    spMay.innerHTML = '';
    */
}


//Cambio de materia
function OnChangeMat(ind){
    let spUC = document.getElementsByClassName("uc")[ind];
    let spTAX = document.getElementsByClassName("tax")[ind];
    let spVc = document.getElementsByClassName("valuC")[ind];
    let selectMat = document.getElementsByClassName("sl_mat")[ind];

    let asig = selectMat.options[selectMat.selectedIndex].text;

    //Materia o seleccione
    if(asig == "Seleccione"){

        spUC.innerHTML = '';
        spTAX.innerHTML = '';
        spVc.innerHTML = '';

    }else{

        //eliminamos el semestre de la opcion a buscar
        //( = 0
        //Encontremos ")"
        var n = asig.indexOf(")") + 2;
        var newOpt = asig.substring(n, asig.length);
        //console.log(newOpt);

        //encontramos el index de la asignatura
        indAsig = jdatasl.findIndex(function(item, i){
            return item.Asignatura === newOpt
        });


        spUC.innerHTML = FixUC(jdatasl[indAsig].Tax, jdatasl[indAsig].UC);
        spTAX.innerHTML = jdatasl[indAsig].Tax;
        spVc.innerHTML = CalculateValueUC(jdatasl[indAsig].Tax, jdatasl[indAsig].UC);

        //mandamos las uc al total
        
    }
    TotalUC();
}
//Arregla uc cambiado en el archivo debido al V y SP
function FixUC(taxNum, ucnum){
    //console.log(taxNum);
    
    if(taxNum){
        if( taxNum.includes("(V)") || taxNum.includes("(SP)")){
            //si es una modalida sp y v 
            //descontamos el 0.72
            let k = Number(ucnum) * 0.72;
            //console.log("K2 " + k);
            return Math.round(k);
        }else{
            //console.log(ucnum);
            return Math.round(Number(ucnum));
        }

    }
    return 0;
}

function TotalUC(){
    let spVuc = document.getElementById("TotalUC");
    var tvuc = 0;
    let spUC = document.getElementsByClassName("uc");
    let spTAX = document.getElementsByClassName("tax");

    //recorre todos los uc space
    for(i = 0; i < 10; i++){

        tvuc += Number(spUC[i].innerHTML);
        //console.log("T " + tvuc); 
    }
    
    spVuc.innerHTML = tvuc;
}

// tomado de http://www.yoelprogramador.com/formatear-numeros-con-javascript/
var formatNumber = {
    separador: ".", 
    sepDecimal: ',', 
    formatear:function (num){
    num +='';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    return this.simbol + splitLeft +splitRight;
    },
    new:function(num, simbol){
    this.simbol = simbol ||'';
    return this.formatear(num);
    }
}

//Encargado de calcular valor segun recargos
function CalculateValueUC(taxo, uc){
    //console.log(taxo.toString());
    var taxN = taxo.replace( /^\D+/g, '');

    switch(taxN){
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        //sin recargo
            //console.log("sin recargo");

            return formatNumber.new(Math.round(uc * ValueUC));
        break;

        case "7":
        case "8":
        case "9":
        //+ 30%
            //console.log("+ 30%");
            var a = uc * 1.3;
            return formatNumber.new(Math.round(a * ValueUC));

        break;
        
        default:
            console.log("error");
        break;
    }
}

function OnSedeChange(){
    stSede = true;
    document.getElementById('sl_coop').selectedIndex = 0;
    let table = document.getElementById('tablaPago');
    table.innerHTML ='';
}


//Sede selection
function SedeSelect(){

    //fue seleccionada la sede?
    if(stSede){
        let spinfo2 = document.getElementById("info2").innerHTML = "";
        let bt = document.getElementById("btTotal");
        bt.style.visibility = "visible";
        //toggle tabla totales
        
    }else{
        alert("Selecciona la sede!");
    }
    /*
    var x = document.getElementById("tbTotal");
    x.style.display = "none";
    */
    let table = document.getElementById('tablaPago');
    table.innerHTML ='';
    
}

function RunTotal(){
    //Totalizamos para tener variables disponibles
    let table = document.getElementById('tablaPago');
    table.innerHTML ='';

    let slcoop = document.getElementById("sl_coop");

    if(slcoop.selectedIndex != 0){
        Totalizacion();
        let a;
    
        switch (Perio) {
            case "0":
            //console.log(0);
                //OnTotal();
                a= Perio;
            break;
            
            case "1":
            case '2':
                //console.log(1);
                //TwoTotal();
                a = '1';
            break;
    
            case '3':
            case '4':
                a = '2'
            break;
       
            default:
                //console.log(Perio + " default");
            break;
        }
        //console.log(a);
        GenerarTabla(a);
    }else{
        alert('¡Debes seleccionar cooperacion económica!');
    }

    

}
//Totalizacion en variables
function Totalizacion(){
    let spVc = document.getElementsByClassName("valuC");

    sum = 0;
    //obtenemos valores Sumatoria bruta UC de tabla
    for(y = 0; y < 10; y++){
        var txt = spVc[y].textContent;
        var txtW = txt.replace(".","");
        var txtWOP = txtW.replace(".","");
        //console.log(txtWOP);

        var val = Number(txtWOP);
        
        sum += val;
    }

    //descontamos segun carrera
    //console.log("Carrera seleccionada: "+ optSl);
    if(optSl.includes("educacion") || optSl.includes("letras") || optSl.includes("filosofia") ){

        //es carrera con descuento
        //console.log("Carrera con descuento");
        sum = sum * 0.70;
        let spInfo = document.getElementById("info").innerHTML = "*¡Aplicado descuento del 30% a la carrera!*";

    }

    let slSede = document.getElementById("sl_sede");

    switch(slSede.options[slSede.selectedIndex].value){
        case "null":
            sum = 0;
        break;

        case "mtb":
            sum = sum;
        break;

        case "g":
        case "tq":
            let spInfo2 = document.getElementById("info2").innerHTML = "*¡Aplicado descuento del 20% de la sede!*";
            sum = sum * 0.8;
        break;

    }

    //cargamos la ayuda economica
    let slcoop = document.getElementById("sl_coop");
    sum = sum * slcoop.options[slcoop.selectedIndex].value;

    sum = Math.round(sum);
    //****FIN SUM
   // console.log('SUM TOTAL '+ sum);
}


//Retorna unidad del bolivar utilizado
function GetUnitMoney(){
    if(isFuerte){
        return 'Bs.F. '
    }
    return 'Bs.S. '
}


function GenerarTabla(periodo){
    let tabla = tables[periodo];
    let celmax = tabla[0];

    var divTable = document.getElementById('tablaPago');

    var tableHTML = document.createElement('table');
    //tableHTML.style = 'overflow-x:auto;'
    
    //Recorremos para obtener FILAS
    for(i=1; i < tabla.length; i++){
        let fila = tabla[i];
        //console.log('FILA ' + i)
        let filaHTML;

        if (!(Number.isInteger(fila[0]))){
            //Si no es fila mixta
            filaHTML = GenColumnas(fila, celmax);
        }else{
            //Si es fila mixta
            let fmix = fila.slice(1,fila.length);
            let rspan = fila[0];
           
            //console.log(fila[0]);
            filaHTML = GenFilaMix(rspan,fmix,celmax);
            
        }

        tableHTML.appendChild(filaHTML);
    }
    divTable.appendChild(tableHTML);
    return divTable;
};

function GenColumnas(fila, celmax){
    let filaHTML = document.createElement('tr');

    for(j=0; j < fila.length; j++ ){
        //Obtenemos cada columna
        let celda = fila[j];
        let LongFilAc = fila.length;

        let celdaHTML = document.createElement('th');

        celdaHTML.colSpan = GetColSpan(LongFilAc,celmax,j);
        SetStyle(celdaHTML,LongFilAc,j);   
        //let content = document.createTextNode(celda);
        celdaHTML.innerHTML = evaluar(celda);
        //celdaHTML.appendChild(content);
        
        filaHTML.appendChild(celdaHTML);
    }

    return filaHTML;
};

function GenFilaMix(rowS,fmix, celmax){

    let LongMainf = fmix.length;
    let divAux = document.createElement('tbody');
    //console.log(fmix);
    
    for (k=0; k < fmix.length; k++){
        //Recorremos cada fila mixta
        let fHTML = document.createElement('tr');

        for(l=0; l < fmix[k].length; l++){
            //Recorremos cada celda
            let celdaHTML = document.createElement('th');
            celdaCont = fmix[k][l];

            if((k==0) && (l==0)){
                //Si Estamos en el primer elmento de todo
                celdaHTML.rowSpan = rowS;
                SetStyle(celdaHTML,LongMainf,0);
            }
            celdaHTML.colSpan = GetColSpan(LongMainf,celmax,l);
            
            //let content = document.createTextNode(celdaCont);
            celdaHTML.innerHTML = evaluar(celdaCont);
            fHTML.appendChild(celdaHTML);
        }

        divAux.appendChild(fHTML);
    }


    return divAux;
};

//Retorna el colspan la cantidad de celdas en una fila
function GetColSpan(LongFila, celmax, index){
    if(LongFila == 1){
        //Elemento unico de la columna
        return celmax;
    }else if(LongFila == 2){
        //Solamente dos elementos
        if(index==0){
            //Primero sera 1
            return  1;
        }else{
            //El segundo lo que queda
            return celmax-1;
        }
    }else{
        //Mas de elementos mayores a las columnas maximas
        return 1;
    }
};

function SetStyle(elemt,long,ind){
    if(long == 1){
        //Unico elemento
        let a;
            if(ScolorUsed){
                a = 1;
                ScolorUsed = false;
            }else{
                a = 0;
                ScolorUsed = true;
            }
        elemt.style = 'background-color:' + ColorArray[a]+';';
    }else{
        if(ind ==0){
            //si es el primero de varios
            elemt.id = 'tt';
        }
    }
};

function evaluar(orig){
    let text = orig;
    let start = orig.search('eval');

    if(start != -1){
        let end = orig.lastIndexOf(')');
        let toEval = orig.substring(start, end+1);

        let ftPart = orig.substring(0, start);
        let scPart = orig.substring(end+1, orig.length);

        text = ftPart + eval(toEval) + scPart + '';
    }
    return text
}