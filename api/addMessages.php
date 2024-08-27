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

$user1 = $data["user1"];
$user2 = $data["user2"];
$message = $data["message"];

$stmt = $sql->prepare("INSERT INTO messages (sender_id, getter_id, message_text) VALUES (?, ?, ?)");

if (!$stmt) {
    error_log("SQL Error: " . $sql->error);
    echo json_encode(["success" => false, "message" => "Preparation failed: " . $sql->error]);
    exit();
}

$stmt->bind_param('sss', $user1, $user2, $message);
$result = $stmt->execute();

if (!$result) {
    error_log("SQL Error: " . $stmt->error);
    echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    exit();
}

$stmt->close();
$sql->close();

echo json_encode(['success' => true, 'message' => 'Message inserted successfully']);

exit();
?>
