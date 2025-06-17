<?php 
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json; charset=utf-8');

if ( $_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['add'])){
        $ultimoPedido = src\class\Conexao::getPesquisaBD('SELECT MAX(a.idPedido) AS UltimoPedido FROM cadpedido a LIMIT	1', '', []);
        $proxPedido = $ultimoPedido[0]['UltimoPedido']++;

        if (isset($_POST)){
            $produto = [];
            $total = 0;
            foreach ($_POST['IdProduto'] as $key => $value) {
                $produto[] = src\class\Conexao::getPesquisaBD('SELECT* FROM cadprodutos where IdProduto IN(?)','i',[$value]);
            }
            $controle = uniqid();
            $VrBrutoPedido = $_POST['VrBrutoPedido'];
            $obsProduto = $_POST['ObsProduto'];
            $enderecoEntrega = $_POST['enderecoEntrega'];
            $formaPgto = $_POST['formaPgto'];
            $txEntrega  = doubleval($_POST['txEntrega']);
            $troco = doubleval($_POST['precisaTroco']);
            $txMaquininha = $_POST['txMaquininha'];
            $VrLiquidoPedido = $VrBrutoPedido;
            $ip_cliente = $_SERVER['REMOTE_ADDR'];
            if ($troco != 0){
                $VrLiquidoPedido = $VrLiquidoPedido + $troco;
            }
            if ($txMaquininha){
                $VrLiquidoPedido = $VrLiquidoPedido + $txMaquininha;
            }
            src\class\Conexao::insertBD('INSERT INTO cadpedido (idPedido, ValorPedido, ValorEntrega, ValorAdicional, FormaPagamento, Controle, IpCliente, EnderecoEntrega, ObservacaoPedido, DataPedido) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)','i,d,d,d,s,s,s,s,s,s',[$proxPedido, $VrLiquidoPedido, $txEntrega, $txMaquininha, $formaPgto, $controle, $ip_cliente, $enderecoEntrega, $obsProduto, date('YYYY-mm-dd')]);

            // foreach ($produto as $key => $prod) {
            //     # code...
            // }

        }
        //var_dump($produto[1][0]['DescricaoProduto']);
        http_response_code(200);
        die(json_encode(['status' => 'success', 'result' => 'Método encontrado!']));
    }else{
        http_response_code(405);
        die(json_encode(['status'=>'error','result' => 'Método não encontrado']));
    }

}else{
    http_response_code(405);
    die(json_encode(['status'=>'error','result' => 'Método não permitido']));
}