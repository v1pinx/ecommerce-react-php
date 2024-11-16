<?php
include 'db_connection.php';
include 'cors.php';

$userId = isset($_GET['userId']) ? $_GET['userId'] : null;

if (!$userId) {
    echo json_encode(["message" => "Please Login First."]);
    http_response_code(400); 
    exit();
}

try {
    $query = "SELECT * FROM users WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $userId); 
    $stmt->execute();
    $result = $stmt->get_result(); 
    $user = $result->fetch_assoc(); 

    if (!$user) {
        echo json_encode(["message" => "User not found."]);
        http_response_code(404); 
        exit();
    }

    $cartItems = json_decode($user['cart'], true);

    echo json_encode(["cart" => $cartItems]);
    http_response_code(200); // OK
} catch (Exception $e) {
    error_log($e->getMessage()); 
    echo json_encode(["message" => "An error occurred. Please try again."]);
    http_response_code(500); 
}
?>
