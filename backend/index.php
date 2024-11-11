<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$dbname = "ecom";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}

function handleRegister($pdo)
{
    $data = json_decode(file_get_contents("php://input"));

    // Validate input
    if (!isset($data->username) || !isset($data->email) || !isset($data->password)) {
        echo json_encode(['error' => 'Username, email, and password are required']);
        return;
    }

    $username = $data->username;
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_DEFAULT);

    // Check if email or username already exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode(['error' => 'Username or email already exists']);
        return;
    }

    // Insert new user
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$username, $email, $password]);

    echo json_encode(['message' => 'User registered successfully']);
}

function handleLogin($pdo)
{
    $data = json_decode(file_get_contents("php://input"));

    // Validate input
    if (!isset($data->email) || !isset($data->password)) {
        echo json_encode(['error' => 'Email and password are required']);
        return;
    }

    $email = $data->email;
    $password = $data->password;

    // Find user by email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(['message' => 'Login successful', 'user' => $user]);
    } else {
        echo json_encode(['error' => 'Invalid email or password']);
    }
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $url = $_SERVER['REQUEST_URI'];

        if (strpos($url, '/register') !== false) {
            handleRegister($pdo);
        } elseif (strpos($url, '/login') !== false) {
            handleLogin($pdo);
        } else {
            echo json_encode(['error' => 'Unknown route']);
        }
        break;

    default:
        echo json_encode(['error' => 'Invalid request method']);
}
?>
