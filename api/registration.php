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

if ($sql->connect_error) {
    error_log("Connection failed: " . $sql->connect_error);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

if (!$data || !isset($data['username'], $data['email'], $data['password'])) {
    echo json_encode(["success" => false, "message" => "Connection failed!"]);
    exit();
}

$input_username = $sql->real_escape_string($data["username"]);
$input_email = $sql->real_escape_string($data["email"]);
$input_password = password_hash($sql->real_escape_string($data['password']), PASSWORD_BCRYPT);

$sqlRes = "INSERT INTO users (username, email, password) VALUES ('$input_username', '$input_email', '$input_password')";

if ($sql->query($sqlRes) === FALSE) {
    error_log("SQL Error: " . $sql->error);
    echo json_encode(["success" => false, "message" => "Error: " . $sql->error]);
    exit();
}

$sql->close();

echo json_encode(['success' => true, 'message' => 'Login successful']);

exit();

?>