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

$input_username = $data["username"];
$input_email = $data["email"];
$input_password = password_hash($data['password'], PASSWORD_BCRYPT);

$stmt = $sql->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");

if (!$stmt) {
    error_log("SQL Error: " . $sql->error);
    echo json_encode(["success" => false, "message" => "Preparation failed: " . $sql->error]);
    exit();
}

$stmt->bind_param('sss', $input_username, $input_email, $input_password);
$stmt->execute();

if ($sql->query($stmt->get_result()) === FALSE) {
    error_log("SQL Error: " . $sql->error);
    echo json_encode(["success" => false, "message" => "Error: " . $sql->error]);
    exit();
}

$sql->close();

echo json_encode(['success' => true, 'message' => 'Login successful']);

exit();

?>