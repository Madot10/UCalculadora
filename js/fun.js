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
let textPerio, textSem;
let png = 'png';
let pdf = 'pdf';

//var modal;
//var span;
var moNplus;

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
let ucTotal = 0;
var tvuc = 0;

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
    
    DiasPasados();
    // Get the modal
    //modal = document.getElementById('myModal');
    //moig = document.getElementById('IgModal');
    moNplus = document.getElementById('nplus');

    // Get the <span> element that closes the modal
    //span = document.getElementsByClassName("close")[0];

    //alert("Realizando cambios con respeto a MONTO A PAGAR en este primer periodo. Intente más tarde!");
    listFila = document.getElementsByTagName("tr");

    //LOAD SYSTEM
    //divs

    //menuDiv = document.getElementById("menu");
    CalDiv = document.getElementById("container");
    //NotDiv = document.getElementById("contNoti");
    loadDiv = document.getElementsByClassName("loader")[0];

   //SusDiv = document.getElementById("susc");
    //NsusDiv = document.getElementById("Nsusc");

    loadDiv.style.display = "none";
    //menuDiv.style.display = "block";
    CalDiv.style.display = "block";

    acPdiv = document.getElementById("accept");
    nePdiv = document.getElementById("negate");

    //LauchModal('nplus');

}

function DiasPasados() {
    f1 = '28/02/2018';
  
    let today = new Date();
    f2 = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  
    let aFecha1 = f1.split('/');
    let aFecha2 = f2.split('/');
  
    let fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    let fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
  
    let dif = fFecha2 - fFecha1;
    let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    //console.log(dias);
    document.getElementById('days').innerHTML = dias;
  }
  

//Load Calculadora
/*
function OpenCalculadora(){
    let CalDiv = document.getElementById("container");
    let menuDiv = document.getElementById("menu");

    menuDiv.style.display = "none";
    CalDiv.style.display = "block";
}
*/

//Google analytics togle
function setGa(value){

    let a = "Set: " + value;
    gtag('event', "ToggleGA", {
        'event_category': "DevInteraccion",
        'event_label': a
      });
    
    window['ga-disable-UA-33542195-1'] = !value;
    alert("Establecido ga-disable como: ", value);
}

function OnClickGa(act, typeInter , lb){
    //si existe etiqueta hacer:
    //console.log('LB', lb)
    if(lb){
        //console.log('enter');
        gtag('event', act, {
            'event_category': typeInter + "Interaccion",
            'event_label': lb
          });
    }else{
        //console.log('not enter');
        gtag('event', act, {
            'event_category': typeInter + "Interaccion"
          });
    }
    
}


//Periodo Selecionado
function OnPerSelect(){
    var slP = document.getElementById("sl_per");
    Perio = slP.value;
    textPerio = slP.selectedOptions[0].text;
    textSem = slP.selectedOptions[0].parentElement.label;
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

    let vmu = "MoneyUnit: " + Tbs;

    gtag('event', "PeriodoSelect", {
        'event_category': "UCinteraccion",
        'event_label': vmu
      });

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
    //console.log("Delete I: "+ iPos);
    ArrMat[iPos] = false;
    listFila[iPos].style.display = "none";

    //ocultamos tabla
    let table = document.getElementById('tablaPago');
    table.innerHTML ='';
    
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
            //moig.style.display = "block";
            break;
        case 'nplus':
            moNplus.style.display = 'block';
        break;

        default:
            break;
    }
}

// When the user clicks on <span> (x), close the modal
function closeModal(tModal) {
    switch (tModal) {
        case "ig":
        //moig.style.display = "none";
            break;

        case 'nplus':
            moNplus.style.display = 'none';
        break;

        default:
            break;
    }
    
}


//Fun retorna jsonData de carrera
function GetJsonDataCarrera(tx){
    tx = tx.replace(/\s/g,'');
    tx = tx.toLowerCase();

    //console.log("TX " + tx);
   return tx = window[tx];
}

function ClearOptGro(){
    let sl = document.getElementsByClassName("sl_mat");
    for(k=0; k < sl.length; k++){
        sl[k].innerHTML = '';
    }
    
}

//cargar datos de carrera
function OnLoadCarrera(){

    if(stPer){
        let sl = document.getElementById("sl_carrera");
        optSl = sl.options[sl.selectedIndex].value;

        let optText = sl.options[sl.selectedIndex].text;
        jdatasl = GetJsonDataCarrera(optText);
        
        //console.log(jdatasl);

        gtag('event', "CarreraSelect", {
            'event_category': "UCinteraccion",
            'event_label': optText
          });

        ClearOptGro();
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

        document.getElementById("info").innerHTML = "";
        document.getElementById("info2").innerHTML = "";
        document.getElementById("info3").innerHTML = "";

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

    //Recorremos cada select de materias
    for(i = 0; i < selectMat.length; i++){
        //console.log(i);

        let semAnt = null;
        let semAct = null;

        let optGroup;
        //Primer elemento un "seleccione"
        selectMat[i].options[selectMat[i].options.length] = new Option("Seleccione", i);
            for(x = 0; x < jdatasl.length; x++){
                semAct = jdatasl[x].Semestre;
                
                if(semAct != semAnt){
                    //Al ser diferente crear un nuevo optGroup
                    optGroup = document.createElement('optgroup');
                    optGroup.label = semAct;

                    semAnt = semAct;
                }
                
                //var textToshow = "(" + jdatasl[x].Semestre + ") " + jdatasl[x].Asignatura;
                var textToshow = jdatasl[x].Asignatura;

                //selectMat[i].options[selectMat[i].options.length] = new Option(textToshow, x);
                let opti = new Option(textToshow, x);
                optGroup.appendChild(opti);
                selectMat[i].appendChild(optGroup);
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


function GetSemestreFromMat(selectObj,indAsig){
    //console.log('Select', selectObj);
    //console.log('Ind', indAsig);
    return selectObj.options[indAsig+1].parentNode.label;
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
        //var n = asig.indexOf(")") + 2;
        //var newOpt = asig.substring(n, asig.length);
        //console.log(newOpt);

        //encontramos el index de la asignatura
        indAsig = jdatasl.findIndex(function(item, i){
            //return item.Asignatura === newOpt
            return item.Asignatura === asig
        });

        let s = GetSemestreFromMat(selectMat,indAsig);
        //console.log('return', s);

        gtag('event', "MateriaSelect", {
            'event_category': "UCinteraccion",
            'event_label': s
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
    let spUC = document.getElementsByClassName("uc");
    let spTAX = document.getElementsByClassName("tax");
    tvuc = 0;
    //recorre todos los uc space
    for(i = 0; i < 10; i++){

        tvuc += Number(spUC[i].innerHTML);
        //console.log("T " + tvuc); 
    }
    
    //ucTotal = tvuc;
    spVuc.innerHTML = tvuc;
}

// tomado de http://www.yoelprogramador.com/formatear-numeros-con-javascript/
// Modificado por Madot
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
    new:function(num, simbol, IsProc){
    this.simbol = simbol ||'';
        if((IsProc) && (GetUnitMoney()=="Bs.S. ")){
            //console.log("Num entrante",num);
            return this.formatear(parseFloat(num).toFixed(2));
        }
    return this.formatear(Math.round(num));
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
            //console.log("error");
            //alert('ERROR INESPERADO: #01');
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
        document.getElementById("info2").innerHTML = "";
        document.getElementById("info3").innerHTML = "";
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

        /*
        let a;
        switch (Perio) {
            case "0":
                a= Perio;
            break;
            
            case "1":
                a = '1';
            break;
    
            case '2':
                a = '2'
            break;

            case '3':
                a = '3'
            break;
       
            default:
                //console.log(Perio + " default");
                alert("ERROR INESPERADO: Recarga la pagina!");
            break;
        }*/
        //console.log(a);

        GenerarTabla(Perio);
    }else{
        alert('¡Debes seleccionar cooperacion económica!');
    }

    

}
//Totalizacion en variables
function Totalizacion(){
    let spVc = document.getElementsByClassName("valuC");

    let limitBeca = 27;
    let limitTrabajo = 30;
    tvuc = Number(document.getElementById("TotalUC").innerText);
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
        limitBeca = limitBeca * 0.70;
        limitTrabajo = limitTrabajo * 0.70;
        tvuc = tvuc * 0.70;
        document.getElementById("info").innerHTML = "*¡Aplicado descuento del 30% a la carrera!* <br>";

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
            document.getElementById("info2").innerHTML = "*¡Aplicado descuento del 20% de la sede!* <br>";
            sum = sum * 0.8;
            limitBeca = limitBeca * 0.8;
            limitTrabajo = limitTrabajo * 0.8;
            tvuc = tvuc * 0.8;
        break;

    }

    gtag('event', "SedeSelect", {
        'event_category': "UCinteraccion",
        'event_label': slSede.options[slSede.selectedIndex].text
      });

    //cargamos la ayuda economica

    //NUEVO SISTEMA 27UC
    let slcoop = document.getElementById("sl_coop");

    //&& ((sum / ValueUC)> 27)
    if((slcoop.options[slcoop.selectedIndex].value != 1)){
        //si tiene cooperacion
        let ucFuera = 0;

        if(slcoop.options[slcoop.selectedIndex].text == "BecaTrabajo"){
            //si es becatrabajo
            //sum = sum * slcoop.options[slcoop.selectedIndex].value;
            if(((sum / ValueUC)> limitTrabajo)){
                //aviso para mayor 27uc(proporcional)
                //Retiramos lo que cubre la beca
                    //console.log("+27 Trabajo")
                sum = sum - (limitTrabajo * ValueUC);
                ucFuera = sum / ValueUC;
                //aplicamos la beca sobre lo que cubre
                sum = sum + (limitTrabajo * ValueUC * slcoop.options[slcoop.selectedIndex].value);
                document.getElementById("info3").innerHTML = "*¡Aplicada cooperación económica a primeras 30UC base!* <br> <b>" + Number(ucFuera).toFixed(2) + "UC fuera de financiamiento </b><br>";
            }else{
                //tvuc uc sin adicionales
                //console.log("menos27 Trabajo");
                sum = sum - (tvuc * ValueUC);
                ucFuera = sum / ValueUC;
                sum = sum + (tvuc * slcoop.options[slcoop.selectedIndex].value * ValueUC);
                document.getElementById("info3").innerHTML = "*¡Aplicada cooperación económica a UC base!* <br> <b>" + Number(ucFuera).toFixed(2) + "UC fuera de financiamiento </b><br>";
            }
        }else{
            //no es becatra
            if(((sum / ValueUC)> limitBeca)){
                //aviso para mayor 27uc(proporcional)
                //console.log("+27 Beca")
                //Retiramos lo que cubre la beca
                    //.log('limitBeca',limitBeca);
                    //console.log('sum',sum);
                sum = sum - (limitBeca * ValueUC);
                    //console.log('sum',sum);
                ucFuera = sum / ValueUC;
                //aplicamos la beca sobre lo que cubre
                sum = sum + (limitBeca * ValueUC * slcoop.options[slcoop.selectedIndex].value);
                    //console.log('sum',sum);
                document.getElementById("info3").innerHTML = "*¡Aplicada cooperación económica a primeras 27UC base!* <br> <b>" + Number(ucFuera).toFixed(2) + "UC fuera de financiamiento </b><br>";
            }else{
                //tvuc uc sin adicionales
                //console.log("menos27 Beca")
                   // console.log('tvuc',tvuc);
                    //console.log('Uc reales',sum / ValueUC);
                    //console.log('sum',sum);
                sum = sum - (tvuc * ValueUC);
                    //console.log('sum',sum);
                ucFuera = sum / ValueUC;
                sum = sum + (tvuc * slcoop.options[slcoop.selectedIndex].value * ValueUC);
                   // console.log('sum',sum);
                document.getElementById("info3").innerHTML = "*¡Aplicada cooperación económica a UC base!* <br> <b>" + Number(ucFuera).toFixed(2) + "UC fuera de financiamiento </b><br>";
            }
        }
    } 
    
    


    let c = "Coop: " + slcoop.options[slcoop.selectedIndex].text;
    gtag('event', "CoopSelect", {
        'event_category': "UCinteraccion",
        'event_label': c,
        'value': slcoop.options[slcoop.selectedIndex].value
      });

    ucTotal = sum / ValueUC;
    //console.log('UcTtal', ucTotal);
    sum = Math.round(sum);
    //****FIN SUM
    
   // console.log('SUM TOTAL '+ sum);
}

//Calcula monto segun UC Tarifa
function GetMontoTarifa(newUc){
    //console.log("NewUC", newUc);
    let nuevo = newUc * ucTotal;
    //console.log("nuevo", nuevo);
    //console.log('Nuevo',nuevo);
    //add condicion postPerio (no hacer lo de adentro)
    // if((GetUnitMoney() == "Bs.S. ") && (Perio < 3)){
    //     nuevo = nuevo / 100000;
    // }
    //console.log("nuevo2", nuevo);
    return nuevo;
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
    divTable.innerHTML = "<div data-html2canvas-ignore><p>Guardar como:<br><div class='btn-group'><button onclick='saveTABLE(png)'>Imagen PNG <i class='fa fa-file-image-o'></i></button><button onclick='saveTABLE(pdf)'>Archivo PDF <i class='fa fa-file-pdf-o'></i></button></div></p></div>"
    //divTable.innerHTML = "<div data-html2canvas-ignore><p>Guardar como:<br><div class='btn-group'><button onclick='saveTABLE(png)'>Imagen PNG <i class='fa fa-file-image-o'></i></button></div></p></div>"
    var tableHTML = document.createElement('table');
    tableHTML.style = 'overflow-x:auto;'
    
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
           
            //console.log('Fila mix');
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

    let LongMainf;
    let divAux = document.createElement('tbody');
    //console.log(fmix);
    
    for (k=0; k < fmix.length; k++){
        //Recorremos cada fila mixta
        let fHTML = document.createElement('tr');

        for(l=0; l < fmix[k].length; l++){
            //Recorremos cada celda
            let celdaHTML = document.createElement('th');
            celdaCont = fmix[k][l];

            LongMainf = fmix[k].length;

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
    //console.log('Long', LongFila);
    if(LongFila == 1){
        //Elemento unico de la columna
        return celmax;
    }else if(LongFila == 2){
        //Solamente dos elementos
        if(index==0){
            //Primero sera 1
            //console.log('Primero');
            return  1;
        }else{
            //El segundo lo que queda
            //console.log("celmax", celmax);
            return celmax-1;
        }
    }else{
        //Mas de elementos mayores a las columnas maximas
        //console.log("Mayores");
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

function saveTABLE(mode){
    html2canvas(document.getElementById('tablaPago'),{scale: 1.5,windowWidth: 768, backgroundColor: '#ffffff', logging: false})
    .then((canvas)=>{
        

        let newCanva = document.createElement('canvas');
        newCanva.height = canvas.height + 150;
        newCanva.width = canvas.width;
        
        let ctx = newCanva.getContext("2d", { alpha: false });

        //fondo
        ctx.beginPath();
        ctx.rect(0, 0, newCanva.width, newCanva.height);
        ctx.fillStyle = "white";
        ctx.fill();
        //UCALCULADORA
        // x,y
        ctx.font = '45px Roboto';
        ctx.fillStyle = '#34B2E4'; //azul
        ctx.fillText("UC", 10, 45);
        ctx.fillStyle = '#4b7f52'; //verde
        ctx.fillText("alculadora", 10+ctx.measureText('UC').width, 45);

        //Semestre
        ctx.font = '30px Roboto';
        ctx.fillText(textSem, 10, 82);
        //Periodo
        ctx.font = '30px Roboto';
        ctx.fillStyle = '#34B2E4'; //azul
        ctx.fillText('Periodo: ', 10, 120);
        ctx.fillStyle = '#4b7f52'; //verde
        ctx.fillText(textPerio, 10+ctx.measureText('Periodo: ').width, 120);
        //Por madot
        //ctx.font = '20px Roboto';
        //ctx.fillText("MADOT", 10, 105);

        ctx.drawImage(canvas,0,143);

        //document.body.appendChild(newCanva);
        let dataUrl = newCanva.toDataURL();

        if(mode == 'pdf'){
            OnClickGa('sharePDF','Social');
            let doc = new jsPDF('l', 'cm', [(newCanva.height+150)/38,(newCanva.width)/38]);
            doc.addImage(dataUrl, 'PNG', 1, 1);
            doc.save('TablaPago-UCALCULADORA.pdf');

        }else if(mode == 'png'){
            OnClickGa('sharePNG','Social');
            let linkDownload = document.createElement('a');
            linkDownload.download = 'TablaPago-UCALCULADORA.png';
            linkDownload.href = dataUrl;
            linkDownload.click();
        }

    })
}