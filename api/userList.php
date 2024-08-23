<?php 
include("./db.php");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$sqlRes = "SELECT username, id FROM users";

$data = $sql->query($sqlRes);

if ($data) {

    $usernames = [];

    while ($row = $data->fetch_assoc()) {
        $usernames[] = [
            'username' => $row['username'],
            'id' => $row['id']
        ];
    }
    echo json_encode($usernames);
    exit(); 
} else {
    echo json_encode(["success" => false, "message" => "No users found"]);
}

?>
