<?php 
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json; charset=utf-8');

if ( $_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['add'])){
        $url = 'https://wa.me/5534999918179';
        $ultimoPedido = src\class\Conexao::getPesquisaBD('SELECT MAX(a.idPedido) AS UltimoPedido FROM cadpedido a LIMIT	1', '', []);
        //$proxPedido = $ultimoPedido++;

        //$dadosPedido = [];

        if (isset($_POST)){

        }
        
        header("Location: $url");
        http_response_code(200);
        die(json_encode(['status' => 'success', 'result' => 'Método encontrado!', 'redirect' => $url]));
    }else{
        http_response_code(405);
        die(json_encode(['status'=>'error','result' => 'Método não encontrado']));
    }

}else{
    http_response_code(405);
    die(json_encode(['status'=>'error','result' => 'Método não permitido']));
}