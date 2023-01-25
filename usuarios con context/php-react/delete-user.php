<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//require 'db_connection.php';//llamo la conexion
$db_conn = mysqli_connect("localhost","root","password","react_php_crud");

$data = json_decode(file_get_contents("php://input"));//cojo los datos que me llegan
if (isset($data->id) && is_numeric($data->id)) {//compruebo que estan puestos los datos
    $delID = $data->id;
    $deleteUser = mysqli_query($db_conn, "DELETE FROM `users` WHERE `id`='$delID'");//Hago la consulta
    if ($deleteUser) {//devuelo json con el resultado
        echo json_encode(["success" => 1, "msg" => "User Deleted"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Found!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "User Not Found!"]);
}