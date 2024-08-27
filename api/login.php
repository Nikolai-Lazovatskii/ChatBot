<?php
include("./db.php");

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Connection faild!"]);
    exit();
}

$input_username = $data["username"];
$input_password = $data["password"];

$stmt = $sql->prepare("SELECT * FROM users WHERE username=?");

if (!$stmt) {
    error_log("SQL Error: " . $sql->error);
    echo json_encode(["success" => false, "message" => "Preparation failed: " . $sql->error]);
    exit();
}

$stmt->bind_param('s', $input_username);
$stmt->execute();


$result = $stmt->get_result();

if ($result->num_rows > 0) {

    $user = $result->fetch_assoc();

    if (password_verify($input_password, $user['password'])) {
        echo json_encode(['success' => true, 'message' => 'Login successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid password']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid password']);
}

$sql->close();
exit();

?>