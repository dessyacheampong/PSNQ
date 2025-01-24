<?php
$id = $_POST['id'];

$conn = new mysqli("localhost", "username", "password", "database_name");
$stmt = $conn->prepare("UPDATE images SET likes = likes + 1 WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

echo "success";
?>
