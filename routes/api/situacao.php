<?php
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json');
date_default_timezone_set('America/Sao_Paulo');

if ($_SERVER['REQUEST_METHOD'] === "GET"){

    if (isset($_GET['busca']) && $_GET['busca'] === 'all'){
        http_response_code(200);
        try {

            $res = App\class\Conexao::getPesquisaBD('SELECT * FROM situacao WHERE SituacaoAtivo = "S" ','',[]);
            if ($res){
                die(json_encode([
                    'status' => 'success',
                    'result' => $res
                ]));
            } else{ die(json_encode(['status' => 'error', 'result' => 'Nenhum resultado encontrado'])); }

        } catch (\Throwable $th) {
            die(json_encode(['status' => 'error', 'result' => 'Nenhum resultado encontrado'.$th->getMessage()]));
        }
    }

}else{http_response_code(405);die(json_encode(['status' => 'error', 'result' => 'Método não permitido']));}