<?php 

header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    include_once __DIR__ . '/../../vendor/autoload.php';    
    echo json_encode(['status'=>'success', 'result'=> src\class\Conexao::getPesquisaBD('SELECT * FROM cadprodutos', '', [])]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
}