<?php class AccountController {
    
    public function registration() {
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
    }

    public function login() {
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
    }
}
?>