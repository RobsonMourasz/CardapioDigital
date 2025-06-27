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
        .title{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: monospace;
        }
        .dados-empresa{
            display: flex;
            flex-direction: column;
            font-family: monospace;
            width: 100%;
            text-align: start;
        }

        .info-pedido {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: start;
            font-family: monospace;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        table thead,
        table tbody {
            padding: .5em;

        }

        th{
            border-bottom: 1px dashed black;
        }

        td{
            font-size: .6em;
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
        }

        .valores{
            display: flex;
            flex-direction: column;
            width: 100%;
            text-align: end;
            justify-content: end;
            align-items: end;
            font-family: monospace;
        }

        .text {
            width: 100%;
            display: inline-block;
            text-align: right;
            justify-content: end;
            align-items: end;
            padding: .2em 0;
        }

        .numero-pedido{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: monospace;
            font-weight: 600;
            padding: .5em 0;
            font-size: 1.2em;
        }

        .num{
            display: flex;
            width: 100%;
            font-weight: 600;
            background-color: rgba(0, 0, 0, 1);
            color: white;
            padding: 0 1em;
        }

        .title-footer{
            text-align: center;
            font-family: sans-serif;
        }

    </style>

    <?php
    $bodies = "";
    foreach ($pedidos as $pedido) {
        $bodies .= '<div class="content">';
            $bodies .= '<div class="header">';
                $bodies .= '<div class="title">';
                    $bodies .= '<h1>Pedidos</h1>';
                $bodies .= '</div>' ; // <!-- title -->
            $bodies .= '</div>' ; // <!-- header -->
            $bodies .= '<div class="dados-empresa">';
                $bodies .= '<p>Empresa demonstracao</p>';
                $bodies .= '<p>Endereco: rua sergipe 357 centro</p>';
                $bodies .= '<p>Telefone: (34) 3453-1490</p>';
            $bodies .= '</div>'; // <!-- dados-empresa -->
            $bodies .= '<div class="info-pedido" id="info-pedidos">';
                $bodies .= '<p>Pedidos para entrega</p>';
                $bodies .= '<div class="numero-pedido">Pedido n° <div class="num">'.$pedido['idPedido'].'</div></div>';
                $bodies .= '<p>Endereco: <strong>'.$pedido['EnderecoEntrega'].'</strong></p>';
            $bodies .= '</div>' ; // <!-- info-pedidos -->
            $bodies .= '<div class="body">';
                $bodies .= '<table>';
                    $bodies .= '<thead>';
                        $bodies .= '<tr>';
                            $bodies .= '<th>Produto</th>';
                            $bodies .= '<th>Qtd</th>';
                            $bodies .= '<th>Uni</th>';
                            $bodies .= '<th>Total</th>';
                        $bodies .= '</tr>';
                    $bodies .= '</thead>';
                    $bodies .= '<tbody>';
                    (float)$totalItem = 0;
                    (float)$total = 0;
                    foreach ($pedido['produtos'] as $item){
                        
                        (float)$total = doubleval($item['VrVenda']) * doubleval($item['Qtd']);
                        (float)$total = number_format($total, 2, ',', '.');
                        $bodies .= '<tr>';
                            $bodies .= '<td>'.$item['DescricaoCategoria'].'</td>';
                            $bodies .= '<td>'.number_format(doubleval($item['Qtd'] , 2, ',', '.')).'</td>';
                            $bodies .= '<td>'.number_format(doubleval($item['VrVenda'], 2, ',', '.')).'</td>';
                            $bodies .= '<td>'.(float)number_format($total, 2, ',', '.').'</td>';
                        $bodies .= '</tr>';
                        $totalItem = (float)$totalItem + (float)$total;

                    }
               
        $bodies .= '</tbody>';
        $bodies .= '</table>';
        $bodies .= '<div class="valores">';
            $totalItem = number_format($totalItem, 2, ',', '.');
            $bodies .= '<div class="text"><strong>Total Produtos:</strong> R$ '.$totalItem.'</div>';
            $bodies .= '<div class="text"><strong>Taxa Entrega:</strong> R$ '.number_format(doubleval($pedido['ValorEntrega']), 2, ',', '.').'</div>';
            $bodies .= '<div class="text"><strong>Taxa Cartao:</strong> R$ '. number_format(doubleval($pedido['ValorAdicional']), 2, ',', '.').'</div>';
            $vr = $totalItem + doubleval($pedido['ValorEntrega']) + doubleval($pedido['ValorAdicional']);
            $vr = number_format($vr, 2, ',', '.');
            $bodies .= '<div class="text"><strong>Total a pagar:</strong> R$ '.$vr .'</div>';
            $bodies .= '<div class="text"><strong>Levar troco:</strong> '.$pedido['ObservacaoPedido'].'</div>';
        $bodies .= '</div>' ; // <!-- valores -->
        $bodies .= '</div>' ; // <!-- body -->
        $bodies .= '<p class="title-footer">Obrigado pela preferencia, volte sempre</p>';
        $bodies .= '</div>';

    } // <!-- foreach pedidos -->
    
    echo $bodies;


    $conteudo = ob_get_contents();
    ob_end_clean();

    $pdf = new \Mpdf\Mpdf([
        'mode' => 'utf-8',
        'format' => [80, 297], // 80mm de largura, altura personalizável
        'margin_left' => 5,
        'margin_right' => 5,
        'margin_top' => 5,
        'margin_bottom' => 5,
    ]);

    $pdf->SetTitle('Tiket pedido');
    $pdf->SetWatermarkText('Gerado por Robson Moura');
    $pdf->SetDisplayMode('fullpage');
    $pdf->WriteHTML($conteudo);
    $pdf->Output('pedido.pdf', 'I');
} else {
    http_response_code(404);
    die(json_encode(['status' => 'error', 'result' => 'Método não encontrado']));
}
