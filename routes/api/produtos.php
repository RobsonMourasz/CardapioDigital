<?php 
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if ( $_GET['busca'] ){
        if ( $_GET['busca'] === 'all'){
            echo json_encode(['status'=>'success', 'categoria'=> src\class\Conexao::getPesquisaBD('SELECT * FROM categoria WHERE CadAtivo = "S"', '', []), 
            'produtos'=> src\class\Conexao::getPesquisaBD('SELECT * FROM cadprodutos WHERE ProdAtivo = "S"', '', []), 
            'formaPgto'=> src\class\Conexao::getPesquisaBD('SELECT * FROM cadpagamento WHERE PagAtivo = "S"', '', [])]);
        }
    }


} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
}