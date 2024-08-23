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
    echo json_encode(["success" => false, "message" => "Connection faild!"]);
    exit();
}

$user_id = $sql->real_escape_string($data["userId"]);
$cur_id = $sql->real_escape_string($data["curId"]);

$sqlRes = "SELECT message_text, timestamp 
FROM messages 
WHERE (sender_id = '$user_id' AND getter_id = '$cur_id') 
OR (sender_id = '$cur_id' AND getter_id = '$user_id')
ORDER BY timestamp DESC 
LIMIT 1";

$result = $sql->query($sqlRes);

if ($result->num_rows > 0) {

    $message = [];

    while ($row = $result->fetch_assoc()) {
        $message[] = [
            'text' => $row['message_text'],
            'time' => $row['timestamp']
        ];
    }
    echo json_encode($message);
    exit(); 
} else {
    echo json_encode(["success" => false, "message" => "No message found"]);
}

$sql->close();
exit();

?>
