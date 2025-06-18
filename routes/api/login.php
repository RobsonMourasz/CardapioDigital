<?php 
    if ( $_SERVER['REQUEST_METHOD'] === 'POST') {
        http_response_code(200);
        die(json_encode(['status' => 'success', 'result' => 'Aceitado']));
    }else{
        http_response_code(405);
        die(json_encode(['status' => 'error', 'result' => 'Method não aceitado']));
    }