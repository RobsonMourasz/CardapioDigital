<?php 
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json');
header('charset: UTF-8');

if ( $_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['add'])){
        $url = 'https://wa.me/34999918179';
        $ultimoPedido = src\class\Conexao::getPesquisaBD('SELECT MAX(a.idPedido) AS UltimoPedido FROM cadpedido a LIMIT	1', '', []);
        $proxPedido = $ultimoPedido++;

        $dadosPedido = [];

        if (isset($_POST)){

            // foreach ($_POST['IdProduto'] as $key => $produtoId) {
            //     $prod[] = src\class\Conexao::getPesquisaBD('SELECT * FROM cadprodutos a WHERE a.IdProduto = ?', 'i', [$produtoId]);

            //     $valorItem = $prod['VrVenda'];
            //     $qtd = $_POST['Quantidade'][$key];
            //     $totalItem = $valorItem * $qtd ;
            //     src\class\Conexao::insertBD("INSERT INTO cadpedido ('idPedido', 'ValorPedido', 'ValorEntrega', 'ValorAdicional', 'FormaPagamento', 'Controle', 'IpCliente', 'EnderecoEntrega', 'ObservacaoPedido', 'DataPedido' ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 'idddisssss', [$proxPedido, ]);
            //     $dadosPedido[] = [
            //         'IdProduto' => $produtoId,
            //         'Quantidade' => $_POST['Quantidade'][$key],
            //         'ObsProduto' => $_POST['ObsProduto'][$key]
            //     ];
            // }
        }
        header("Location: $url");
        http_response_code(200);
        die(json_encode(['status'=>'success','result' => 'Método encontrado! ']));
    }else{
        http_response_code(405);
        die(json_encode(['status'=>'error','result' => 'Método não encontrado']));
    }

}else{
    http_response_code(405);
    die(json_encode(['status'=>'error','result' => 'Método não permitido']));
}