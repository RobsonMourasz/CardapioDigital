<div class="content">
    <div class="content-header">
        <h1>Produtos</h1>
    </div> <!-- content-header -->
    <div class="content-body">
        <div class="content-button">
            <button class="btn bg-success btn-responsivo" id="btn-novo-produto" id-modal="modal-cadastrar" attr="modal" show="abrir">Novo Produto</button>
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
                    <tr>
                        <td class="ocultar-responsivo"></td>
                        <td>teste</td>
                        <td>teste</td>
                        <td>10,00</td>
                        <td></td>
                    </tr>
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
                        <span class="comanda">Pedido: 12345</span>
                        <span class="tipo-entrega">Retirada</span>
                    </div>
                    <div class="produtos">

                    </div>
                    <div class="rodape">
                        <span class="status">Status: Em preparo</span>
                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer" id="btn-visualizar-pedidos">
            <button class="btn btn-responsivo bg-success">Enviar</button>
            <button class="btn btn-responsivo bg-danger">Enviar</button>
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
                            <label for="">Descricaos do Produto
                                <input name="DescricaoProduto" type="text" class="form-control" placeholder="">
                            </label>
                        </div>

                        <div class="group-input">
                            <select name="IdCategoria">
                                <option value="">teste</option>
                                <option value="2">teste</option>
                            </select>
                            <span class="select-wrapper">
                            </span>
                        </div>

                        <div class="group-input">
                            <label for="">Valor do Produto R$
                                <input name="VrVenda" type="text" class="form-control" placeholder="0,00">
                            </label>

                            <label for="">Estoque do Produto R$
                                <input name="Estoque" type="text" class="form-control" placeholder="0,00">
                            </label>
                        </div>

                        <div class="group-input">
                            <label for="">Ingredientes do produto
                                <textarea name="Ingredientes"
                                    rows="05"></textarea>
                            </label>
                        </div>

                        <div class="group-input">
                            <div class="upload-area" id="upload-area">
                                <input type="file" id="file-input" name="Imagem" accept="image/*" hidden>
                                <div class="upload-message" id="upload-message">
                                    Arraste e solte uma imagem aqui<br>ou clique para selecionar
                                </div>
                                <img id="preview" class="preview" src="" alt="Pré-visualização" style="display: none;">
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
        <div class="modal-footer" id="btn-visualizar-pedidos">
            <button class="btn btn-responsivo bg-success">Enviar</button>
            <button class="btn btn-responsivo bg-danger">Enviar</button>
        </div>
    </div>
</div>

<!-- FIM Modal para editar cadastro de produto -->

<!-- Modal para ecluir cadastro de produto -->

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
                        <span class="comanda">Excluir Cadastro</span>
                        <span class="tipo-entrega">Retirada</span>
                    </div>
                    <div class="produtos">

                    </div>
                    <div class="rodape">
                        <span class="status">Status: Em preparo</span>
                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer" id="btn-visualizar-pedidos">
            <button class="btn btn-responsivo bg-success">Enviar</button>
            <button class="btn btn-responsivo bg-danger">Enviar</button>
        </div>
    </div>
</div>

<!-- FIM Modal para ecluir cadastro de produto -->

<script src="../../app/js/acoes.produtos.js"></script>