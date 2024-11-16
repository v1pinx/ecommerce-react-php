<?php
include 'db_connection.php'; 
include 'cors.php';        

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['user_id'], $data['items'], $data['total_amount'], $data['shipping_address'], $data['payment_method'])) {
    echo json_encode(["message" => "Missing required fields."]);
    http_response_code(400);
    exit();
}

$userId = $data['user_id'];
$items = $data['items'];
$totalAmount = $data['total_amount'];
$shippingAddress = $data['shipping_address'];
$paymentMethod = $data['payment_method'];

try {
    $query = "SELECT id FROM users WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(["message" => "User not found."]);
        http_response_code(404);
        exit();
    }

    $query = "INSERT INTO orders (user_id, items, total_amount, shipping_address, payment_method) 
              VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $itemsJson = json_encode($items);
    $stmt->bind_param("isdss", $userId, $itemsJson, $totalAmount, $shippingAddress, $paymentMethod);

    if ($stmt->execute()) {
        $orderId = $conn->insert_id;

        $clearCartQuery = "UPDATE users SET cart = NULL, cart_count = 0 WHERE id = ?";
        $clearCartStmt = $conn->prepare($clearCartQuery);
        $clearCartStmt->bind_param("i", $userId);

        if ($clearCartStmt->execute()) {
            $updateStatsQuery = "UPDATE stats SET revenue = revenue + ?, orders = orders + 1";
            $updateStatsStmt = $conn->prepare($updateStatsQuery);
            $updateStatsStmt->bind_param("d", $totalAmount);

            if ($updateStatsStmt->execute()) {
                echo json_encode([
                    "message" => "Order placed successfully, cart cleared, and stats updated.",
                    "order_id" => $orderId,
                ]);
                http_response_code(201);
            } else {
                echo json_encode([
                    "message" => "Order placed, cart cleared, but failed to update stats.",
                ]);
                http_response_code(500);
            }
        } else {
            echo json_encode(["message" => "Order placed, but failed to clear the cart."]);
            http_response_code(500);
        }
    } else {
        echo json_encode(["message" => "Failed to place the order."]);
        http_response_code(500);
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    echo json_encode(["message" => "An error occurred. Please try again."]);
    http_response_code(500);
}
?>
