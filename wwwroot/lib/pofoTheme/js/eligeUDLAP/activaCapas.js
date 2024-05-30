/*Creado a partir del código de Pop-Ups Accesibles por PatomaS*/
//window.onload = function () {
//    loadurl("/internas\html/esp/preparatoriasdeConvenio/inicio.htm", cont1);
//}


if (navigator.userAgent.search(/msie/i) > 0) {
    DatosIniciales();
} else {
    document.addEventListener("DOMContentLoaded", DatosIniciales, false);
}

function DatosIniciales() {
    var ListaVinculos = document.links;
    var TotalVinculos = ListaVinculos.length;
    var SubListaVinculos = new Array(); // Subgrupo de los vínculos que nos interesan
    var z = 0;
    for (n = 0; n < TotalVinculos; n++) {
        if ((ListaVinculos[n].attributes.rel != null) && (ListaVinculos[n].attributes.rel.value.search(/ajax/i) >= 0)) {
            SubListaVinculos[z] = ListaVinculos[n];
            z++;
        }
    }
    AsignarEscuchas(SubListaVinculos);
}

function AsignarEscuchas(x) {
    var SubListaVinculos = x;
    var TotalSubListaVinculos = SubListaVinculos.length;
    for (n = 0; n < TotalSubListaVinculos; n++) {
        if (navigator.userAgent.search(/msie/i) >= 0) {
            SubListaVinculos[n].attachEvent("onclick", Ajax); // Explorer
        } else {
            SubListaVinculos[n].addEventListener("click", Ajax, false); // DOM
        }
    }
}

function Ajax(evento) {
    if (this.getAttribute) {
        var pagina = this.getAttribute('href');
        var propiedades = this.getAttribute('rel').split("-");
        evento.preventDefault();
    } else {
        var uri = evento.srcElement.getAttribute('href');
        var subpagina = evento.srcElement.getAttribute('href').split("/");
        var pagina = subpagina[subpagina.length - 1];
        var propiedades = evento.srcElement.getAttribute('rel').split("-");
    }
    if (propiedades[0] == "ajax") {
        loadurl(pagina, propiedades[1]);
        return false;
    }
}

function loadurl(url, id) {
    var pagecnx = createXMLHttpRequest();
    pagecnx.onreadystatechange = function () {
        if (pagecnx.readyState == 4 && (pagecnx.status == 200 || window.location.href.indexOf("http") == -1))
            document.getElementById(id).innerHTML = pagecnx.responseText;
    }
    pagecnx.open('GET', url, true)
    pagecnx.send(null)
}

function createXMLHttpRequest() {
    var xmlHttp = null;
    if (window.ActiveXObject)
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    else if (window.XMLHttpRequest)
        xmlHttp = new XMLHttpRequest();
    return xmlHttp;
}
