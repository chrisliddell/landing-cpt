<?php

$username = 'chrisliddell78958@gmail.com';
$password = 'chris_lh78958';
$from = 'chrisliddell78958@gmail.com';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';


//CPT
if( $_SERVER['REQUEST_METHOD'] === 'POST' ){

	$name    = $_POST['nombre-completo'];	
	$phone   = $_POST['telefono'];
	$email = $_POST['correo'];
	$promocion = "Cupón promocional de Cuero, Papel y Tijera.";

    $datos = "nombre: " . $name.", tel: ".$phone.", correo: ".$email."\n";
	/** RESPALDO DE EMAIL **/
	$req_dump = print_r($datos, TRUE);
	$fp = fopen('email.log', 'a+');
	fwrite($fp, "\n".$req_dump."\n");
	fclose($fp);
	/***********************/

    $mail = new PHPMailer;

    $mail->isSMTP(); 
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';                                    
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;      
    $mail->SMTPDebug  = 3;

    $mail->Username = $username;
    $mail->Password = $password;
    $mail->SMTPSecure = 'tls';     
    $mail->Port = 25; 
    $mail->setFrom($from);
    $mail->addAddress('jgranados@imagineercx.com');   
    $mail->isHTML(true);                                 

    $myfile = fopen("dist.html", "r") or die("Unable to open file!");
	$mail->Body = fread($myfile,filesize("dist.html"));
	$mail->Subject = "Promo: ".$promocion." - " . $name;

	if(!$mail->Send()) {
	  echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	  echo "Message sent!";
	}
}

?>