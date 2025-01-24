<?php
$conn = new mysqli("localhost", "username", "password", "database_name");
$result = $conn->query("SELECT * FROM images");

$images = [];
while ($row = $result->fetch_assoc()) {
    $images[] = $row;
}

echo json_encode($images);
?>
