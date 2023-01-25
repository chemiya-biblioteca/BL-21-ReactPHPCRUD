<?php 
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));//coge lo de la entrada

if(isset($data->userids) 
	&& !empty(trim($data->userids))
	){//coge el id y comprueba
		
	$userids = mysqli_real_escape_string($db_conn, trim($data->userids));//quita caracteres especiales

  $add = mysqli_query($db_conn,"delete from user where user_id='$userids'");
//hace peticion
	if($add){
		echo json_encode(["success"=>true]);//devuleve resultado
		return;
    }else{
        echo json_encode(["success"=>false,"msg"=>"Server Problem. Please Try Again"]);
		return;
    } 

} else{//si falta el campo
    echo json_encode(["success"=>false,"msg"=>"Please fill all the required fields!"]);
	return;
}
?>