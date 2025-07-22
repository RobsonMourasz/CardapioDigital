<?php
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] === "GET") {
    if (isset($_GET['busca'])) {
        $res = strtolower($_GET['busca']);
        if ($res === 'all') {
            http_response_code(200);
            $cadPedido = App\local\Conexao::getPesquisaBD('SELECT * FROM cadpedido a 
                LEFT JOIN situacao b ON a.idSituacao = b.IdSituacao
                WHERE b.DescriacaoSituacao <> "Cancelado" AND b.DescriacaoSituacao <> "Concluido" ORDER BY idPedido DESC', '', []);
            $mvPedido = App\local\Conexao::getPesquisaBD('SELECT * FROM mvpedido a 
                LEFT JOIN cadprodutos b ON a.IdProduto = b.IdProduto
                LEFT JOIN categoria c ON b.IdCategoria = c.IdCategoria
                WHERE a.NumPedido IN ( SELECT Controle FROM cadpedido a 
                LEFT JOIN situacao b ON a.idSituacao = b.IdSituacao
                WHERE b.DescriacaoSituacao <> "Cancelado" AND b.DescriacaoSituacao <> "Concluido" )', '', []);

            $acoes = App\local\Conexao::getPesquisaBD('SELECT * FROM situacao WHERE SituacaoAtivo = "S"', '', []);
            die(json_encode([
                "status" => "ok",
                "result" => ["cad_pedido" => $cadPedido, "mv_pedido" => $mvPedido, "acoes" => $acoes]
            ]));
        }

    } else if (isset($_GET['altAcao']) && !empty($_GET['idPedido'])) {

        http_response_code(200);

        if ( App\local\Conexao::insertBD('UPDATE cadpedido SET idSituacao = ? WHERE idPedido = ?','ii',[$_GET['altAcao'], $_GET['idPedido']]) ){
        
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

    } else if (isset($_GET['verificaPedido']) && !empty($_GET['verificaPedido'])){
        http_response_code(200);

        try {
            $res = App\local\Conexao::getPesquisaBD('SELECT * FROM cadpedido a WHERE a.idSituacao IN( SELECT IdSituacao FROM situacao WHERE DescriacaoSituacao LIKE "%Aguardando%" )','',[]);
            if ( $res ) {
    
                if ( count($res) > 0){
                    die(json_encode([
                        'status' => 'ok',
                        'result' => $res
                    ]));
                }
    
            }else{
                die(json_encode([
                    'status' => 'ok',
                    'result' => false
                ]));
            }
        } catch (\Throwable $th) {
            die(json_encode([
                'status' => 'error',
                'result' => 'Falha na busca'
            ]));
        }

    }

} else {
    http_response_code(404);
    die(json_encode(['status' => 'error', 'result' => 'Método não encontrado']));
}
