var API_BASE_URL = "http://localhost:8080/blackmarket-api";
var USERNAME="";
var PASSWORD="";
var NOMBREASIGNATURA =0;
var NOMBREASIGNATURA2 =0;

$(document).ready(function() {
USERNAME = $.cookie('username');
PASSWORD = $.cookie('password');
ASIGNATURA = $.cookie('idasignatura');
$("#usernameregistred").text(USERNAME);
$("#busqueda").text("Resultados de buscar * "+ $.cookie('texto')+ " * por "+ $.cookie('busqueda') );
//console.debug($.cookie("username"));
//console.debug($.cookie("password"));
//getultimoscontenidos;
//getmatriculas();	
getsearch( $.cookie('texto'), $.cookie('busqueda'));
});

$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

$("#logout").click(function(e) {
	e.preventDefault();
	$.removeCookie('username');
	$.removeCookie('password');
	window.location = "http://localhost/index.html"
});

$("#atrasregistred").click(function(e) {
	e.preventDefault();
	$.removeCookie('texto');
	$.removeCookie('busqueda');
	window.location = "http://localhost/registered.html"
});

function getnombrebyid(id){
var url = API_BASE_URL + '/asignatura/'+id;
console.log (id);
		$.ajax({
			url : url,
			type : 'GET',
			crossDomain : true,
			dataType : 'json',
			url : url,
			contentType : 'application/vnd.blackmarket.api.asignatura+json',
		}).done(function(data, status, jqxhr) {
		console.log(NOMBREASIGNATURA2);
		var asig = data;
		$("#"+id+""+NOMBREASIGNATURA2+"").text(asig.nombre);
		console.log(asig.nombre);
		NOMBREASIGNATURA2++;
		console.log(NOMBREASIGNATURA2);
		
		}).fail(function() {
		});
}


function getsearch(texto,busqueda){
var url = API_BASE_URL + '/blacks/search/'+busqueda+'/'+texto
$("#contenido_result").text("");
		$.ajax({
			url : url,
			type : 'GET',
			crossDomain : true,
			dataType : 'json',
			url : url,
		}).done(function(data, status, jqxhr) {
		var repos = data;
				$.each(repos, function(i, v) {
					var repo = v;
					
					$.each(repo, function(j, k) {
					var content=k;
			
					$('<tr><th><a id = "'+content.id_contenido+'" onclick="titulo(id)" href="#"  data-toggle="modal" data-target="#contenido" data-whatever="@fat">'+content.titulo+'</th><th>  <span id="'+content.id_asignatura+''+NOMBREASIGNATURA+'">'+content.id_asignatura+'<span>  </th><th><a id = "'+content.autor+'" onclick="pagautor(id)" href="#">'+content.autor+'</th><th>'+content.descripcion+'</th></tr>').appendTo($('#contenido_result'));
						NOMBREASIGNATURA++;
						getnombrebyid(content.id_asignatura);
						
						
				});
			});	
		}).fail(function() {
		$("#contenido_result").text("NO HAY CONTENIDO");

		
	});
}

function titulo(id)
{
console.log(id);
var url = API_BASE_URL + '/blacks/contenido/'+id;
		$.ajax({
			url : url,
			type : 'GET',
			crossDomain : true,
			dataType : 'json',
			url : url,
		}).done(function(data, status, jqxhr) {
		var cotenidoinfo = data;
					$("#popuptitulo").text(cotenidoinfo.titulo);
					if(cotenidoinfo.id_tipo == 1)
					{
					$("#popupasignatura").text(cotenidoinfo.id_asignatura+'--TEORIA');
					}
					if(cotenidoinfo.id_tipo == 2)
					{
					$("#popupasignatura").text(cotenidoinfo.id_asignatura+'--EJERCICIOS');
					}
					if(cotenidoinfo.id_tipo == 3)
					{
					$("#popupasignatura").text(cotenidoinfo.id_asignatura+'--EXAMENES');
					}
					
					$("#descripcioncontent").text(cotenidoinfo.descripcion);
					
					$("#invalidoboton").text("");
					
					console.log(cotenidoinfo.fecha);
					$("#popupfecha").text(cotenidoinfo.fecha);
					
					var imagen = document.getElementById("popupimagen"); 
					//var nimagen = cotenidoinfo.id_contenido;
					console.log(cotenidoinfo.id_contenido);
					imagen.src = "\img\\"+cotenidoinfo.id_contenido+".png";
					
					var a = document.getElementById("download"); 
					a.href = "\img\\"+cotenidoinfo.id_contenido+".png";
					
					$('<button type="button" class="btn btn-danger" id="'+id+'" onclick="invalidoclick(id)" ><a class=" glyphicon glyphicon-thumbs-down" style="color:#FFFFFF" id="prueba"> Invalido</a></button>').appendTo($('#invalidoboton'));
				
					
		}).fail(function() {
		});
		
console.log(id);

}

function pagautor(id){
	$.removeCookie('texto');
	$.removeCookie('busqueda');
	$.cookie('autor',id)
	window.location = "http://localhost/autor.html"
	
}



