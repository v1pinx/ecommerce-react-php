<?php
include 'db_connection.php';
include 'cors.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['username'], $data['email'], $data['password'])) {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields: username, email, or password"]);
    exit;
}

$username = trim($data['username']);
$email = trim($data['email']);
$password = $data['password'];

if (empty($username) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["message" => "All fields are required"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid email format"]);
    exit;
}

if (strlen($username) < 3 || strlen($username) > 20) {
    http_response_code(400);
    echo json_encode(["message" => "Username must be between 3 and 20 characters"]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);


if (!$conn) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection error"]);
    exit;
}

$emailCheckQuery = "SELECT id FROM users WHERE email = ?";
$emailCheckStmt = $conn->prepare($emailCheckQuery);
$emailCheckStmt->bind_param("s", $email);
$emailCheckStmt->execute();
$emailCheckStmt->store_result();

if ($emailCheckStmt->num_rows > 0) {
    http_response_code(409);
    echo json_encode(["message" => "Email is already registered"]);
    $emailCheckStmt->close();
    exit;
}
$emailCheckStmt->close();

$query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("sss", $username, $email, $hashedPassword);

if ($stmt->execute()) {
    $updateStatsQuery = "UPDATE stats SET customers = customers + 1 WHERE id = 1";
    if ($updateStmt = $conn->prepare($updateStatsQuery)) {
        if ($updateStmt->execute()) {
            echo json_encode(["message" => "User registered successfully, customer count updated"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "User registered but failed to update customer count in stats"]);
        }
        $updateStmt->close();
    } else {
        http_response_code(500);
        echo json_encode(["message" => "User registered but failed to prepare the stats update query: " . $conn->error]);
    }
} else {
    http_response_code(500);
    echo json_encode(["message" => "Registration failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
