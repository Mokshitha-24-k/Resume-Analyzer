<?php
session_start();
require 'config.php';

// Allow CORS if testing via localhost/frontend
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$response = [];

if ($email && $password) {
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        $response = ["success" => false, "message" => "Server error."];
    } else {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            if (password_verify($password, $row['password'])) {
                $_SESSION['user_id'] = $row['id'];
                $response = ["success" => true, "message" => "Login successful"];
            } else {
                $response = ["success" => false, "message" => "Incorrect password"];
            }
        } else {
            $response = ["success" => false, "message" => "User not found"];
        }
    }
} else {
    $response = ["success" => false, "message" => "Email and password are required"];
}

echo json_encode($response);
?>
