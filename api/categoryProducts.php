<?php
include('db_connection.php'); 
include('cors.php');

if (isset($_GET['category'])) {
    $category = $_GET['category'];

    $category = $conn->real_escape_string($category);

    $sql = "SELECT * FROM products WHERE category = '$category'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        echo json_encode($products);
    } else {
        echo json_encode(['message' => 'No products found in this category']);
    }
} else {
    echo json_encode(['error' => 'Category parameter is missing']);
}

$conn->close();
?>
