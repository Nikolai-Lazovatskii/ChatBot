<?php 
include("./db.php");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Connection failed!"]);
    exit();
}

$input_username = $sql->real_escape_string($data["username"]);

$sqlRes = "SELECT id FROM users WHERE username='$input_username'"; 

$result = $sql->query($sqlRes);

if ($result && $result->num_rows > 0) {
    $username = $result->fetch_assoc();
    echo json_encode(["id" => $username['id'], "success" => true]); 
    exit(); 

} else {
    echo json_encode(["success" => false, "message" => "No id found"]);
}

?>
