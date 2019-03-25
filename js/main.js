/* SISTEMA GENERAL */
let valorUC = 0;
let vrealUC = valorUC;
let visualUC = 0;
let ucbase = 0;
let uctotal = 0;
let ucpagar = 0;
let totalbs  = 0;

let sede;
let carrera;
let materias;
let coop;
let cober;

let limitProp = 27;
let limitBeca = 30;
let limitFab = 30;

//FUNCIONES
window.onload = () => {
    //Cargamos UC visual
    document.getElementById('ucvalue').innerHTML = `${formatNumber.new(LoadUC())} Bs.S`;
    UC = visualUC;
}

/* SISTEMA MENU */
function OpenDiv(name){
    let elems_menu = document.getElementsByClassName("emenu");
    //ocultamos todos
    for (let elem of elems_menu) {
        elem.style.display = "none";
    }

    switch(name){
        case "menu":
            document.getElementById("menu").style.display = "block";
            OnClickGa('backMenu', 'Menu');
        break;

        case "ucalculadora":
            document.getElementsByTagName("header")[0].style.display = "block";
            document.getElementsByClassName("ucalculadora")[0].style.display = "block";
            OnClickGa('openUC', 'Menu');
        break;

        case "tool":
            OnClickGa('openTool', 'Menu');
            document.getElementsByTagName("header")[0].style.display = "block";
            document.getElementsByClassName("tool")[0].style.display = "block";
        break;
    }
}

/* END SISTEMA MENU*/


/* SISTEMA GENERAL */

//Google analytics togle
function setGa(value){

    let a = "Set: " + value;
    gtag('event', "ToggleGA", {
        'event_category': "DevInteraccion",
        'event_label': a
      });
    
    window['ga-disable-UA-33542195-1'] = !value;
    console.log("Establecido ga-disable como: ", value);
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

function cleanTabla(){
    document.getElementById('pagos').innerHTML = '';
    document.getElementById('alertmsg').style.display = 'none';
}

function calcularMatricula(){
    if(sede && carrera && coop){
        document.getElementById('alertmsg').style.display = 'none';
        totalizacion();
    }else{
        alert("Debes seleccionar una sede, carrera y ayuda economica!");
    }
}

let formatNumber = {
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
        if((IsProc)){
            //console.log("Num entrante",num);
            return this.formatear(parseFloat(num).toFixed(2));
        }
    return this.formatear(num);
    }
}

function LoadUC(){
    let dataux = periodo[perioact];
    let uc = dataux.base;
    valorUC = uc;
    let today = new Date();
    //Recorremos si existe lista de variacion
    /*
        if(dataux.variacion){
            let timecmp;
            for (let i = 0; i < dataux.variacion.length; i++) {
                timecmp = new Date(dataux.variacion[i][0]);
                    if(today.getTime() > timecmp.getTime()){
                        //Hoy es mayor que una fecha de variacion
                        //aplicar sobre base
                        uc = uc * (1+(dataux.variacion[i][1]/100));
                    }else{
                        //si variacion es mayor
                        //aun no ha llegado esa fecha
                        break;
                    }
            }
    }*/
    uc = getUCfecha(today);
    console.log(uc);
    visualUC = uc;
    return uc;
}

//Retorna jsonData de carrera
function GetJsonDataMaterias(tx){
    tx = tx.replace(/\s/g,'');
    tx = tx.replace(/\n/g,'');
    tx = tx.toLowerCase();

    //console.log("TX " + tx);
   return tx = window[tx];
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

function UCrecargo(uc, tax){

    if( tax.includes("(V)") || tax.includes("(SP)")){
        //ya DB incluye recargo pro virtual 
        //+40%
        return uc;

    }else{
        let taxN = tax.replace( /^\D+/g, '');

        switch(taxN){
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            //sin recargo
                //console.log("sin recargo");
                return uc;
            break;
    
            case "7":
            case "8":
            case "9":
            //+ 30%
                //console.log("+ 30%");
                return uc * 1.3;
    
            break;
            
            default:
                //console.log("error UC RECARGO");
                //alert('ERROR INESPERADO: #01');
                return 0;
            break;
        }
    }
    
}

function totalizacion(){
    vrealUC = valorUC;
    let cobertura = 1 - (cober/100);
    let ucfuera = 0;

    //descuentos segun carrera
    if(carrera.includes("educacion") || carrera.includes("letras") || carrera.includes("filosofia") ){
        //Aplicamos 30% de descuento >> 
       vrealUC = valorUC * 0.7;
    }

    //descuento por sede
    switch(sede){
        case "g":
        case "tq":
            //Guayana  /Los teques 20% descuento
            //document.getElementById("info2").innerHTML = "*¡Aplicado descuento del 20% de la sede!* <br>";
            vrealUC *= 0.8;
        
        break;
    }

    //Recargo
    let ucre = uctotal - ucbase;
    //descuento por cooperacion
    if(coop != 'fab' && coop != 'ninguna'){
        //Beca o Prop
        let limit = limitBeca;
        if(coop != 'beca'){
            limit = limitProp;
        }

        if(ucbase <= limit){
           // console.log("menor");
            //por debajo de coobertura
            //aplicamos %  a lo que queda
            ucfuera = ucre;
            ucpagar = (ucbase * cobertura) + ucre; 

        }else if(ucbase > limit){
            //console.log("mayor");
            //por encima de cobertura
            ucfuera = (ucbase - limit) + ucre;
            ucpagar = (ucbase - limit) + ucre + (limit * cobertura);
        }

    }else if(coop != 'ninguna'){
        //FAB
        if(ucbase <= limitFab){
           // console.log("menor fab");
            //Por debajo
            ucfuera = ucre;
            ucpagar = (ucbase * cobertura) + ucre;
        }else{
            //console.log("mayor fab");
            //Por encima
            ucfuera = (ucbase - limitFab) + ucre;
            ucpagar = (ucbase - limitFab) + ucre + (limitFab * cobertura);
        }
    }else{
        //ninguna cooperacion
        ucpagar = uctotal;
    }

    if(ucfuera > 0){
        msgAlert(`<b> ¡${Number(ucfuera).toFixed(2)} UC fuera de financiamiento! </b>`)
    }

    /*console.log("FINAL: ");
    console.log("Cobertura: ", cobertura);
    console.log("uctotal: ", uctotal);
    console.log("ucbase: ", ucbase);
    console.log("Recargos: ", uctotal - ucbase);
    console.log("UC fuera cobertura: ", ucfuera);
    console.log("UCpagar: ", ucpagar);
    console.log("Valor real UC: ", vrealUC);
    console.log("Total 1pago: ", Number(ucpagar*vrealUC).toFixed(2));*/
    totalbs = Number(ucpagar*vrealUC).toFixed(2);
    GenerarTabla();
}

function getUCfecha(fecha){
    let f = new Date(fecha);
    let dataux = periodo[perioact];
    let uc = dataux.base;

    if(dataux.variacion){
        let timecmp;
        for (let i = 0; i < dataux.variacion.length; i++) {
            timecmp = new Date(dataux.variacion[i][0]);
                if(f.getTime() >= timecmp.getTime()){
                    //Hoy es mayor que una fecha de variacion
                    //aplicar sobre base
                    uc = uc * (1+(dataux.variacion[i][1]/100));
                }else{
                    //si variacion es mayor
                    //aun no ha llegado esa fecha
                    break;
                }
        }
    }
    return uc;
}

function GetMontoTarifa(fecha){
    return  getUCfecha(fecha) * ucpagar;
}

/* END SISTEMA GENERAL */

/* SISTEMA DE MATERIAS */
function toggleList(elem){
    elem.classList.toggle("active");
        var content = elem.nextElementSibling;

        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
}

function actualizarTotalUC(){
    document.getElementById('totalUC').innerHTML = `${ucbase} UC`;
}

function materiaSelect(elem){
    //Verificamos si es true o false
    let id = elem.getAttribute("id");
    if(elem.checked){
        //activado
        addMateriaList(id);
    }else{
        //desactivado >> eliminar
        deleteMateriaList(id);
    }
}

function addMateriaList(id){
    let data = materias[id];

    let main = document.getElementsByClassName("materias")[0];

    let divC = document.createElement("div");
    divC.classList.add("container", id);
    divC.setAttribute("onclick", `desCheckMatList(${id});`)

    divC.innerHTML = `<table><tr><td class="nMat"> <span style="color: red;">X</span> ${data.Asignatura}</td><td> ${FixUC(data.Tax, data.UC)} UC</td></tr><tr><td>${data.Semestre}</td><td> ${data.Tax}</td></tr></table>`;

    main.appendChild(divC);

    gtag('event', "MateriaSelect", {
        'event_category': "UCinteraccion",
        'event_label': data.Asignatura
    });

    ucbase += FixUC(data.Tax, data.UC);
    uctotal += UCrecargo(data.UC, data.Tax);

    actualizarTotalUC();
}

function deleteMateriaList(id){
    let elem = document.getElementsByClassName(id)[0];
    elem.parentNode.removeChild(elem);

    let data = materias[id];
    ucbase -= FixUC(data.Tax, data.UC);
    uctotal -= UCrecargo(data.UC, data.Tax);

    actualizarTotalUC();
}

/* END SISTEMA DE MATERIAS */

/* SISTEMA TABLA */
//SYSTEM TABLE
let ColorArray = ['#fed20180','#34b2e466'];
let ScolorUsed = false;

function GenerarTabla(){
    let tabla = tables[perioact];
    let celmax = tabla[0];

    var divTable = document.getElementById('pagos');
    divTable.innerHTML = '';
   // divTable.innerHTML = "<div data-html2canvas-ignore><p>Guardar como:<br><div class='btn-group'><button onclick='saveTABLE(png)'>Imagen PNG <i class='fa fa-file-image-o'></i></button><button onclick='saveTABLE(pdf)'>Archivo PDF <i class='fa fa-file-pdf-o'></i></button></div></p></div>"
    var tableHTML = document.createElement('table');
    tableHTML.style = 'overflow-x:auto;'
    tableHTML.id += "tablaPagos";
    
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

/* END TABLA */