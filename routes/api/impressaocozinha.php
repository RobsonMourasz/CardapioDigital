<?php

require_once __DIR__ . '/../../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    if ($_POST['']){$pedido = $_POST[''];}
    $pdf = new \Mpdf\Mpdf([
        'mode' => 'utf-8',
        'format' => [80, 297], // 80mm de largura, altura personalizável
        'margin_left' => 5,
        'margin_right' => 5,
        'margin_top' => 5,
        'margin_bottom' => 5,
    ]);
    
    $pdf->SetTitle('Pedido de cozinha');
    $pdf->SetWatermarkText('Gerado por Robson Moura'); 
    $pdf->SetDisplayMode('fullpage');
    $pdf->WriteHTML('<h1>Hello world!</h1>');
    $pdf->Output('pedido_cozinha.pdf', 'I');
}else{
    http_response_code(404);
    die(json_encode(['status' => 'error', 'result' => 'Método não encontrado']));
}
