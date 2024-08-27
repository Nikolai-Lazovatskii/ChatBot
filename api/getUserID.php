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

$input_username = $data["username"];


$stmt = $sql->prepare("SELECT id FROM users WHERE username=?");

if (!$stmt) {
    error_log("SQL Error: " . $sql->error);
    echo json_encode(["success" => false, "message" => "Preparation failed: " . $sql->error]);
    exit();
}

$stmt->bind_param('s', $input_username);
$stmt->execute();

$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $username = $result->fetch_assoc();
    echo json_encode(["id" => $username['id'], "success" => true]); 
    exit(); 

} else {
    echo json_encode(["success" => false, "message" => "No id found"]);
}

?>
