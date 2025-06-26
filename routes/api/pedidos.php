<?php
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] === "GET") {
    if (isset($_GET['busca'])) {
        $res = strtolower($_GET['busca']);
        if ($res === 'all') {
            http_response_code(200);
            $cadPedido = src\class\Conexao::getPesquisaBD('SELECT * FROM cadpedido a 
                LEFT JOIN situacao b ON a.idSituacao = b.IdSituacao
                WHERE b.DescriacaoSituacao <> "Cancelado" AND b.DescriacaoSituacao <> "Concluido"', '', []);
            $mvPedido = src\class\Conexao::getPesquisaBD('SELECT * FROM mvpedido a 
                LEFT JOIN cadprodutos b ON a.IdProduto = b.IdProduto
                LEFT JOIN categoria c ON b.IdCategoria = c.IdCategoria
                WHERE a.NumPedido IN ( SELECT Controle FROM cadpedido a 
                LEFT JOIN situacao b ON a.idSituacao = b.IdSituacao
                WHERE b.DescriacaoSituacao <> "Cancelado" AND b.DescriacaoSituacao <> "Concluido" )', '', []);

            $acoes = src\class\Conexao::getPesquisaBD('SELECT * FROM situacao WHERE SituacaoAtivo = "S"', '', []);
            die(json_encode([
                "status" => "ok",
                "result" => ["cad_pedido" => $cadPedido, "mv_pedido" => $mvPedido, "acoes" => $acoes]
            ]));
        }

    } else if (isset($_GET['altAcao']) && isset($_GET['idPedido'])) {

        http_response_code(200);

        if ( src\class\Conexao::insertBD('UPDATE cadpedido SET idSituacao = ? WHERE idPedido = ?','ii',[$_GET['altAcao'], $_GET['idPedido']]) ){
        
            die(json_encode([
                'status' => 'ok',
                'result' => 'Alterado com sucesso'
            ]));
        
        }else{
        
            die(json_encode([
                'status' => 'error',
                'result' => 'Falha ao alterar'
            ]));

        }

    }

} else {
    http_response_code(404);
    die(json_encode(['status' => 'error', 'result' => 'Método não encontrado']));
}
