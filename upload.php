<?php
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["image"]["name"]);

if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
    // Connect to the database
    $conn = new mysqli("localhost", "username", "password", "database_name");

    // Insert image data into the database
    $stmt = $conn->prepare("INSERT INTO images (image_path, likes) VALUES (?, 0)");
    $stmt->bind_param("s", $target_file);
    $stmt->execute();

    $stmt->close();
    $conn->close();

    header("Location: index.html");
    exit();
} else {
    echo "Error uploading file.";
}
?>
