<?php
header('Content-Type: application/json');

// Get the POSTed JSON data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['cart']) || !is_array($data['cart']) || count($data['cart']) === 0) {
    echo json_encode(['success' => false, 'message' => 'Cart is empty or invalid.']);
    exit;
}

// Database connection
$host = 'localhost';
$user = 'root';      // <-- your DB username
$pass = '';          // <-- your DB password
$dbname = 'shop';    // <-- your DB name

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit;
}

// Save order as JSON
$order_json = $conn->real_escape_string(json_encode($data['cart']));
$sql = "INSERT INTO orders (order_data) VALUES ('$order_json')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error.']);
}

$conn->close();
?>
