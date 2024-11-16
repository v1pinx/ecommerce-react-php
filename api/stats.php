<?php
header("Content-Type: application/json");
require_once 'db_connection.php';
include 'cors.php';

// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Handle requests
switch ($method) {
    case 'GET':
        getStats($conn);
        break;
    case 'POST':
        updateStats($conn);
        break;
    default:
        echo json_encode(['error' => 'Invalid request method']);
        break;
}

function getStats($conn)
{
    $query = "SELECT * FROM stats WHERE id = 1"; // Assuming you're fetching a single record

    if ($stmt = $conn->prepare($query)) {
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $stats = $result->fetch_assoc(); // Fetching a single record as associative array
                echo json_encode($stats);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Stats not found']);
            }
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch stats: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare the query: ' . $conn->error]);
    }
}


function updateStats($conn)
{
    // Fetch the current stats
    $query = "SELECT * FROM stats WHERE id = 1"; 

    if ($stmt = $conn->prepare($query)) {
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $currentStats = $result->fetch_assoc(); 

                $newRevenue = $currentStats['revenue'];
                $newOrders = $currentStats['orders'];
                $newProducts = $currentStats['products'];
                $newCustomers = $currentStats['customers'];

                // Check if a new order has been placed
                if (isset($_POST['new_order']) && $_POST['new_order'] == true) {
                    $newRevenue += $_POST['order_value']; 
                    $newOrders += 1;
                }

                if (isset($_POST['new_customer']) && $_POST['new_customer'] == true) {
                    $newCustomers += 1; 
                }

                $updateQuery = "UPDATE stats SET revenue = ?, orders = ?, products = ?, customers = ? WHERE id = 1";

                if ($updateStmt = $conn->prepare($updateQuery)) {
                    $updateStmt->bind_param("dddd", $newRevenue, $newOrders, $newProducts, $newCustomers);
                    if ($updateStmt->execute()) {
                        http_response_code(200);
                        echo json_encode(['message' => 'Stats updated successfully']);
                    } else {
                        http_response_code(500);
                        echo json_encode(['error' => 'Failed to update stats: ' . $updateStmt->error]);
                    }
                    $updateStmt->close();
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to prepare the update query: ' . $conn->error]);
                }
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Stats not found']);
            }
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch current stats: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare the query: ' . $conn->error]);
    }
}
