<?php
// Use the existing connection
include('db_connection.php'); 
include('cors.php');

$sql = "SELECT DISTINCT category FROM products";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $categories = [];
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row['category'];
    }
    echo json_encode($categories);
} else {
    echo json_encode(['message' => 'No categories found']);
}

$conn->close();
?>
