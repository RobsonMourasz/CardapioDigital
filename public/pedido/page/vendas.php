<div class="content">
    <div class="content-header">
        <h1>Vendas</h1>

        <div class="container-dashboard">

            <div class="dashboard btn-responsivo">
                <div class="card-header">
                    <h2>Qtd de pedidos</h2>
                </div>
                <div class="body">
                    <p id="qtd-total-venda">0</p>
                </div>
            </div>

            <div class="dashboard btn-responsivo bg-success">
                <div class="card-header">
                    <h2>Total em R$</h2>
                </div>
                <div class="body">
                    <p id="valor-total-venda">R$ 0,00</p>
                </div>
            </div>

            <div class="dashboard btn-responsivo bg-danger">
                <div class="card-header">
                    <h2>Valor Taxa + Entrega</h2>
                </div>
                <div class="body">
                    <p id="valor-taxa-entrega">R$ 0,00</p>
                </div>
            </div>
            
        </div>
    </div> <!-- content-header -->
    <div class="content-body">



        <div class="sem-dados">
            <p id="msg-sem-dados">Nenhuma venda encontrada nesse periodo.</p>
        </div>
        <div class="dados-venda">
            <div class="dados-venda-titulo">
                <div class="dados-venda-titulo-item">
                    <p>Pedido</p>
                </div>
                <div class="dados-venda-titulo-item">
                    <p>Data</p>
                </div>
                <div class="dados-venda-titulo-item">
                    <p>Valor</p>
                </div>
                <div class="dados-venda-titulo-item">
                    <p>Taxa + Entrega</p>
                </div>
            </div>
            <div class="dados-venda-conteudo">
                <div class="dados-venda-conteudo-item">
                    <p>#1</p>
                </div>
                <div class="dados-venda-conteudo-item">
                    <p>08/07/2025</p>
                </div>
                <div class="dados-venda-conteudo-item">
                    <p>R$ 0,00</p>
                </div>

                <div class="dados-venda-conteudo-item">
                    <p>R$ 0,00 + 0,00</p>
                </div>
            </div>

            <div class="itens-venda">
                <p> 1 x X - TUDO R$ 10,00</p>
                <p> 1 x X - TUDO R$ 10,00</p>
                <p> 1 x X - TUDO R$ 10,00</p>
                <p> 1 x X - TUDO R$ 10,00</p>
            </div>
        </div>
    </div> <!-- content-body -->
</div> <!-- content-->

<!-- Modal para Filtros avançados -->

<div class="background-modal d-none">
    <div class="modal" id="modal-filtro" attr="modal">
        <div class="modal-header">
            <h2>Cadastrar Produto</h2>
            <span attr="modal" id-modal="modal-filtro" show="fechar" aria-hidden="true">&#x2715;</span>
        </div>
        <div class="modal-body">

            <div class="tabela-responsiva">
                <!-- Repetir isso para cada pedido -->
                <div class="pedido">
                    <div class="cabecalho">
                        <span class="comanda">Busque pela forma de deseja.</span>
                    </div>
                    <div class="produtos">

                        <div class="group-input">
                            <label for="">Coloque a data inicial
                                <input name="DescricaoProduto" type="date">
                            </label>
                        </div>

                        <div class="group-input">
                            <label for="">Coloque a data final
                                <input name="DescricaoProduto" type="date">
                            </label>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer" id="btn-visualizar-pedidos">
            <button class="btn btn-responsivo bg-success" id="btn-buscar-filtro">Buscar</button>
            <button class="btn btn-responsivo bg-danger">Cancelar</button>
        </div>
    </div>
</div>

<!-- FIM Modal para Filtros avançados -->

<script src="../../app/js/acoes.vendas.js"></script>