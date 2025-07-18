<?php 
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json; charset=utf-8');

if ( $_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['add'])){
        $ultimoPedido = App\class\Conexao::getPesquisaBD('SELECT MAX(a.idPedido) AS UltimoPedido FROM cadpedido a LIMIT	1', '', []);
        if (empty($ultimoPedido) || $ultimoPedido == "" || $ultimoPedido == null){
            $ultimoPedido = 0;
        }
        $proxPedido = $ultimoPedido[0]['UltimoPedido'] + 1;

        if (isset($_POST)){
            $produto = [];
            
            $total = 0;
            $qtd = 0;
            foreach ($_POST['IdProduto'] as $key => $value) {
                $produto[] = [
                    'dados' => App\class\Conexao::getPesquisaBD('SELECT* FROM cadprodutos where IdProduto IN(?)','i',[$value]),
                    'qtd' => $_POST['Quantidade'][$key],
                    'obsProduto' => $_POST['ObsProduto'][$key]
                ];

            }

            $controle = uniqid();
            $VrBrutoPedido = doubleval($_POST['VrBrutoPedido']);
            $enderecoEntrega = $_POST['enderecoEntrega'];
            $formaPgto = $_POST['formaPgto'];
            $txEntrega  = doubleval($_POST['txEntrega']);
            $txMaquininha = doubleval($_POST['txMaquininha']);
            $VrLiquidoPedido = $VrBrutoPedido;
            $ip_cliente = $_SERVER['REMOTE_ADDR'];
            $obsPedido = $_POST['precisaTroco'];

            if ($txEntrega != 0){
                $VrLiquidoPedido = $VrLiquidoPedido + $txEntrega;
            }
            if ($txMaquininha){
                $VrLiquidoPedido = $VrLiquidoPedido + $txMaquininha;
            }
            $respPedido = App\class\Conexao::insertBD('INSERT INTO cadpedido (idPedido, idSituacao, ValorPedido, ValorEntrega, ValorAdicional, FormaPagamento, Controle, IpCliente, EnderecoEntrega, ObservacaoPedido, DataPedido) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)','iidddssssss',[$proxPedido, 3, $VrLiquidoPedido, $txEntrega, $txMaquininha, $formaPgto, $controle, $ip_cliente, $enderecoEntrega, $obsPedido, date('Y-m-d h:m:s')]);

            if ($respPedido){
                $numPedido = App\class\Conexao::getPesquisaBD('SELECT MAX(a.idPedido) AS UltimoPedido FROM cadpedido a LIMIT	1', '', []);
            }

            foreach ($produto as $key => $prod) {
                App\class\Conexao::insertBD('INSERT INTO mvpedido (NumPedido, IdProduto, Qtd, ObsProduto, DataLancemento) VALUES (?, ?, ?, ?, ?)','sidss',[$controle, $prod['dados'][0]['IdProduto'], $prod['qtd'], $prod['obsProduto'], date('Y-m-d') ]);
            }

        }

        foreach ($produto as $key => $item) {
            $produto[$key]['idPedido'] = $numPedido[0];
            $produto[$key]['controle'] = $controle;
            $produto[$key]['valorTotal'] = $VrLiquidoPedido;
            $produto[$key]['formaPgto'] = $formaPgto;
            $produto[$key]['endreco'] = $enderecoEntrega;
            $produto[$key]['obsPedido'] = $obsPedido;
        }
        
        http_response_code(200);
        die(json_encode(['status' => 'success', 'result' => $produto]));
    }else{
        http_response_code(405);
        die(json_encode(['status'=>'error','result' => 'Método não encontrado']));
    }

}else{
    http_response_code(405);
    die(json_encode(['status'=>'error','result' => 'Método não permitido']));
}