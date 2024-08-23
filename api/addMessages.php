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

$user1 = $sql->real_escape_string($data["user1"]);
$user2 = $sql->real_escape_string($data["user2"]);
$message = $sql->real_escape_string($data["message"]);


$sqlRes = "INSERT INTO messages (sender_id, getter_id, message_text) VALUES ('$user1', '$user2', '$message')";

if ($sql->query($sqlRes) === FALSE) {
    error_log("SQL Error: " . $sql->error);
    echo json_encode(["success" => false, "message" => "Error: " . $sql->error]);
    exit();
}

$sql->close();

echo json_encode(['success' => true, 'message' => 'Login successful']);

exit();

?>
