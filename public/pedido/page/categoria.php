<?php 
    include_once __DIR__.'/../../../vendor/autoload.php';
    App\controllers\Seguranca::verificacao();
?>
<div class="content">
    <div class="content-header">
        <h1>Categorias</h1>
    </div> <!-- content-header -->
    <div class="content-body">
        <div class="content-button">
            <button class="btn" id="btn-nova-categoria" disabled >Nova Categoria</button>
        </div>

        <div class="table">
            <table class="responsive">
                <thead>
                    <tr>
                        <th class="ocultar-responsivo">Imagem</th>
                        <th>Descricao</th>
                        <th>Acoes</th>
                    </tr>
                </thead>
                <tbody id="tbody-categoria">

                    <!-- <tr>
                        <td class="ocultar-responsivo"></td>
                        <td>teste</td>
                        <td></td>
                    </tr> -->
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
                        <span class="comanda">Cadastro categoria</span>
                    </div>
                    <div class="produtos">
                        <input type="number" hidden name="IdCategoria">
                        <div class="group-input">
                            <label for="">Descrição da Categoria
                                <input name="DescricaoCategoria" type="text">
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
        <div class="modal-footer">
            <button class="btn btn-responsivo bg-success" id="btn-cad-categoria">Cadastrar</button>
            <button class="btn btn-responsivo bg-danger" id-modal="modal-cadastrar" attr="modal" show="fechar">Cancelar</button>
        </div>
    </div>
</div>

<!-- FIM Modal para cadastro de novo produto -->

<!-- Modal para EDITAR de novo produto -->

<div class="background-modal d-none">
    <div class="modal" id="modal-editar" attr="modal">
        <div class="modal-header">
            <h2>Ediçao categoria</h2>
            <span attr="modal" id-modal="modal-editar" show="fechar" aria-hidden="true">&#x2715;</span>
        </div>
        <div class="modal-body">

            <div class="tabela-responsiva">
                <!-- Repetir isso para cada pedido -->
                <div class="pedido">
                    <div class="cabecalho">
                        <span class="comanda">Ediçao categoria</span>
                    </div>
                    <div class="produtos">
                        <input type="number" hidden name="IdCategoria">
                        <div class="group-input">
                            <label for="">Descrição da Categoria
                                <input name="DescricaoCategoria" type="text">
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
        <div class="modal-footer">
            <button class="btn btn-responsivo bg-success" id="btn-edit-categoria">Alterar</button>
            <button class="btn btn-responsivo bg-danger" id-modal="modal-editar" attr="modal" show="fechar">Cancelar</button>
        </div>
    </div>
</div>

<!-- FIM Modal para EDITAR de novo produto -->

<!-- Modal para EXCLUIR produto -->

<div class="background-modal d-none">

    <div class="modal" id="modal-excluir" attr="modal">
        <div class="modal-header">
            <h2>Exclusão de cadastro</h2>
            <span attr="modal" id-modal="modal-excluir" show="fechar" aria-hidden="true">&#x2715;</span>
        </div>
        <div class="modal-body">

            <div class="tabela-responsiva">
                <!-- Repetir isso para cada pedido -->
                <div class="pedido">
                    <div class="cabecalho">
                        <span class="comanda">Deseja realmente excluir ?</span>
                    </div>
                    <div class="produtos">

                        <input type="number" hidden name="IdCategoria">
                        <div class="group-input">
                            <label for="">Descrição categoria
                                <input name="DescricaoCategoria" type="text" readonly>
                            </label>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer">
            <button class="btn btn-responsivo bg-danger" id-modal="modal-excluir" attr="modal" show="fechar">Cancelar</button>
            <button class="btn btn-responsivo bg-success" id="btn-exc-categoria">Excluir</button>
        </div>
    </div>

</div>

<!-- FIM Modal para EXCLUIR produto -->


<script src="../../app/js/acoes.categorias.js"></script>