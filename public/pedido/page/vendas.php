<div class="content">
    <div class="content-header">
        <h1>Vendas</h1>

        <div class="container-dashboard">

            <div class="dashboard">
                <div class="card-header">
                    <h2>Qtd de pedidos</h2>
                </div>
                <div class="body">
                    <p id="qtd-total-venda">0</p>
                </div>
            </div>

            <div class="dashboard bg-success">
                <div class="card-header">
                    <h2>Total em R$</h2>
                </div>
                <div class="body">
                    <p id="valor-total-venda">R$ 0,00</p>
                </div>
            </div>

            <div class="dashboard bg-danger">
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

<script src="../../app/js/acoes.vendas.js"></script>