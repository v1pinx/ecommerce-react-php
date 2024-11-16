<?php
include 'cors.php';
header("Content-Type: application/json");
include 'db_connection.php';

// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Handle requests
switch ($method) {
    case 'GET':
        getProducts($conn);
        break;
    case 'POST':
        addProduct($conn);
        break;
    case 'PUT':
        updateProduct($conn);
        break;
    case 'DELETE':
        deleteProduct($conn);
        break;
    default:
        echo json_encode(['error' => 'Invalid request method']);
        break;
}

function getProducts($conn)
{
    // Handle query parameters
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 20;
    $category = isset($_GET['type']) ? $_GET['type'] : null;
    $sort = isset($_GET['sort']) ? $_GET['sort'] : null;

    $skip = ($page - 1) * $limit;
    $query = "SELECT * FROM products";

    // Add category filter if available
    if ($category) {
        $query .= " WHERE category = ?";
    }

    // Add sorting if needed
    if ($sort) {
        $sortOrder = $sort === 'desc' ? 'DESC' : 'ASC';
        $query .= " ORDER BY price " . $sortOrder;
    }

    // Add limit and offset for pagination
    $query .= " LIMIT ? OFFSET ?";

    if ($stmt = $conn->prepare($query)) {
        // Bind parameters for category, limit, and offset
        if ($category) {
            $stmt->bind_param("sii", $category, $limit, $skip);
        } else {
            $stmt->bind_param("ii", $limit, $skip);
        }

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $products = [];
                while ($row = $result->fetch_assoc()) {
                    $products[] = $row;
                }
                echo json_encode($products);
            } else {
                echo json_encode([]);
            }
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch products: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare the query: ' . $conn->error]);
    }
}

function addProduct($conn)
{
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode(['error' => 'Invalid input']);
        return;
    }

    $title = $data['title'];
    $image = $data['image'];  
    $price = intval($data['price']);
    $description = $data['description'];
    $brand = $data['brand'];
    $model = $data['model'];
    $color = $data['color'];
    $category = $data['category'];
    $popular = (bool)$data['popular']; 
    $discount = intval($data['discount']); 

    // 1. Insert the new product
    $query = "INSERT INTO products (title, image, price, description, brand, model, color, category, popular, discount) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("ssisssssii", $title, $image, $price, $description, $brand, $model, $color, $category, $popular, $discount);

        if ($stmt->execute()) {
            // 2. Update the stats table to increase the product count
            $updateStatsQuery = "UPDATE stats SET products = products + 1 WHERE id = 1";

            if ($updateStmt = $conn->prepare($updateStatsQuery)) {
                if ($updateStmt->execute()) {
                    echo json_encode(['message' => 'Product added and product count updated successfully']);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to update product count in stats: ' . $updateStmt->error]);
                }
                $updateStmt->close();
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to prepare the stats update query: ' . $conn->error]);
            }
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to add product: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare the product insertion query: ' . $conn->error]);
    }
}

function updateProduct($conn)
{
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['id'])) {
        echo json_encode(['error' => 'Invalid input or missing product ID']);
        return;
    }

    // Validate and sanitize the input data
    $id = intval($data['id']);
    $title = $data['title'] ?? null;
    $image = $data['image'] ?? null;
    $price = isset($data['price']) ? intval($data['price']) : null;
    $description = $data['description'] ?? null;
    $brand = $data['brand'] ?? null;
    $model = $data['model'] ?? null;
    $color = $data['color'] ?? null;
    $category = isset($data['category']) ? intval($data['category']) : null;
    $popular = isset($data['popular']) ? (bool)$data['popular'] : null;
    $discount = isset($data['discount']) ? intval($data['discount']) : null;

    // Prepare the update query
    $query = "UPDATE products SET title = ?, image = ?, price = ?, description = ?, brand = ?, model = ?, color = ?, category = ?, popular = ?, discount = ? WHERE id = ?";

    if ($stmt = $conn->prepare($query)) {
        // Bind parameters
        $stmt->bind_param("ssissssiiii", $title, $image, $price, $description, $brand, $model, $color, $category, $popular, $discount, $id);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Product updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update product: ' . $stmt->error]);
        }

        // Close the statement
        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare the query: ' . $conn->error]);
    }
}

function deleteProduct($conn)
{
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id'])) {
        echo json_encode(['error' => 'Product ID is required']);
        return;
    }

    $id = intval($data['id']);
    $query = "DELETE FROM products WHERE id = ?";

    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            // Update product stats (example)
            $updateStatsQuery = "UPDATE stats SET products = products - 1 WHERE id = 1"; // Assuming 1 is the stats row
            if ($conn->query($updateStatsQuery)) {
                echo json_encode(['message' => 'Product deleted successfully and stats updated']);
            } else {
                echo json_encode(['error' => 'Failed to update stats']);
            }
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete product: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare the query: ' . $conn->error]);
    }
}
