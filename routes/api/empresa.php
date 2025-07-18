<?php 
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json; charset=utf-8');

if ( $_SERVER['REQUEST_METHOD'] == 'POST'){

    $imagemAntiga = App\class\Conexao::getPesquisaBD('SELECT Imagem FROM categoria WHERE IdCategoria = ?', 'i', [intval($_POST['IdEmpresa'])]);

    if (!empty( $imagemAntiga[0]['Imagem'] ) || $imagemAntiga[0]['Imagem'] !== null ) {

        if (file_exists(__DIR__ . '/../../' . $imagemAntiga[0]['Imagem'])) {
            unlink(__DIR__ . '/../../' . $imagemAntiga[0]['Imagem']);
        }
    }

    if(App\class\Conexao::getPesquisaBD('UPDATE empresa SET RazaoSocial = ?, NomeFantasia = ?, Telefone = ?, Endereco = ?, Cidade = ?, Uf = ?, Cnpj = ? WHERE IdEmpresa = ?','sssssssi',[ strtoupper($_POST['RazaoSocial']), strtoupper($_POST['NomeFantasia']), $_POST['Telefone'], strtoupper($_POST['Endereco']), strtoupper($_POST['Cidade']), strtoupper($_POST['Uf']), $_POST['Cnpj'], intval($_POST['IdEmpresa']) ])){
        die(json_encode([
            'status' => 'success',
            'result' => 'asdasd',
            'IdEmpresa' => intval($_POST['IdEmpresa'])
        ]));
    }else{
        die(json_encode([
            'status' => 'success',
            'result' => 'asdasd'
        ]));
    }




}