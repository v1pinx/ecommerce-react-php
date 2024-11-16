<?php
header("Access-Control-Allow-Origin: *"); // Allow access from any origin, you can change "*" to a specific domain if needed
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers


// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
?>
