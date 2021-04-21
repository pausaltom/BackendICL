
function procesarProvincias() {
    var selectorProv = document.getElementById("provincia");

    if (this.readyState == 4 && this.status == 200) {
        var stringProv = this.responseText;
        // console.log('string'+stringProv);

        var arrayliProv = stringProv.split("//", 4);
        // console.log('arrayliProv  '+arrayliProv);

        arrayliProv.forEach(element => {
            var arraycomponentesProv = element.split("/");
            selectorProv.innerHTML += "<option>" + arraycomponentesProv[1] + "</option>" + "\n"
            //    console.log("arrayComponents "+arraycomponentesProv[0]);

        });
    }
}

function procesarMunicipios() {
    var selectorProv = document.getElementById("provincia");
    var id = selectorProv.options.selectedIndex;
    var selectorMun = document.getElementById("municipio");


    if (this.readyState == 4 && this.status == 200) {
        var stringMun = this.responseText;
        //console.log('string' + stringMun);
        
        if(stringMun==="")selectorMun.innerHTML = "<option value="+null+">Selecione un municipio</option>";    
        
        var arrayliMun = stringMun.split("//");
        //console.log('arrayliMun  ' + arrayliMun);


        var length = selectorMun.options.length;
        for (i = length - 1; i >= 0; i--) {
            selectorMun.options[i] = null;
        }
        
        selectorMun.innerHTML = "<option value="+null+">Selecione un municipio</option>";
        
        for (let i = 0; i < arrayliMun.length - 1; i++) {

            var arraycomponentesMun = arrayliMun[i].split("/");
            if (id = arraycomponentesMun[2]) {
                //console.log("array Municipios individual " + arraycomponentesMun);
                selectorMun.innerHTML += "<option value="+arraycomponentesMun[0]+">" + arraycomponentesMun[1] + "</option>";
            }
        }
    }
}
function procesarCp() {
    
    var selectorCp = document.getElementById("cp");

    if (this.readyState == 4 && this.status == 200) {
        var stringCP = this.responseText;
        //console.log('string' + stringCP);

        var arrayliCP = stringCP.split("//");
        //console.log('arrayliCP  ' + arrayliCP);


        var length = selectorCp.options.length;
        for (i = length - 1; i >= 0; i--) {
            selectorCp.options[i] = null;
        }
        selectorCp.innerHTML = "<option>Selecione un código postal</option>";
        
        for (let i = 0; i < arrayliCP.length - 1; i++) {

            var arraycomponentesCP = arrayliCP[i].split("/");
                //console.log("array cp individual " + arraycomponentesCP);
                selectorCp.innerHTML += "<option>" + arraycomponentesCP[0] + "</option>";
            
        }
    }
}



function cogerIdSelectorProv() {
    var selectorProv = document.getElementById("provincia");
    var id = selectorProv.options.selectedIndex;
    //console.log("id select " + id);

    return id;
}
function cogerIdSelectorMun() {
    var selectorMun = document.getElementById("municipio");
    
    var idMunicipio= selectorMun.options[selectorMun.selectedIndex].value;
      
        return idMunicipio;
      
}
function limpiarCp() {
    var selectorCp = document.getElementById("cp");
    var selectorProv = document.getElementById("provincia");
    if (selectorProv.options[selectorProv.selectedIndex].text==="Selecione una provincia") {
        var length = selectorCp.options.length;
        for (i = length - 1; i >= 0; i--) {
            selectorCp.options[i] = null;
        }
        selectorCp.innerHTML = "<option>Selecione un código postal</option>";
    }
}

function comprobarCampos(){
    var selectorProv=document.getElementById("provincia"); 
    var selectorMun = document.getElementById("municipio"); 
    var selectorCp = document.getElementById("cp"); 
    var direccion = document.getElementById("Direccion"); 
    var errorMsg = document.getElementById("errormsg");
    var numero = document.getElementById("Numero");
    var piso = document.getElementById("Piso");
    var bloque = document.getElementById("Bloque");
    var puerta = document.getElementById("Puerta");
    var escalera = document.getElementById("Escalera");

    //Comprobamos que en los option hay algo seleccionado 
    if(selectorProv.options[selectorProv.selectedIndex].text==="Selecione una provincia"||
    selectorMun.options[selectorMun.selectedIndex].text==="Selecione un municipio"||
    selectorCp.options[selectorCp.selectedIndex].text==="Selecione un código postal"||
    direccion.value===""||numero.value==="") {
        errorMsg.style="color:red";
        errorMsg.innerHTML="Error algo ha ido mal, revise que ha introducido correctamente los datos en los campos, recuerde que los campos marcados con un * son obligatorios\nRealiza la búsqueda por alguna palabra de referencia y no utilices signos de puntuación, abreviaturas ni artículos.";
    }else{
       
        errorMsg.style="color:green";
        errorMsg.innerHTML="Dirección Válida";
        var direccionCompuesta = selectorProv.options[selectorProv.selectedIndex].text+".."+selectorMun.options[selectorMun.selectedIndex].text+
        ".."+selectorCp.options[selectorCp.selectedIndex].text+".."+direccion.value+".."+numero.value+".."+piso.value+".."+bloque.value+".."+puerta.value+".."+escalera.value+"//";

        
        console.log('dirección comp: '+direccionCompuesta);
        
        window.location="./insertDireccion.php?userDireccion=" + direccionCompuesta;
        
     

    }
}

function loadEvents() {
    loadProvincias();
    document.getElementById("provincia").addEventListener('change', loadMunicipios);
    document.getElementById("provincia").addEventListener('change', limpiarCp);
    document.getElementById("municipio").addEventListener('change', loadCp);
    document.getElementById("botonEnviar").addEventListener('click',comprobarCampos);
}



function loadProvincias() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarProvincias;
    xmlhttp.open("GET", "http://localhost/php/user/pedirAdomicilio/getProvincia.php", true);
    xmlhttp.send();
}
function loadMunicipios() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarMunicipios;
    xmlhttp.open("GET", "http://localhost/php/user/pedirAdomicilio/getMunicipios.php?idProvincia=" + cogerIdSelectorProv(), true);
    xmlhttp.send();
}
function loadCp() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = procesarCp;
    xmlhttp.open("GET", "http://localhost/php/user/pedirAdomicilio/getCP.php?Municipio=" + cogerIdSelectorMun(), true);
    xmlhttp.send();
}
