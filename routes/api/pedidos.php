<?php 
if ($_SERVER['REQUEST_METHOD'] === "GET"){
    $res = strtolower($_GET['busca']);
    if ($res === 'all'){
        http_response_code(200);
        die(json_encode([ 
            "status" => "ok",
            "result" => "aceito"
        ]));
    }
}else{
    http_response_code(404);
    die(json_encode(['status' => 'error', 'result' => 'Método não encontrado' ]));
}