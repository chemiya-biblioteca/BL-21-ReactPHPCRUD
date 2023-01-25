<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");//para manejar las peticiones

include 'DbConnect.php';//llamo el archivo de la conexion
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];//recibo el metodo que me pida
switch($method) {
    case "GET":
        $sql = "SELECT * FROM users";//si es get hago select
        $path = explode('/', $_SERVER['REQUEST_URI']);//separa en array segun separador
        if(isset($path[3]) && is_numeric($path[3])) {//ira el tercero para ver si hay id
            $sql .= " WHERE id = :id";//añade a la aconsulta
            $stmt = $conn->prepare($sql);//prepara la consulta y pone el id
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);//recoge el dato encontrado
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);//reocge todos
        }

        echo json_encode($users);//pone en json y lo devuelve
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );//convierte a una variable lo que me llega
        $sql = "INSERT INTO users(id, name, email, mobile, created_at) VALUES(null, :name, :email, :mobile, :created_at)";
        $stmt = $conn->prepare($sql);//prepara la consulta
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $user->name);//pone los parametros
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':created_at', $created_at);

        if($stmt->execute()) {//la ejecuta
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);//devulve la respuesta
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );//coge lo que me llaega
        $sql = "UPDATE users SET name= :name, email =:email, mobile =:mobile, updated_at =:updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);//prepara la consulta y pone los parametros
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);

        if($stmt->execute()) {//La ejecuta y recoge la respuesta y la devuelve en json
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);//separa de lo que me manda en array segun separador

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);//pone el 3 del array en la consulta

        if($stmt->execute()) {//la manda y recoge la respuesta
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);//deuvleve json
        break;
}