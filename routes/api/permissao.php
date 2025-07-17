<?php
include_once __DIR__ . '/../../vendor/autoload.php';
include_once __DIR__.'/../../src/controllers/seguranca.php';
header('Content-Type: application/json');
date_default_timezone_set('America/Sao_Paulo');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    http_response_code(200);
    $id = intval(isset($_GET['id']) ? $_GET['id'] : 0);
    $retorno = App\controllers\Permissao::VerificarPermissao($id, 'Produto', 'Cadastrar');
    die(json_encode([
        'status' => 'success',
        'result' => $retorno
    ]));

}else{
    
    http_response_code(500);
    die(json_encode([
        'status' => 'error',
        'result' => 'Método não autorizado'
    ]));

}