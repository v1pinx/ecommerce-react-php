<?php
include 'db_connection.php';
include 'cors.php';

header('Content-Type: application/json');

// Retrieve the POST data
$data = json_decode(file_get_contents("php://input"), true);

$userId = isset($data['userId']) ? $data['userId'] : null;
$productId = isset($data['productId']) ? $data['productId'] : null;
$quantity = isset($data['quantity']) ? (int)$data['quantity'] : null;

if (!$userId || !$productId || $quantity === null) {
    echo json_encode(["message" => "Invalid input."]);
    http_response_code(400); // Bad Request
    exit();
}

if ($quantity < 1) {
    echo json_encode(["message" => "Quantity must be at least 1."]);
    http_response_code(400); // Bad Request
    exit();
}

try {
    // Fetch the user's cart
    $query = "SELECT * FROM users WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if (!$user) {
        echo json_encode(["message" => "User not found."]);
        http_response_code(404); // Not Found
        exit();
    }

    // Decode the existing cart
    $cart = json_decode($user['cart'], true);
    if (!$cart) {
        $cart = [];
    }

    // Update the quantity for the specified product
    $productFound = false;
    foreach ($cart as &$item) {
        if ($item['productId'] === $productId) {
            $item['quantity'] = $quantity;
            $productFound = true;
            break;
        }
    }

    if (!$productFound) {
        echo json_encode(["message" => "Product not found in cart."]);
        http_response_code(404); // Not Found
        exit();
    }

    // Save the updated cart back to the database
    $updatedCart = json_encode($cart);
    $updateQuery = "UPDATE users SET cart = ? WHERE id = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bind_param("ss", $updatedCart, $userId);
    $updateStmt->execute();

    echo json_encode(["message" => "Cart updated successfully.", "cart" => $cart]);
    http_response_code(200); // OK
} catch (Exception $e) {
    error_log($e->getMessage());
    echo json_encode(["message" => "An error occurred. Please try again."]);
    http_response_code(500); // Internal Server Error
}
?>
