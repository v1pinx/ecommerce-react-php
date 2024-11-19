<?php
include 'db_connection.php';
include 'cors.php';

header('Content-Type: application/json');

// Retrieve the POST data
$data = json_decode(file_get_contents("php://input"), true);

$userId = isset($data['userId']) ? $data['userId'] : null;
$productId = isset($data['productId']) ? $data['productId'] : null;
$quantity = isset($data['quantity']) ? (int)$data['quantity'] : null;

if (!$productId || !$userId) {
    echo json_encode(["message" => "Missing fields."]);
    http_response_code(400); // Bad Request
    exit();
}

try {
    // Fetch the user's cart
    $query = "SELECT cart FROM users WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if (!$user) {
        echo json_encode(["message" => "User not found."]);
        http_response_code(404); // Not Found
        exit();
    }

    // Decode the cart
    $cart = json_decode($user['cart'], true);

    if (!$cart || !is_array($cart)) {
        echo json_encode(["message" => "Cart is empty or invalid."]);
        http_response_code(400); // Bad Request
        exit();
    }

    // Find the product index
    $productIndex = array_search($productId, array_column($cart, 'productId'));

    if ($productIndex === false) {
        echo json_encode(["message" => "Product not found in cart."]);
        http_response_code(404); // Not Found
        exit();
    }

    // Update the product's quantity or remove it
    if ($cart[$productIndex]['quantity'] == 1 && $quantity <= 0) {
        array_splice($cart, $productIndex, 1);
    } else{
        $cart[$productIndex]['quantity'] = $quantity;
    }

    // Recalculate cart count
    $cartCount = array_reduce($cart, function ($count, $item) {
        return $count + $item['quantity'];
    }, 0);

    // Save updated cart back to the database
    $cartJson = json_encode($cart);
    $updateQuery = "UPDATE users SET cart = ?, cart_count = ? WHERE id = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bind_param("sii", $cartJson, $cartCount, $userId);
    $updateStmt->execute();

    echo json_encode(["message" => "Product removed from cart.", "cart" => $cart, "cart_count" => $cartCount]);
    http_response_code(200); // OK
} catch (Exception $e) {
    error_log($e->getMessage());
    echo json_encode(["message" => "An error occurred. Please try again."]);
    http_response_code(500); // Internal Server Error
}
?>
