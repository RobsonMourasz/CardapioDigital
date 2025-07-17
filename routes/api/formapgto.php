<?php
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json');
date_default_timezone_set('America/Sao_Paulo');

if ($_SERVER['REQUEST_METHOD'] === 'GET'){

    if (isset($_GET['busca'])){
        if ($_GET['busca'] == 'all'){
            try {
                $res = App\class\Conexao::getPesquisaBD('SELECT * FROM cadpagamento WHERE PagAtivo = "S" ','',[]);
                if ( $res ){
                    http_response_code(200);
                    die(json_encode([
                        'status' => 'success',
                        'result' => $res
                    ]));
                }else{http_response_code(405);die(json_encode(['status' => 'error','result' => 'Nenhum dado encontrado']));}

            } catch (\Throwable $th) {
                die(json_encode([
                    'status' => 'error',
                    'result' => 'Erro ao buscar dados: ' . $th->getMessage()
                ]));
            }

        }
    }

} else {http_response_code(405);die(json_encode(['status' => 'error','result' => 'Método não permitido']));}