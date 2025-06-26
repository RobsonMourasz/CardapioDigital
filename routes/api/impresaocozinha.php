<?php
require_once('../../src/lib/FPDF/fpdf.php');

// Recebe os dados brutos do JS
$dados = json_decode(file_get_contents("php://input"), true);

// Configura o cabeçalho para dizer que é um PDF
header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="comanda-cozinha.pdf"');

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(40, 10, 'Comanda da Cozinha');

// Exemplo de itens
$pdf->Ln(10);
foreach ($dados['itens'] as $item) {
    $pdf->Cell(0, 10, "{$item['nome']} - Quantidade: {$item['qtd']}", 0, 1);
}

$pdf->Output();
