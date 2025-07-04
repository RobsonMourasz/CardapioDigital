<?php
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json');

if (!isset($_FILES['arquivo'])) {
    die(json_encode(['success' => false, 'message' => 'Nenhum arquivo enviado.']));
    exit;
}

$arquivo = $_FILES['arquivo'];
$IdProduto = isset($_POST['IdProduto']) ? intval($_POST['IdProduto']) : 0;

// Verifica erros
if ($arquivo['error'] !== UPLOAD_ERR_OK) {
    die(json_encode(['success' => false, 'message' => 'Erro no upload.']));
    exit;
}

// Pasta de destino
$destinoPasta = __DIR__ . '/../../app/assets/Produtos/';
$destinoBancoImg = 'app/assets/Produtos/';
if (!is_dir($destinoPasta)) {
    mkdir($destinoPasta, 0777, true);
}

// Nome do arquivo
$nomeArquivo = uniqid();
$caminhoCompleto = $destinoPasta . $nomeArquivo;

// Move o arquivo para a pasta
if (!move_uploaded_file($arquivo['tmp_name'], $caminhoCompleto)) {
    echo json_encode(['success' => false, 'message' => 'Falha ao mover o arquivo.']);
    exit;
}

// Salva no banco (opcional)
src\class\Conexao::insertBD('UPDATE cadprodutos SET Imagem = ? WHERE IdProduto = ?','si',[$destinoBancoImg, $IdProduto]);

die(json_encode(['success' => true, 'message' => 'Arquivo salvo.', 'arquivo' => $nomeArquivo])); 
