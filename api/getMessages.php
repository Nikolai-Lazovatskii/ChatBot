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

$stmt = $sql->prepare("SELECT message_text, timestamp, sender_id FROM messages
                       WHERE (sender_id = ? AND getter_id = ?) OR (sender_id = ? AND getter_id = ?)
                       ORDER BY timestamp ASC");

if (!$stmt) {
    error_log("SQL Error: " . $sql->error);
    echo json_encode(["success" => false, "message" => "Preparation failed: " . $sql->error]);
    exit();
}

$stmt->bind_param('iiii', $user1, $user2, $user2, $user1);
$stmt->execute();

$result = $stmt->get_result();

if ($result) {
    $messages = [];

    while ($row = $result->fetch_assoc()) {
        $messages[] = [
            'message' => $row['message_text'],
            'time' => $row['timestamp'],
            'id' => $row['sender_id']
        ];
    }
    echo json_encode($messages);
    exit(); 
} else {
    echo json_encode(["success" => false, "message" => "No users found"]);
}

$stmt->close();
$sql->close();
exit();
?>
