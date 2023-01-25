<?php
require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));//coge lo que lellega
if(isset($data->userids) 
	&& !empty(trim($data->userids))
	){//comprueba que este el id
  $adduserid = mysqli_real_escape_string($db_conn, trim($data->userids));//quita carac especiales
	$allUsers = mysqli_query($db_conn,"SELECT * FROM user where user_id = '".$adduserid."'");//hace consulta para buscar uno
	if(mysqli_num_rows($allUsers) > 0){//si obteiene mas de 1
		while($row = mysqli_fetch_array($allUsers)){//coge uno del array
      $viewjson["user_id"] = $row['user_id'];//va guardando los campos
      $viewjson["name"] = $row['name'];
      $viewjson["email"] = $row['email'];
      $viewjson["date"] = $row['date'];
      $json_array["userdata"][] = $viewjson;//junta todos
		}
		echo json_encode(["success"=>true,"userlist"=>$json_array]);//lo devuelve
		return;
			
	}
	else{
		echo json_encode(["success"=>false]);
		return;
	}
		
}
?>