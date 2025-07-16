<?php
include_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../src/controllers/seguranca.php';
header('Content-Type: application/json');
date_default_timezone_set('America/Sao_Paulo');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_SESSION)){session_start();}
    if ($_GET['busca']) {
        if ($_GET['busca'] === 'all') {
            $res = [
                'categoria' => src\class\Conexao::getPesquisaBD('SELECT * FROM categoria WHERE CadAtivo = "S"', '', []),
                'produtos' => src\class\Conexao::getPesquisaBD('SELECT * FROM cadprodutos WHERE ProdAtivo = "S"', '', []),
                'formaPgto' => src\class\Conexao::getPesquisaBD('SELECT * FROM cadpagamento WHERE PagAtivo = "S"', '', []),
            ];
            die(json_encode([
                'status' => 'success',
                'result' => $res
            ]));
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    http_response_code(200);
    $dadosJson = file_get_contents('php://input');
    // Decodifica o JSON para um array associativo
    $produtos = json_decode($dadosJson, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        die(json_encode([
            '
            status' => 'error',
            'result' => 'JSON inválido'
        ]));
    }

    if ($produtos['method'] == 'cadastrar') {

        if (src\class\Conexao::insertBD('INSERT cadprodutos (IdProduto, IdCategoria, ProdAtivo, DescricaoProduto, Imagem, VrVenda, Estoque, Ingredientes, DataCadastro, DataAlteracao, UltimaMovimentacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 'iisssddssss', [NULL, intval($produtos['IdCategoria']), 'S', strtoupper($produtos['DescricaoProduto']), $produtos['Imagem'] ?? NULL, doubleval($produtos['VrVenda']), doubleval($produtos['Estoque']), $produtos['Ingredientes'], date('Y-m-d H:i:s'), date('Y-m-d H:i:s'), date('Y-m-d H:i:s')])) {

            die(json_encode([
                'status' => 'success',
                'result' => 'Cadastrado com sucesso',
                'IdProduto' => src\class\Conexao::getUltimoIdInserido('cadprodutos', 'IdProduto')
            ]));
        } else {

            die(json_encode([
                '
            status' => 'error',
                'result' => 'Erro ao inserir o produto'
            ]));
        }
    }

    if ($produtos['method'] == 'editar') {

        if (isset($produtos['file']) && !empty($produtos['file'])) {

            $imagemAntiga = src\class\Conexao::getPesquisaBD('SELECT Imagem FROM cadprodutos WHERE IdProduto = ?', 'i', [intval($produtos['IdProduto'])]);

            if (!empty( $imagemAntiga[0]['Imagem'] ) || $imagemAntiga[0]['Imagem'] !== null ) {

                if (file_exists(__DIR__.'/../../'.$imagemAntiga[0]['Imagem'])) {
                    unlink(__DIR__.'/../../'.$imagemAntiga[0]['Imagem']);
                }

            }

        }

        if (src\class\Conexao::insertBD('UPDATE cadprodutos SET IdCategoria = ?, ProdAtivo = ?, DescricaoProduto = ?, Imagem = ?, VrVenda = ?, Estoque = ?, Ingredientes = ?, DataAlteracao = ? WHERE IdProduto = ?', 'isssddssi', [intval($produtos['IdCategoria']), 'S', $produtos['DescricaoProduto'], $produtos['Imagem'], $produtos['VrVenda'], $produtos['Estoque'], $produtos['Ingredientes'], date('Y-m-d H:m:s'), intval($produtos['IdProduto'])])) {

            die(json_encode([
                'status' => 'success',
                'result' => 'Alterado com sucesso ',
                'IdProduto' => intval($produtos['IdProduto'])
            ]));
        } else {
            die(json_encode([
                'status' => 'error',
                'result' => 'Erro ao alterar o item.'
            ]));
        }
    }

    if ($produtos['method'] == 'excluir') {
        $imagemApagar = src\class\Conexao::getPesquisaBD('SELECT Imagem FROM cadprodutos WHERE IdProduto = ?', 'i', [intval($produtos['IdProduto'])]);

        if (!empty( $imagemApagar[0]['Imagem'] ) || $imagemApagar[0]['Imagem'] !== null ) {

            if (file_exists(__DIR__.'/../../'.$imagemApagar[0]['Imagem'])) {
                unlink(__DIR__.'/../../'.$imagemApagar[0]['Imagem']);
            }

        }

        if (src\class\Conexao::deleteBD('cadprodutos', 'IdProduto', $produtos['IdProduto'])) {

            die(json_encode([
                'status' => 'success',
                'result' => 'Excluido com sucesso'
            ]));
        } else {

            die(json_encode([
                'status' => 'error',
                'result' => 'Erro ao excluir o item.'
            ]));
        }
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
}
