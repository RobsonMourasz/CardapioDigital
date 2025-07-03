<?php
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json');
date_default_timezone_set('America/Sao_Paulo');

if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    http_response_code(200);

    if (isset($_GET['busca'])){
        
        if ($_GET['busca'] == "all"){
            $res[] = src\class\Conexao::getPesquisaBD('SELECT * FROM categoria WHERE CadAtivo = "S" ','',[]);
            if ($res){

                die(json_encode([
                    'status' => 'success',
                    'result' => $res
                ]));

            }else{
                die(json_encode([
                    'status' => 'error',
                    'result' => 'Nenhum resultado encontrado'
                ]));
            }
        }

    }

    if (isset($_GET['acao'])){
        if ($_GET['acao'] == 'delete'){
            if ( src\class\Conexao::deleteBD('categoria', 'IdCategoria', $_GET['id']) ){
                die(json_encode([
                    'status' => 'success',
                    'result' => 'Categoria excluída com sucesso!'
                ]));
            }else{
                die(json_encode([
                    'status' => 'error',
                    'result' => 'Categoria não foi excluida'
                ]));            
            }
        }
    }

}else{

    http_response_code(405);
    die(json_encode([
        'status' => 'error',
        'result' => 'Método não permitido'
    ]));

}