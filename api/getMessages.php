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

$sqlRes = "SELECT message_text, timestamp, sender_id FROM messages
WHERE (sender_id='$user1' AND getter_id='$user2') OR (sender_id='$user2' AND getter_id='$user1')
ORDER BY timestamp ASC";

$result = $sql->query($sqlRes);

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

echo json_encode(["success" => false, "message" => "No users found"]);

$sql->close();

exit();

?>
