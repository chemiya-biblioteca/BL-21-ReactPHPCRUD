<?php
require 'db_connection.php';//llamamos la conexion
	$allUsers = mysqli_query($db_conn,"SELECT * FROM user");//busca todos
		if(mysqli_num_rows($allUsers) > 0){//recorre el array
			while($row = mysqli_fetch_array($allUsers)){//por cada uno coge los campos
				$viewjson["user_id"] = $row['user_id'];
				$viewjson["name"] = $row['name'];
				$viewjson["email"] = $row['email'];
				$viewjson["date"] = $row['date'];
				$json_array["userdata"][] = $viewjson;//los va almacenado 
			}
			echo json_encode(["success"=>true,"userlist"=>$json_array]);//devuelve el array
			return;
		}
		else{
			echo json_encode(["success"=>false]);
			return;
		}
?>