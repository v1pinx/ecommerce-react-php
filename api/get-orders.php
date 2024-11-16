<?php
include 'db_connection.php';
include 'cors.php';

header("Content-Type: application/json");  

$data = json_decode(file_get_contents('php://input'), true);

// Check if user_id is provided
if (isset($data['user_id'])) {
    $userId = $data['user_id'];

    $query = "SELECT * FROM orders WHERE user_id = ?";
    
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $userId);  // Bind user_id parameter

        // Execute the query
        $stmt->execute();
        $result = $stmt->get_result();

        $orders = [];

        // Fetch all the orders for the given user
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $orders[] = $row;
            }
            echo json_encode(['orders' => $orders]);
        } else {
            echo json_encode(['message' => 'No orders found for this user.']);
        }

        $stmt->close();
    } else {
        echo json_encode(['message' => 'Failed to prepare the database query.']);
    }

} else {
    // If user_id is not provided, fetch all orders
    $query = "SELECT * FROM orders";
    
    if ($stmt = $conn->prepare($query)) {
        // Execute the query for all orders
        $stmt->execute();
        $result = $stmt->get_result();

        $orders = [];

        // Fetch all the orders
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $orders[] = $row;
            }
            echo json_encode(['orders' => $orders]);
        } else {
            echo json_encode(['message' => 'No orders found.']);
        }

        $stmt->close();
    } else {
        echo json_encode(['message' => 'Failed to prepare the database query.']);
    }
}

$conn->close();
?>
