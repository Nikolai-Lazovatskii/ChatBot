<?php 
include("./db.php");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Connection failed!"]);
    exit();
}

$user_id = $data["userId"];
$cur_id = $data["curId"];

$stmt = $sql->prepare("SELECT message_text, timestamp 
                       FROM messages 
                       WHERE (sender_id = ? AND getter_id = ?) 
                       OR (sender_id = ? AND getter_id = ?)
                       ORDER BY timestamp DESC 
                       LIMIT 1");

if (!$stmt) {
    error_log("SQL Error: " . $sql->error);
    echo json_encode(["success" => false, "message" => "Preparation failed: " . $sql->error]);
    exit();
}

$stmt->bind_param('iiii', $user_id, $cur_id, $cur_id, $user_id);

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $message = [];
    while ($row = $result->fetch_assoc()) {
        $message[] = [
            'text' => $row['message_text'],
            'time' => $row['timestamp']
        ];
    }
    echo json_encode($message);
} else {
    echo json_encode(["success" => false, "message" => "No message found"]);
}

$stmt->close();
$sql->close();
exit();
?>
