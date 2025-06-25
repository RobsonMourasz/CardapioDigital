<div class="content">
    <div class="content-header">
        <h1>Pedidos</h1>
        <div class="info-pedidos" id="info-pedidos"></div>
    </div> <!-- content-header -->
    <div class="content-body">

        <div class="conteiner" id="add_pedidos">

        </div> <!-- conteiner add_pedidos -->

    </div> <!-- content-body -->

</div> <!-- content-->

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
                        <!-- Repetir isso para cada produto -->
                        <div class="produto">
                            <p><strong>📦 Produto:</strong> X-Burger</p>
                            <p><strong>📦 Quantidade:</strong> 2</p>
                            <p><strong>💰 Valor:</strong> R$ 24,00</p>
                            <p><strong>📝 Observações:</strong> Sem cebola</p>
                            <p><strong>🥣 Ingredientes:</strong> Pão, carne, queijo, alface</p>
                        </div>

                        
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