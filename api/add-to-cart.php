<?php
include 'cors.php';
header("Content-Type: application/json");
include 'db_connection.php';

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get raw POST data
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate the required fields
    if (!isset($data['productId']) || !isset($data['userId'])) {
        header('Content-Type: application/json', true, 400);
        echo json_encode(['message' => 'Missing fields.']);
        exit();
    }

    $productId = $data['productId'];
    $userId = $data['userId'];

    $userCheckQuery = "SELECT * FROM users WHERE id = ?";
    $stmt = $conn->prepare($userCheckQuery);
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        header('Content-Type: application/json', true, 404);
        echo json_encode(['message' => 'User not found.']);
        exit();
    }

    $user = $result->fetch_assoc();
    $cart = json_decode($user['cart'], true); 

    $existingProductIndex = -1;
    foreach ($cart as $index => $item) {
        if ($item['productId'] == $productId) {
            $existingProductIndex = $index;
            break;
        }
    }

    if ($existingProductIndex !== -1) {
        $cart[$existingProductIndex]['quantity'] += 1;
    } else {
        $cart[] = ['productId' => $productId, 'quantity' => 1];
    }

    // Recalculate the cart count
    $cartCount = 0;
    foreach ($cart as $item) {
        $cartCount += $item['quantity'];
    }

    // Convert cart array back to JSON
    $updatedCart = json_encode($cart);

    // Update the user's cart and cart count in the database
    $updateQuery = "UPDATE users SET cart = ?, cart_count = ? WHERE id = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bind_param('sii', $updatedCart, $cartCount, $userId);
    if ($updateStmt->execute()) {
        header('Content-Type: application/json', true, 200);
        echo json_encode(['message' => 'Added to cart.']);
    } else {
        header('Content-Type: application/json', true, 500);
        echo json_encode(['message' => 'An error occurred. Please try again.']);
    }
}
?>
