<?php
$conn = new mysqli("mysql-server", "root", "root", "square");


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
