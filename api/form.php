<?php
header('Content-Type: application/json');

include 'db_connection.php';
include 'cors.php'; 

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        echo json_encode(['error' => 'Missing required fields']);
        http_response_code(400); // Bad Request
        exit;
    }

    $name = mysqli_real_escape_string($conn, $data['name']);
    $email = mysqli_real_escape_string($conn, $data['email']);
    $message = mysqli_real_escape_string($conn, $data['message']);

    $query = "INSERT INTO form (name, email, message) VALUES ('$name', '$email', '$message')";

    if (mysqli_query($conn, $query)) {
        echo json_encode(['message' => 'Form submitted successfully!']);
        http_response_code(200); // OK
    } else {
        echo json_encode(['error' => 'Failed to submit form: ' . mysqli_error($conn)]);
        http_response_code(500); // Internal Server Error
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle GET request to fetch data
    $query = "SELECT * FROM form";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $forms = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode(['forms' => $forms]);
        http_response_code(200); // OK
    } else {
        echo json_encode(['error' => 'Failed to retrieve data: ' . mysqli_error($conn)]);
        http_response_code(500); // Internal Server Error
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
    http_response_code(405); // Method Not Allowed
}
?>
