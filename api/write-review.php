<?php
include 'db_connection.php'; 
include 'cors.php';        

header('Content-Type: application/json');

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed"]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch reviews for a product
    $productId = $_GET['productId'];
    $sql = "SELECT * FROM reviews WHERE product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $productId);
    $stmt->execute();
    $result = $stmt->get_result();

    $reviews = [];
    while ($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }

    echo json_encode(["success" => true, "reviews" => $reviews]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Add a new review
    $data = json_decode(file_get_contents("php://input"), true);
    $productId = $data['product_id'];
    $rating = $data['rating'];
    $comment = $data['comment'];

    $sql = "INSERT INTO reviews (user_id, product_id, rating, review_text) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $userId = 1; // Example: Replace with logged-in user ID
    $stmt->bind_param("iiis", $userId, $productId, $rating, $comment);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "newReview" => [
            "id" => $stmt->insert_id,
            "user" => "Anonymous", 
            "rating" => $rating,
            "comment" => $comment,
            "date" => date("Y-m-d")
        ]]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to add review"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Update helpful vote for a review
    $data = json_decode(file_get_contents("php://input"), true);
    $reviewId = $data['reviewId'];

    // Check if the reviewId exists
    $sqlCheck = "SELECT * FROM reviews WHERE id = ?";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->bind_param("i", $reviewId);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();

    if ($resultCheck->num_rows > 0) {
        // Increment the helpful count
        $sqlUpdate = "UPDATE reviews SET helpful = helpful + 1 WHERE id = ?";
        $stmtUpdate = $conn->prepare($sqlUpdate);
        $stmtUpdate->bind_param("i", $reviewId);

        if ($stmtUpdate->execute()) {
            echo json_encode(["success" => true, "message" => "Review helpful count updated"]);
        } else {
            echo json_encode(["success" => false, "error" => "Failed to update helpful vote"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Review not found"]);
    }
}

$conn->close();
?>
