<?php
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('America/Sao_Paulo');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['action'])) {
        $action = strtolower($_POST['action']);

        if ($action == 'relatoriodiario') {
            http_response_code(200);
            try {
                $relatorio = App\class\Conexao::getPesquisaBD(
                    "SELECT 
                SUM(a.ValorPedido) AS 'VrVendido', 
                SUM(a.ValorEntrega)AS 'tx-entrega', 
                SUM(a.ValorAdicional) AS 'tx-maquininha', 
                COUNT(a.idPedido) AS 'QtdVendas' 
                FROM cadpedido a 
                WHERE a.DataPedido 
                BETWEEN ? AND ? AND a.idSituacao IN(?) AND a.FormaPagamento LIKE ? ",
                    'ssis',
                    [
                        isset($_POST['datainicio']) ? $_POST['datainicio'] . ' 00:00:00' : date('Y-m-d') . ' 00:00:00',
                        isset($_POST['datafinal']) ? $_POST['datafinal'] . ' 23:59:59' : date('Y-m-d') . ' 23:59:59',
                        isset($_POST['situacao']) ? intval($_POST['situacao']) : 0,
                        '%' . (!empty($_POST['formapgto']) ? $_POST['formapgto'] : '') . '%'
                    ]
                );

                $cadPedido = App\class\Conexao::getPesquisaBD(
                    "SELECT *
                FROM cadpedido a 
                WHERE a.DataPedido 
                BETWEEN ? AND ? AND a.idSituacao IN(?) AND a.FormaPagamento LIKE ? ",
                    'ssis',
                    [
                        isset($_POST['datainicio']) ? $_POST['datainicio'] . ' 00:00:00' : date('Y-m-d') . ' 00:00:00',
                        isset($_POST['datafinal']) ? $_POST['datafinal'] . ' 23:59:59' : date('Y-m-d') . ' 23:59:59',
                        isset($_POST['situacao']) ? intval($_POST['situacao']) : 0,
                        '%' . (!empty($_POST['formapgto']) ? $_POST['formapgto'] : '') . '%'
                    ]
                );

                $mvPedido = App\class\Conexao::getPesquisaBD("SELECT *
                FROM mvpedido a 
                WHERE a.NumPedido IN( SELECT Controle FROM cadpedido a WHERE a.DataPedido BETWEEN ? AND ? AND a.idSituacao IN(?) AND a.FormaPagamento LIKE ? ) ", 'ssis',[isset($_POST['datainicio']) ? $_POST['datainicio'].' 00:00:00' : date('Y-m-d') .' 00:00:00', isset($_POST['datafinal']) ? $_POST['datafinal']. ' 23:59:59' : date('Y-m-d'). ' 23:59:59', isset($_POST['situacao']) ? intval($_POST['situacao']) : 0, '%' . (!empty($_POST['formapgto']) ? $_POST['formapgto'] : '') . '%' ]);

                die(json_encode([
                    'status' => 'success',
                    'result' => [
                        'VrVendido' => doubleval($relatorio[0]['VrVendido']) ?? 0,
                        'txEntrega' => doubleval($relatorio[0]['tx-entrega']) ?? 0,
                        'txMaquininha' => doubleval($relatorio[0]['tx-maquininha']) ?? 0,
                        'QtdVendas' => intval($relatorio[0]['QtdVendas']) ?? 0,
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
        } else {
            http_response_code(404);
            die(json_encode(['status' => 'error', 'result' => 'Não existe $action == "relatoriodiario"']));
        }
    } else {
        http_response_code(404);
        die(json_encode(['status' => 'error', 'result' => 'Não existe isset($_POST[action]']));
    }
} else {
    http_response_code(401);
    die(json_encode(['status' => 'error', 'result' => 'Método não permitido.']));
}
