<?php
function canjeado($b){
	if($b == 1) 
		return "si";
	else 
		return "no";
}
	
if( $_SERVER['REQUEST_METHOD'] === 'GET' ){
	
	
	$cedula = $_GET['cedula'];

	//credenciales de la base de datos
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "prueba_cupones";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "SELECT * FROM cupon WHERE cedula = '".$cedula."';";
	$result = $conn->query($sql);

	
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			echo "Cedula: " . $row["cedula"]. " - Nombre: " . $row["nombre"]." - Correo: " . $row["correo"]. " - Telefono" . $row["tel"]." - Genero: ".$row["genero"]." - Edad: ".$row["edad"]." - Tienda: ". $row["tienda"]." - Canjeado: ".canjeado($row["activado"]). "<br>";
		}
	} else {
		echo "0 results";
	}
	
	$conn->close();

}
?>