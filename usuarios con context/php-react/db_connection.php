<?php//para la conexion

$db_conn = mysqli_connect("localhost","root","password","react_php_crud");

if($db_conn === false){//si no puedo conectar
    die("ERROR: Could not connect. " . mysqli_connect_error());
}