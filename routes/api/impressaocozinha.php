<?php

require_once __DIR__ . '/../../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Lê o corpo da requisição
    $dadosJson = file_get_contents('php://input');

    // Decodifica o JSON para um array associativo
    $pedidos = json_decode($dadosJson, true);

    ob_start();
?>

    <style>
        .title,
        .info-pedido {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: monospace;
        }

        .info-pedido {
            border-bottom: 1px dashed black;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        table thead,
        table tbody {
            padding: .5em;

        }

        th,
        td,
        strong {
            font-family: 'Calibri', sans-serif, monospace;
            padding: 8px 12px;
            text-align: left;
        }

        .content {
            margin: 0 0 1em 0;
            padding: 0 0 1em 0;
            border-bottom: 1px solid black;
        }
    </style>

    <?php
    $bodies = "";

    foreach ($pedidos as $pedido) {
        $numeroPedido = $pedido['idPedido'];
        $produtos = $pedido['produtos'];
    
        foreach ($produtos as $produto) {
            $quantidade = $produto['Qtd'];
            $descricao = $produto['DescricaoProduto'];
            $obs = !empty($produto['ObsProduto']) ? '<strong>Obs: ' . $produto['ObsProduto'] . '</strong>' : '';
    
            $body = '
            <div class="content">
                <div class="title">
                    <h1>Ticket cozinha</h1>
                </div>
    
                <div class="info-pedido">
                    <h2>Numero pedido: ' . $numeroPedido . '</h2>
                    <p>Impresso: ' . date("d-m-Y H:i") . '</p>
                </div>   
                
                <div class="produto">
                    <table>
                        <thead>
                            <tr>
                                <th>Qtd</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            <tr>
                                <td>' . $quantidade . 'x</td>
                                <td>' . $descricao . '</td>
                            </tr>
                        </tbody>
                    </table>
                    ' . $obs . '
                </div>
            </div>
            ';
    
            $bodies .= $body;
        }
    }
    
    echo $bodies;


    $conteudo = ob_get_contents();
    ob_end_clean();

    $pdf = new \Mpdf\Mpdf([
        'mode' => 'utf-8',
        'format' => [80, 80], // 80mm de largura, altura personalizável
        'margin_left' => 5,
        'margin_right' => 5,
        'margin_top' => 5,
        'margin_bottom' => 5,
    ]);

    $pdf->SetTitle('Pedido de cozinha');
    $pdf->SetWatermarkText('Gerado por Robson Moura');
    $pdf->SetDisplayMode('fullpage');
    $pdf->WriteHTML($conteudo);
    $pdf->Output('pedido_cozinha.pdf', 'I');
} else {
    http_response_code(404);
    die(json_encode(['status' => 'error', 'result' => 'Método não encontrado']));
}
