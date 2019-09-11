$(document).ready(function(){


//solo permitir numeros en cedula, telefono y edad
function testInput(event) {
   var value = String.fromCharCode(event.which);
   var pattern = new RegExp(/[0-9]/i);
   return pattern.test(value);
}
$('#telefono').bind('keypress', testInput);
$('#edad').bind('keypress', testInput);
$('#cedula').bind('keypress', testInput);


// Metodo de cpt 
$(document).on("click","#participar",function(){
  
    var cedula = $.trim($("#cedula").val());
    var nombre = $.trim($("#nombre-completo").val());
    var genero = $( "#selectGenero option:selected" ).val();
    var tienda = $( "#selectTienda option:selected" ).val();
    var telefono = $.trim($("#telefono").val());
    var correo = $.trim($("#correo").val());
    var acepta = $("#acepto").is(":checked");
	var edad = $("#edad").val();
	var regEx = /\S+@\S+\.\S+/; //para validar correo

	if (grecaptcha.getResponse() != '') {
		if( (nombre != "")&&(telefono != "")&&(correo != "")&&(cedula != "")&&(genero != "")&&(tienda != "")&&(acepta) ){
			//validar edad
			if(edad > 17 && edad <100){
				//validar el correo
				if(regEx.test(correo)){
					//validar telefono
					regEx = /[0-9]/;
					if(regEx.test(telefono)){
						//validar cedula
						regEx = /[0-9]/;
						if(regEx.test(cedula)){

							var datos = $("#promocion").serialize();
							 //Registro en base de datos
							$.ajax({
								type : "POST",
								url : "registroCupon.php",
								data : datos,
								beforeSend: function(){
									$("#mensaje").html("Enviando...");
									$("#mensaje").fadeIn("fast");
								},
								success : function (data) {	
									$.ajax({
										type : "POST",
										url : "contact.php",
										data : datos,
										beforeSend: function(){
											$("#mensaje").html("Enviando...");
											$("#mensaje").fadeIn("fast");
										},
										success : function (data) {          
											$("#mensaje").html("Recibido, gracias por sus datos");      

											setTimeout(function(){
												$("#mensaje").html("cueropapelytijera.net");
												$("#mensaje").fadeOut("fast");
												location.href = "";
												$("#promocion")[0].reset();
												},3500);
										}
									});	
								}
							});
							
							//Correo
							
						}else{
							$("#cedula").css("border","1px solid red");
							$("#mensaje").html("Cédula inválida.");  
							$("#mensaje").fadeIn("fast");            
							setTimeout(function(){
								$("#cedula").css("border","0 none");
								$("#mensaje").fadeOut("fast");    
								$("#mensaje").html("");
							},3000);
						}
					}else{
						$("#telefono").css("border","1px solid red");
						$("#mensaje").html("Teléfono inválido.");  
						$("#mensaje").fadeIn("fast");            
						setTimeout(function(){
							$("#telefono").css("border","0 none");
							$("#mensaje").fadeOut("fast");    
							$("#mensaje").html("");
						},3000);
					}
				}else{ 
					$("#correo").css("border","1px solid red");
					$("#mensaje").html("Correo inválido.");  
					$("#mensaje").fadeIn("fast");            
					setTimeout(function(){
						$("#correo").css("border","0 none");
						$("#mensaje").fadeOut("fast");    
						$("#mensaje").html("");
					},3000);
				}
			} else {
				$("#edad").css("border","1px solid red");
				$("#mensaje").html("La edad debe ser entre 18 y 99 años.");  
				$("#mensaje").fadeIn("fast");            
				setTimeout(function(){
					$("#edad").css("border","0 none");
					$("#mensaje").fadeOut("fast");    
					$("#mensaje").html("");
				},3000);				
			}
		}else{
			$("#nombre-completo").css("border","1px solid red");
			$("#telefono").css("border","1px solid red");
			$("#correo").css("border","1px solid red");
			$("#cedula").css("border","1px solid red");
			$("#edad").css("border","1px solid red");
			$("#cDiv").css("border","1px solid red");
			$("#selectGenero").css("border","1px solid red");
			$("#selectTienda").css("border","1px solid red");
			$("#mensaje").html("Los campos en rojo son obligatorios");  
			$("#mensaje").fadeIn("fast");            
			setTimeout(function(){
				$("#nombre-completo").css("border","0 none");
				$("#telefono").css("border","0 none");
				$("#cedula").css("border","0 none");
				$("#edad").css("border","0 none");
				$("#correo").css("border","0 none");
				$("#cDiv").css("border","0 none");
				$("#selectGenero").css("border","0 none");
				$("#selectTienda").css("border","0 none");
				$("#mensaje").fadeOut("fast");    
				$("#mensaje").html("");
			},3000);
		}
	}else{
	  $("#mensaje").html("Completar el recaptcha es obligatorio");
	  $("#mensaje").fadeIn("fast");
	  setTimeout(function(){
		$("#mensaje").fadeOut("fast");
		$("#mensaje").html("");
	  },3000);
    }  
});

});
