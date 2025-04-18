<?php
session_start();
require 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$response = [];

if ($email && $password) {
    // Check if email already exists
    $checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    if ($checkStmt) {
        $checkStmt->bind_param("s", $email);
        $checkStmt->execute();
        $checkStmt->store_result();

        if ($checkStmt->num_rows > 0) {
            $response = ["success" => false, "message" => "Email already registered"];
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");

            if ($stmt) {
                $stmt->bind_param("ss", $email, $hashedPassword);
                if ($stmt->execute()) {
                    $response = ["success" => true, "message" => "Signup successful!"];
                } else {
                    $response = ["success" => false, "message" => "Insert failed: " . $stmt->error];
                }
                $stmt->close();
            } else {
                $response = ["success" => false, "message" => "Prepare failed: " . $conn->error];
            }
        }

        $checkStmt->close();
    } else {
        $response = ["success" => false, "message" => "Email check failed: " . $conn->error];
    }
} else {
    $response = ["success" => false, "message" => "Email and password are required"];
}

return json_encode($response);
?>
