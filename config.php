<?php
$host = "localhost";
$username = "root";
$password = ""; // Leave blank unless you set a password for root
$dbname = "resume_analyzer";

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
