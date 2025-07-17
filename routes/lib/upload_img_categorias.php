<?php
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json');

if (!isset($_FILES['arquivo'])) {
    die(json_encode(['status' => 'error', 'result' => 'Nenhum arquivo enviado.']));
    exit;
}

$arquivo = $_FILES['arquivo'];
$IdCategoria = isset($_POST['IdCategoria']) ? intval($_POST['IdCategoria']) : 0;

// Verifica erros
if ($arquivo['error'] !== UPLOAD_ERR_OK) {
    die(json_encode(['status' => 'error', 'result' => 'Erro no upload.']));
    exit;
}

// Pasta de destino
$destinoPasta = __DIR__ . '/../../app/assets/Categoria/';

if (!is_dir($destinoPasta)) {
    mkdir($destinoPasta, 0777, true);
}

// Nome do arquivo
$nomeArquivo = uniqid().'.'.pathinfo($_FILES['arquivo']['name'], PATHINFO_EXTENSION);
$caminhoCompleto = $destinoPasta . $nomeArquivo;
$destinoBancoImg = 'app/assets/Categoria/'. $nomeArquivo;
// Move o arquivo para a pasta
if (!move_uploaded_file($arquivo['tmp_name'], $caminhoCompleto)) {
    echo json_encode(['status' => 'error', 'result' => 'Falha ao mover o arquivo.']);
    exit;
}

// Salva no banco (opcional)
App\class\Conexao::insertBD('UPDATE categoria SET Imagem = ? WHERE IdCategoria = ?','si',[$destinoBancoImg, $IdCategoria]);

die(json_encode(['status' => 'success', 'result' => 'Arquivo salvo.', 'arquivo' => $nomeArquivo])); 
