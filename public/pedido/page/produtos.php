<div class="content">
    <div class="content-header">
        <h1>Produtos</h1>
    </div> <!-- content-header -->
    <div class="content-body">
        <div class="content-button">
            <button class="btn bg-success btn-responsivo" id="btn-novo-produto" id-modal="modal" attr="abrir">Novo Produto</button>
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
    <div class="modal" id="modal">
        <div class="modal-header">
            <h2>Modal Demo</h2>
            <span id-modal="modal" attr="fechar" aria-hidden="true">&#x2715;</span>
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
    <div class="modal" id="modal-editar">
        <div class="modal-header">
            <h2>Modal Demo</h2>
            <span id-modal="modal-editar" attr="fechar" aria-hidden="true">&#x2715;</span>
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

<!-- FIM Modal para editar cadastro de produto -->

<!-- Modal para ecluir cadastro de produto -->

<div class="background-modal d-none">
    <div class="modal" id="modal-excluir">
        <div class="modal-header">
            <h2>Modal Demo</h2>
            <span id-modal="modal-excluir" attr="fechar" aria-hidden="true">&#x2715;</span>
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

<!-- FIM Modal para ecluir cadastro de produto -->

<script src="../../app/js/acoes.produtos.js"></script>