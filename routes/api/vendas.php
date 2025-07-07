<?php 
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('America/Sao_Paulo');

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    if (isset($_POST['action'])){
        $action = strtolower($_POST['action']);
        if ( $action == 'relatoriodiario' ) {
            http_response_code(200);
            try {

                $relatorio = src\class\Conexao::getPesquisaBD("SELECT 
                SUM(a.ValorPedido) AS 'VrVendido', 
                SUM(a.ValorEntrega)AS 'tx-entrega', 
                SUM(a.ValorAdicional) AS 'tx-maquininha', 
                COUNT(a.idPedido) AS 'QtdVendas' 
                FROM cadpedido a 
                WHERE a.DataPedido 
                BETWEEN '?' AND '?'",
                'ss',[isset($_POST['datainicio']) ? $_POST['datainicio'] : date('Y-m-d'), isset($_POST['datafinal']) ? $_POST['datafinal'] : date('Y-m-d')]);
    
                $cadPedido = src\class\Conexao::getPesquisaBD("SELECT *
                FROM cadpedido a 
                WHERE a.DataPedido 
                BETWEEN '?' AND '?'",'ss',[isset($_POST['datainicio']) ? $_POST['datainicio'] : date('Y-m-d'), isset($_POST['datafinal']) ? $_POST['datafinal'] : date('Y-m-d')]);
    
                $mvPedido = src\class\Conexao::getPesquisaBD("SELECT *
                FROM mvpedido a 
                WHERE a.NumPedido IN( SELECT Controle FROM cadpedido a WHERE a.DataPedido BETWEEN '?' AND '?' )", 'ss',[isset($_POST['datainicio']) ? $_POST['datainicio'] : date('Y-m-d'), isset($_POST['datafinal']) ? $_POST['datafinal'] : date('Y-m-d')]);

                die(json_encode([
                    'status' => 'success', 
                    'result' => [
                        'VrVendido' => $relatorio[0]['VrVendido'] ?? 0,
                        'txEntrega' => $relatorio[0]['tx-entrega'] ?? 0,
                        'txMaquininha' => $relatorio[0]['tx-maquininha'] ?? 0,
                        'QtdVendas' => $relatorio[0]['QtdVendas'] ?? 0,
                        'cadPedido' => $cadPedido,
                        'mvPedido' => $mvPedido
                    ]
                ]));

            } catch (\Throwable $th) {
                http_response_code(401);
                die(json_encode([
                    'status' => 'error',
                    'result' => 'Erro ao buscar dados: ' . $th->getMessage()
                ]));
            }



        }else{http_response_code(404);die(json_encode(['status' => 'error', 'result' => 'Não existe $action == "relatoriodiario"']));}

    }else{http_response_code(404);die(json_encode(['status' => 'error', 'result' => 'Não existe isset($_POST[action]']));}
    

}else{
    http_response_code(401);
    die(json_encode([
        'status' => 'error',
        'result' => 'Método não permitido.'
    ]));
}