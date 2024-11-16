<?php
include 'cors.php';

function base64UrlDecode($data) {
    return base64_decode(str_replace(['-', '_'], ['+', '/'], $data));
}

function verifyJWT($jwt, $secret) {
    list($base64UrlHeader, $base64UrlPayload, $base64UrlSignature) = explode('.', $jwt);

    $signature = base64UrlEncode(hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true));

    if (hash_equals($base64UrlSignature, $signature)) {
        $payload = json_decode(base64UrlDecode($base64UrlPayload), true);
        return ($payload['exp'] >= time()) ? $payload : false;
    }
    return false;
}

$headers = getallheaders();
if (isset($headers['Authorization'])) {
    $jwt = str_replace('Bearer ', '', $headers['Authorization']);
    $secret = "your_secret_key";
    $payload = verifyJWT($jwt, $secret);
    if ($payload) {
        echo json_encode(["message" => "Token valid", "user" => $payload]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Invalid or expired token"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Authorization header missing"]);
}
?>
