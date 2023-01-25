<?php 
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));
//Convierte un string codificado en JSON a una variable de PHP

if(isset($data->username)
	&& isset($data->useremail) 
	&& !empty(trim($data->username))
	&& !empty(trim($data->useremail))
	){//trim quitas los espacios en blanco, comproueba que de lo recibido esta todo completo
		
	$username = mysqli_real_escape_string($db_conn, trim($data->username));//quita caracteres especiales
	$useremail = mysqli_real_escape_string($db_conn, trim($data->useremail));
	$date = date('Y-m-d');

	//inserta en la base con los datos recibidos
	$add = mysqli_query($db_conn,"insert into user (name,email,date) values('$username','$useremail','$date')");
	if($add){
		$last_id = mysqli_insert_id($db_conn);//coge el id generado
		echo json_encode(["success"=>true,"insertid"=>$last_id]);//devuelve eun json
		return;
    }else{
        echo json_encode(["success"=>false,"msg"=>"Server Problem. Please Try Again"]);
		return;
    } 

} else{//devuelve json que tiene que rellenar cmapos
    echo json_encode(["success"=>false,"msg"=>"Please fill all the required fields!"]);
	return;
}
?>