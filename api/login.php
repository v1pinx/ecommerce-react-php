<?php
include 'db_connection.php';
include 'cors.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];

$query = "SELECT * FROM ec_users WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
  echo json_encode(["message" => "Login successful"]);
} else {
  http_response_code(401);
  echo json_encode(["message" => "Invalid credentials"]);
}
