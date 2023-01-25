<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//parametros para controlar la conexion, llamo a la conexion a sql
//require 'db_connection.php';
$db_conn = mysqli_connect("localhost","root","password","react_php_crud");

$allUsers = mysqli_query($db_conn, "SELECT * FROM `users`");//hago la consulta
if (mysqli_num_rows($allUsers) > 0) {//si hay mas de 0
    $all_users = mysqli_fetch_all($allUsers, MYSQLI_ASSOC);
    echo json_encode(["success" => 1, "users" => $all_users]);//los guardo y los devuelvo en json
} else {
    echo json_encode(["success" => 0]);
}