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

var modal;
var span;

//SYSTEM TABLA MATERIA
//inicia en 1 (0=null)
var ArrMat = [null,true,false,false,false,false,false,false,false,false,false];
//inicia en 1
var listFila;

//SYSTEM uc
var Auc = [345000, 400000, 400] ;
var isFuerte = true;

//DIVs system
let menuDiv;
let CalDiv;
let loadDiv;
let NotDiv;

let SusDiv;
let NsusDiv;

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

    LoadAgrupacion();
}

//Load Calculadora
function OpenCalculadora(){
    let CalDiv = document.getElementById("container");
    let menuDiv = document.getElementById("menu");

    menuDiv.style.display = "none";
    CalDiv.style.display = "block";
}

//Open div Page
function OpenDiv(divName){

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
            

            let valSus = checkSusc();
            // Revisamos estado de suscripcion
            console.log("ValSUS: "+valSus);
            if(valSus){
                //esta suscrito
                SusDiv.style.display = "block";
                NsusDiv.style.display = "none";

            }else{
                //no esta
                SusDiv.style.display = "none";
                NsusDiv.style.display = "block";
            }

            NotDiv.style.display = "block";
            break;

        default:
            break;
    }
}

//cargar lista agrupaciones
function LoadAgrupacion(){
    var slAgr = document.getElementById("slAgr");
    var categorias = ["Agrupaciones culturales", "Agrupaciones juveniles", "Modelos y competencias", "Selecciones deportivas", "Voluntariado"];
    var cateArray = ["AgrupacionesCulturales", "AgrupacionesJuveniles", "ModelosYCompetencias", "SeleccionesDeportivas", "Voluntariado"];

    slAgr.options[0] = new Option("Agregar",0);

    //Por categoria
    for(i=0; i < categorias.length; i++){
        var group = document.createElement('optgroup');
        group.label = categorias[i];

        //Por agrupacion
         for(j=0; j < agrupaciones[cateArray[i]].length; j++){
             
            var option = document.createElement("option");
            var texto = agrupaciones[cateArray[i]][j].name;
            //console.log(j + " j en " + texto);

            option.value =  texto;
            option.innerHTML =  texto;

            group.appendChild(option);
         }

         slAgr.appendChild(group);
    }
}

//Alguna agrupacion select
function SelectAgrup(slAgr){
    var indexSel = slAgr.selectedIndex;

    if(indexSel != 0){
        var ulTag = document.getElementById("listAgr");

        var li = document.createElement('li');
        var span = document.createElement("span");
        var a = document.createElement("a");
        var bt = document.createElement("button");
       
        a.innerText = slAgr.options[indexSel].value;
    
        bt.setAttribute('onclick','delElement(this)');
        bt.innerHTML = "X";
        li.id = "tag";
        //span.style = "background-color: #4b7f52;"
        a.appendChild(bt);
        span.appendChild(a);
        li.appendChild(span);
        ulTag.appendChild(li);
    }
    
}

//eliminar elemento
function delElement(elem){
    console.log(elem);
    console.log('Eliminado', elem);
}

//Periodo Selecionado
function OnPerSelect(){
    var slP = document.getElementById("sl_per");
    Perio = slP.value;
    ValueUC =  Auc[Perio];
    stPer = true;

    //volvemos visible
    var pUC = document.getElementById("pVUC");
    //document.getElementById("ucShow").innerHTML = formatNumber.new(ValueUC, "Bs.F. ");
    pUC.style.display = "block";
    var suBs = document.getElementById("uBS");

    switch (Perio) {
        case "0":
            //BS.F
            isFuerte = true;
            suBs.innerHTML = "Bs.F";
            document.getElementById("ucShow").innerHTML = formatNumber.new(ValueUC, "Bs.F. ");
        break;

        case "1":
            //BS.F
            isFuerte = true;
            suBs.innerHTML = "Bs.F";
            document.getElementById("ucShow").innerHTML = formatNumber.new(ValueUC, "Bs.F. ");
        break;

        case "2":
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
    var x = document.getElementById("tbTotal");
    x.style.display = "none";

    var x = document.getElementById("tbTotal2nd");
    x.style.display = "none";
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
        case "registro":
            modal.style.display = "block";
            break;
    
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
        case "registro":
            modal.style.display = "none";
            break;
    
        case "ig":
        moig.style.display = "none";
            break;

        default:
            break;
    }
    
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == moig) {
        moig.style.display = "none";
    }
}


//Send tag for server push
function LoadTag(){
    
    var sltag = document.getElementById("carreraRes");
    var tuser = sltag.options[sltag.selectedIndex].value;

    OneSignal.push(function () {
     
        OneSignal.sendTag("user_type",tuser);
        OneSignal.sendTag("user_completed","true", function(tagsSent){
              //retornamos a web
            location.href="https://madot10.github.io/UCalculadora/";
            //alert("COMPLETADO!");
            modal.style.display = "none";
        });
    });

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

        var x = document.getElementById("tbTotal");
        x.style.display = "none";

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

    //agregamos a las listas
    /* for(i = 0; i < selectMat.length; i++){
        //console.log(i);
        selectMat[i].options[selectMat[i].options.length] = new Option("Seleccione", i);
            for(x = 0; x < jsonCarrera[inOpt].materias.length; x++){
                var textToshow = "(" + jsonCarrera[inOpt].materias[x].Semestre + ") " + jsonCarrera[inOpt].materias[x].Asignatura;

                selectMat[i].options[selectMat[i].options.length] = new Option(textToshow, x);
            }
        
    } */

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

    let sp75 = document.getElementById("der75");
    let sp60 = document.getElementById("sem60");
    let spMar = document.getElementById("marzo");
    let spAbr = document.getElementById("abril");
    let spMay = document.getElementById("mayo");

    let tbTo = document.getElementById("totales");
    tbTo.style.visibility = "hidden";

    let bt = document.getElementById("btTotal");  
    bt.style.visibility = "hidden";

    sp75.innerHTML= '';
    sp60.innerHTML = '';
    spMar.innerHTML = '';
    spAbr.innerHTML = '';
    spMay.innerHTML = '';
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

        //console.log(jsonCarrera[inOpt].materias[indAsig]);

        //establecemos datos
        /* spUC.innerHTML = jsonCarrera[inOpt].materias[indAsig].UC;
        spTAX.innerHTML = jsonCarrera[inOpt].materias[indAsig].Tax;
        spVc.innerHTML = CalculateValueUC(jsonCarrera[inOpt].materias[indAsig].Tax, jsonCarrera[inOpt].materias[indAsig].UC); */

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

    var x = document.getElementById("tbTotal");
    x.style.display = "none";
    
}

function RunTotal(){
    
    switch (Perio) {
        case "0":
        console.log(0);
            OnTotal();
        break;
        
        case "1":
            console.log(1);
            TwoTotal();
        break;
    
        case "2":
            console.log(1);
            TwoTotal();
        break;   

        default:
            console.log(Perio + " default");
        break;
    }

}
//Totalizacion
function OnTotal(){
    let sp75 = document.getElementById("der75");
    let sp752 = document.getElementById("der752");


    let sp60 = document.getElementById("sem60");
    let spMar = document.getElementById("marzo");
    let spAbr = document.getElementById("abril");
    let spMay = document.getElementById("mayo");

    let bt = document.getElementById("btTotal");
    bt.style.visibility = "visible";

    let spVc = document.getElementsByClassName("valuC");

    sp75.innerHTML = formatNumber.new(1.25 * ValueUC, "Bs.F. ");
    sp752.innerHTML = formatNumber.new(2.75 * ValueUC, "Bs.F. ");


    
    let sum = 0;
    //obtenemos valores
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

    //chequeamos sedes
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
    
    sum = sum * 0.6;
    /*
    sp60.innerHTML = formatNumber.new(Math.round(sum * 0.6), "Bs.F. ");
        spMar.innerHTML = formatNumber.new(Math.round((sum * 0.6) * 0.5), "Bs.F. ");
        spAbr.innerHTML = formatNumber.new(Math.round((sum * 0.6) * 0.25), "Bs.F. ");
        spMay.innerHTML = formatNumber.new(Math.round((sum * 0.6) * 0.25), "Bs.F. ");
    */

    sp60.innerHTML = formatNumber.new(Math.round(sum), "Bs.F. ");
    spMar.innerHTML = formatNumber.new(Math.round((sum) * 0.5), "Bs.F. ");
    spAbr.innerHTML = formatNumber.new(Math.round((sum) * 0.25), "Bs.F. ");
    spMay.innerHTML = formatNumber.new(Math.round((sum) * 0.25), "Bs.F. ");

    //calculamos sum + der. insc.
    let sp60dR = document.getElementById("sem60dR");
    let sp60dN = document.getElementById("sem60dN");
    let spMardR = document.getElementById("semMardR");
    let spMardN = document.getElementById("semMardN");

    sp60dR.innerHTML = formatNumber.new(Math.round((sum) + (1.25 * ValueUC)), "Bs.F. ");
    sp60dN.innerHTML = formatNumber.new(Math.round((sum) + (2.75 * ValueUC)), "Bs.F. ");
    spMardR.innerHTML = formatNumber.new(Math.round(((sum) * 0.5) + (1.25 * ValueUC)), "Bs.F. ");
    spMardN.innerHTML = formatNumber.new(Math.round(((sum) * 0.5) + (2.75 * ValueUC)), "Bs.F. ");

    let tbTo = document.getElementById("totales");
    tbTo.style.visibility = "visible";

    //toggle tabla totales
    var x = document.getElementById("tbTotal");
    x.style.display = "block";
}

//Totalizar 2nd periodo
function TwoTotal(){
    let sp25 = document.getElementById("der25");

    let sp40 = document.getElementById("sem40");

    let spJn = document.getElementById("jn");
    let spJl = document.getElementById("jl");

    let bt2 = document.getElementById("tbTotal2nd");
    bt2.style.visibility = "visible";

    let spVc = document.getElementsByClassName("valuC");

    //derecho de inscripcion
    if(isFuerte){
        sp25.innerHTML = formatNumber.new(0.25 * ValueUC, "Bs.F. ");
    }else{
        sp25.innerHTML = formatNumber.new(0.25 * ValueUC, "Bs.S. ");
    }
    

    let sum = 0;
    //obtenemos valores
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

    //chequeamos sedes
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
    
    //40%
    sum = sum * 0.4;

    if(isFuerte){
        sp40.innerHTML = formatNumber.new(Math.round(sum), "Bs.F. ");
        spJn.innerHTML = formatNumber.new(Math.round((sum) * 0.5), "Bs.F. ");
        spJl.innerHTML = formatNumber.new(Math.round((sum) * 0.5), "Bs.F. ");
    }else{
        sp40.innerHTML = formatNumber.new(Math.round(sum), "Bs.S. ");
        spJn.innerHTML = formatNumber.new(Math.round((sum) * 0.5), "Bs.S. ");
        spJl.innerHTML = formatNumber.new(Math.round((sum) * 0.5), "Bs.S. ");
    }
    

    //calculamos sum + der. insc.
    let sp40d = document.getElementById("sem40d");

    if(isFuerte){
        sp40d.innerHTML = formatNumber.new(Math.round((sum) + (0.25 * ValueUC)), "Bs.F. ");
    }else{
        sp40d.innerHTML = formatNumber.new(Math.round((sum) + (0.25 * ValueUC)), "Bs.S. ");
    }
    


    let tbTol = document.getElementById("Total");
    tbTol.style.visibility = "visible";

    //toggle tabla totales
    var x = document.getElementById("tbTotal2nd");
    x.style.display = "block";
}