<?php
$conn = new mysqli("host.docker.internal", "root", "root", "square");


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
