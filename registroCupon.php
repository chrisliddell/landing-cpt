<?php
	

	
if( $_SERVER['REQUEST_METHOD'] === 'POST' ){


	//datos del cupon
	$nombre = $_POST['nombre-completo'];	
	$cedula = $_POST['cedula'];
	$genero = $_POST['selectGenero'];
	$edad = $_POST['edad'];	
	$tel = $_POST['telefono'];
	$correo = $_POST['correo'];
	$tienda = $_POST['selectTienda'];	
	
	//credenciales de la base de datos
	$servername = "localhost";
	$username = "root";
	$password = "L2SNS=Hoirm0LL7";
	$dbname = "cuepatijera";

	//conexion con las base de datos
	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	//consulta que va a ejecutarse
	$sql = "INSERT INTO cupon (nombre, cedula, genero, edad, tel, correo, tienda) VALUES ('".$nombre."', '".$cedula."', '".$genero."', '".$edad."', '".$tel."', '".$correo."', '".$tienda."')";
	
	//escribir en el registro
	$fp = fopen('bd.log', 'a+');
	fwrite($fp, "\n".$sql."\n");
	fclose($fp);
	
		
	if($conn->query($sql) === FALSE){
		echo "Error";
	}

	$conn->close();
	
}

?>
