<?php
include 'cors.php';
header("Content-Type: application/json");
include 'db_connection.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        getProductById($conn, $_GET['id']);
    } else {
        echo json_encode(['error' => 'Product ID is required']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

function getProductById($conn, $id)
{
    $id = intval($id); 

    $query = "SELECT * FROM products WHERE id = ?";

    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $id); 

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $product = $result->fetch_assoc();
                echo json_encode(['product' => $product]); 
            } else {
                echo json_encode(['message' => 'Product not found']);
            }
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch product: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare the query: ' . $conn->error]);
    }
}
