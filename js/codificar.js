
/*
variables globales que controlan los eventos de los botones que se utilizan en la 
aplicacion
*/

var botonCodificar = document.getElementById("btn-co");
var botonDecodificar = document.getElementById("btn-de");
var botonCopiar = document.getElementById("btn-cy");


/*descripcion:
	Permite ocultar un div por medio de la propiedad display, enviando como
	parametro el nombre del id que hace referecnia en el archivo html
*/
function oculta(id){
    var elDiv = document.getElementById(id);
    elDiv.style.display='none'; 
}

/*descripcion:
	Permite mostrar un div por medio de la propiedad display, enviando como
	parametro el nombre del id que hace referecnia en el archivo html
*/
function muestra(id){
    var elDiv = document.getElementById(id); 
    elDiv.style.display='grid';
}

/* descripcion:
	este evento permite capturar el uso de la tecla backspace que se utiliza
	para borrar el contenido en el area de ingreso de texto, cuando se elimina
	todo el contenido muestra la imagen y el mensaje que no hay texto en el lado
	derecho de la pantalla
*/
document.addEventListener("keydown", event => {
   if(event.keyCode == 8){ //Tecla backspace
		var texto = document.getElementById("text-in").value;
		if(texto.length == 0) {
			oculta("second-screen");
			muestra("first-screen");
		}
   }
});

/* descripcion:
	El evento click copiar permite capturar el contenido del textarea donde muestra
	la salida del proceso de encriptar y desencriptar. El execCommand permite ejecutar 
	comandos para manipular el contenido de la región editable en este caso es copiar 
*/
botonCopiar.addEventListener("click", function(event){
	event.preventDefault();
	var content = document.getElementById("text-out");
    content.select();
    document.execCommand("copy");
	alert("use ctrl+v para pegar el contenido o lado derecho del mouse");
	document.getElementById("text-in").value = "";
	oculta("second-screen");
	muestra("first-screen");
});

/*Descripcion:
	Permite tomar los datos de la etiqueta Textarea y enviar ese contenido a la 
	funcion codificar, antes de eso se verifica que contenga un texto y que cumpla
	con el requisito de no tener mayuscuas y tildes u otro caracter especial.
*/
botonCodificar.addEventListener("click", function(event){
	event.preventDefault();
	var texto = document.getElementById("text-in").value;
		
	if(texto.length == 0) {
		alert("Ingrese texto a encriptar");
		oculta("second-screen");
		muestra("first-screen");
	}
	else {
		
		if(verificarCadena(texto) == true) {
			document.getElementById("text-out").value = encriptarTexto(texto);
			oculta("first-screen");
			muestra("second-screen");
		}
		else {
			document.getElementById("text-in").value = "";
		}
	}
});

/*Descripcion:
	Este captura el evento del boton desencriptar verificando de que contenga
	un texto, si cumple se envia el contenido a la funcion desencriptar
	para mostrar su ressultado en el lado derecho de lla pantalla
*/
botonDecodificar.addEventListener("click", function(event){
	event.preventDefault();
	oculta("first-screen");
	muestra("second-screen");
	var content = document.getElementById("text-in").value;
	if(content.length == 0)  {
		oculta("second-screen");
		muestra("first-screen");
		alert("Ingrese texto a desencriptar");
	}
	else {
		document.getElementById("text-out").value = desencriptarTexto(content);
	}
});

/*Descripcion:
	Toma el valor de la cadena String textoIn y la recorre desde su posicion 
	[0... n] y va sustituyendo las vocales por los valores de encriptacion 
	concatenando en una nueva cadena 
*/
function encriptarTexto(textoIn) {
	var i = 0;
	var cadena = "";
	while (i < textoIn.length) {
		
		switch (textoIn[i]) {
			case "e":
				cadena += "enter";
				break;
			case "i":
				cadena += "imes";
				break;
			case "a":
				cadena += "ai";
				break;
			case "o":
				cadena += "ober";
				break;
			case "u":
				cadena += "ufat";
				break;
			default:
				cadena += textoIn[i];
		}
		i++;
	}
	return cadena; 
}

/*Descripcion:
	Con una de las propiedades del objeto string que es replace, se utiliza para 
	interfacmbiar las palabras claves por vocales, la funcion utiliza expresiones 
	regulares para este cometido
*/
function desencriptarTexto(textoIn) {

	var cadena = "";
	
	cadena = textoIn.replace(/ai/g,'a');
	cadena = cadena.replace(/enter/g,'e');
	cadena = cadena.replace(/imes/g,'i');
	cadena = cadena.replace(/ober/g,'o'); 
	cadena = cadena.replace(/ufat/g,'u');

	return cadena;
} 

/*Descripcion:
	Verifica la cadena por medio su propiedad test y la expresion regular donde
	solo valida letras minusculas de [a..z]
*/
function verificarCadena(textoIn) {
	var verificar = true;
	if(/^[a-z ]+$/.test(textoIn) == false) {
		alert("Solo letras minúsculas y sin acentos");
		verificar = false;
	}
	return verificar;
}