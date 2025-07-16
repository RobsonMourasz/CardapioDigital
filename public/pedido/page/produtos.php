<?php
include_once __DIR__ . '/../../../vendor/autoload.php';
src\controllers\Seguranca::verificacao();

?>
<div class="content">
    <div class="content-header">
        <h1>Produtos</h1>
    </div> <!-- content-header -->
    <div class="content-body">
        <div class="content-button">
            <button class="btn btn-responsivo" disabled  id="btn-novo-produto" >Novo Produto</button>
        </div>
        <div class="table">
            <table class="responsive">
                <thead>
                    <tr>
                        <th class="ocultar-responsivo">Imagem</th>
                        <th>Descricao</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Acoes</th>
                    </tr>
                </thead>
                <tbody id="tbody-produtos">

                </tbody>
            </table>
        </div>
    </div> <!-- content-body -->
</div> <!-- content-->

<!-- Modal para cadastro de novo produto -->

<div class="background-modal d-none">
    <div class="modal" id="modal-cadastrar" attr="modal">
        <div class="modal-header">
            <h2>Cadastrar Produto</h2>
            <span attr="modal" id-modal="modal-cadastrar" show="fechar" aria-hidden="true">&#x2715;</span>
        </div>
        <div class="modal-body">

            <div class="tabela-responsiva">
                <!-- Repetir isso para cada pedido -->
                <div class="pedido">
                    <div class="cabecalho">
                        <span class="comanda">Cadastro Produto</span>
                    </div>
                    <div class="produtos">
                        <input type="number" hidden name="IdProduto">
                        <div class="group-input">
                            <label for="">Descrição do Produto
                                <input name="DescricaoProduto" type="text">
                            </label>
                        </div>

                        <div class="group-input">
                            <label for="IdCategoria">Categoria
                                <select name="IdCategoria" id="cad-categoria"></select>
                            </label>
                            <span class="select-wrapper">
                            </span>
                        </div>

                        <div class="group-input">
                            <label for="">Valor do Produto R$
                                <input name="VrVenda" type="text" placeholder="0,00">
                            </label>

                            <label for="">Estoque do Produto R$
                                <input name="Estoque" type="text" placeholder="0,00">
                            </label>
                        </div>

                        <div class="group-input">
                            <label for="">Ingredientes do produto
                                <textarea name="Ingredientes" rows="05"></textarea>
                            </label>
                        </div>

                        <div class="group-input">
                            <div class="upload-area">
                                <input type="file" class="file-input" name="Imagem" accept="image/*" hidden>
                                <div class="upload-message">
                                    Arraste e solte uma imagem aqui<br>ou clique para selecionar
                                </div>
                                <img class="preview" src="" alt="Pré-visualização" style="display: none;">
                            </div>
                            <button class="remove-image-button btn" style="display:none;">Remover imagem</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer" id="btn-visualizar-pedidos">
            <button class="btn btn-responsivo bg-success" id="btn-cad-prod">Cadastrar</button>
            <button class="btn btn-responsivo bg-danger">Cancelar</button>
        </div>
    </div>
</div>

<!-- FIM Modal para cadastro de novo produto -->

<!-- Modal para editar cadastro de produto -->

<div class="background-modal d-none">
    <div class="modal" id="modal-editar" attr="modal">
        <div class="modal-header">
            <h2>Editar Cadastro</h2>
            <span attr="modal" id-modal="modal-editar" show="fechar" aria-hidden="true">&#x2715;</span>
        </div>
        <div class="modal-body">

            <div class="tabela-responsiva">
                <!-- Repetir isso para cada pedido -->
                <div class="pedido">

                    <div class="produtos">
                        <input type="number" hidden name="IdProduto">
                        <div class="group-input">
                            <label for="">Descrição do Produto
                                <input name="DescricaoProduto" type="text">
                            </label>
                        </div>

                        <div class="group-input">
                            <label for="IdCategoria">Categoria
                                <select name="IdCategoria" id="edt-categoria"></select>
                            </label>
                            <span class="select-wrapper">
                            </span>
                        </div>

                        <div class="group-input">
                            <label for="">Valor do Produto R$
                                <input name="VrVenda" type="text" placeholder="0,00">
                            </label>

                            <label for="">Estoque do Produto R$
                                <input name="Estoque" type="text" placeholder="0,00">
                            </label>
                        </div>

                        <div class="group-input">
                            <label for="">Ingredientes do produto
                                <textarea name="Ingredientes" rows="05"></textarea>
                            </label>
                        </div>

                        <div class="group-input">
                            <div class="upload-area">
                                <input type="file" class="file-input" name="Imagem" accept="image/*" hidden>
                                <div class="upload-message">
                                    Arraste e solte uma imagem aqui<br>ou clique para selecionar
                                </div>
                                <img class="preview" src="" alt="Pré-visualização" style="display: none;">
                            </div>
                            <button class="remove-image-button btn" style="display:none;">Remover imagem</button>
                        </div>

                    </div>

                </div>
            </div>

        </div>
        <div class="modal-footer" id="btn-visualizar-pedidos">
            <button class="btn btn-responsivo bg-danger" attr="modal" id-modal="modal-editar" show="fechar">Cancelar</button>
            <button class="btn btn-responsivo bg-success" id="btn-editar-produto">Editar</button>
        </div>
    </div>
</div>

<!-- FIM Modal para editar cadastro de produto -->

<!-- Modal para excluir cadastro de produto -->

<div class="background-modal d-none">
    <div class="modal" id="modal-excluir" attr="modal">
        <div class="modal-header">
            <h2>Excluir Cadastro</h2>
            <span attr="modal" id-modal="modal-excluir" show="fechar" aria-hidden="true">&#x2715;</span>
        </div>
        <div class="modal-body">

            <div class="tabela-responsiva">
                <!-- Repetir isso para cada pedido -->
                <div class="pedido">
                    <div class="cabecalho">
                        <span>Deseja realmente excluir o cadastro ?</span>
                    </div>
                    <div class="produtos">
                        <div class="group-input">
                            <input type="text" name="IdProduto" hidden>
                            <input type="text" name="DescricaoProduto" readonly>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer" id="btn-visualizar-pedidos">
            <button class="btn btn-responsivo bg-danger" attr="modal" id-modal="modal-excluir" show="fechar">Cancelar</button>
            <button class="btn btn-responsivo bg-success" id="btn-excluir-item">Confirmar</button>
        </div>
    </div>
</div>

<!-- FIM Modal para excluir cadastro de produto -->

<script src="../../app/js/acoes.produtos.js"></script>