<?php
include 'db_connection.php';
include 'cors.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];

$query = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

function base64UrlEncode($data) {
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
}

function generateJWT($payload, $secret) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode(json_encode($payload));
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
    $base64UrlSignature = base64UrlEncode($signature);

    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

if ($user && password_verify($password, $user['password'])) {
    $secret = "your_secret_key";
    $payload = [
        "id" => $user['id'],
        "email" => $user['email'],
        "iat" => time(),
        "exp" => time() + (60 * 60)
    ];
    $token = generateJWT($payload, $secret);
    echo json_encode([
      "message" => "Login successful",
      "username" => $user['username'],
      "token" => $token,
      "id" => $user['id']
  ]);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Invalid credentials"]);
}
?>
