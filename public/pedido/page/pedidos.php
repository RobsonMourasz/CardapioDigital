<div class="content">
    <div class="content-header">
        <h1>Pedidos</h1>
    </div> <!-- content-header -->
    <div class="content-body">
        <div class="conteiner">

            <?php
            for ($i = 0; $i < 10; $i++) {
                echo '            <div class="card" pedido="1123123">
                <div class="card-header">
                    <h3 class="title-pedido">Comanda: <span>Pedido:1123123</span></h3>
                </div>
                <div class="card-body">
                    <textarea name="itens-do-pedido" cols="22" rows="5" readonly>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, minima.
                    </textarea>
                </div>
                <div class="card-footer">
                    <p class="status-pedido">Status: <span>Na chapa</span> <i class="btn bi bi-clipboard2-pulse-fill" id-modal="modal" attr="abrir"></i></p>
                </div>
            </div> <!-- card -->';
            }
            ?>

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
            <div class="group-input select-wrapper">
                <select name="" id="">
                    <option value="">selecione</option>
                    <option value="">na espera</option>
                    <option value="">fazendo</option>
                    <option value="">em rota de entrega</option>
                    <option value="">finalizado</option>
                </select>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-responsivo bg-success">Enviar</button>
            <button class="btn btn-responsivo bg-danger">Enviar</button>
        </div>
    </div>
</div>