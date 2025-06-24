<div class="content">
    <div class="content-header">
        <h1>Pedidos</h1>
    </div> <!-- content-header -->
    <div class="content-body">
        <div class="conteiner" id="add_pedidos">

            <div class="card" pedido="1">
                <div class="card-header">
                    <h3 class="title-pedido">Comanda: <span>Pedido:1</span></h3>
                </div>
                <div class="card-body">
                    <textarea name="itens-do-pedido" cols="22" rows="5" readonly>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, minima.
                    </textarea>
                </div>
                <div class="card-footer">
                    <div class="footer-info">
                        <p class="status-pedido">Status: <span>Na chapa</span> </p>
                        <p>(Delivery)</p>
                    </div>
                    <div class="botao">
                        <i class="btn bi bi-clipboard2-pulse-fill" id-modal="modal" attr="abrir"></i>
                    </div>
                </div>
            </div> <!-- card -->

            <div class="card" pedido="2">
                <div class="card-header">
                    <h3 class="title-pedido">Comanda: <span>Pedido:2</span></h3>
                </div>
                <div class="card-body">
                    <textarea name="itens-do-pedido" cols="22" rows="5" readonly>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, minima.
                    </textarea>
                </div>
                <div class="card-footer">
                    <div class="footer-info">
                        <p class="status-pedido">Status: <span>Na chapa</span> </p>
                        <p>(Retirada)</p>
                    </div>
                    <div class="botao">
                        <i class="btn bi bi-clipboard2-pulse-fill" id-modal="modal" attr="abrir"></i>
                    </div>
                </div>
            </div> <!-- card -->

        </div>
    </div> <!-- content-body -->
</div> <!-- content-->

<div class="background-modal d-none">
    <div class="modal" id="modal">
        <div class="modal-header">
            <h2>Modal Demo</h2>
            <span id-modal="modal" attr="fechar" aria-hidden="true">&#x2715;</span>
        </div>
        <div class="modal-body">
            <div class="group-input btn-lista-ordenada">
                <ul>
                    <li><a class="text-align-center" href="">Iniciado</a></li>
                    <li><a class="text-align-center" href="">Preparando</a></li>
                    <li><a class="text-align-center" href="">Em rota</a></li>
                    <li><a class="text-align-center" href="">Concluido</a></li>
                    <li><a class="text-align-center" href="">Cancelado</a></li>
                </ul>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-responsivo bg-success">Enviar</button>
            <button class="btn btn-responsivo bg-danger">Enviar</button>
        </div>
    </div>
</div>