<?php 
include_once __DIR__.'/vendor/autoload.php';
    $logoTipo = \App\controllers\Empresa::RetornarDados();
    $nomeEmpresa = \App\controllers\Empresa::RetornarDados();
    $nomeEmpresaFormatado = ucfirst($nomeEmpresa[0]['NomeFantasia']);
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="app/css/style.css">
    <title>Cardápio Digital</title>
</head>

<body>
    <div class="carregando d-none"></div>
    <div class="mensagem d-none"></div>
    <div class="container">
        <div class="nav">
            <div class="logo-tipo">
                <img src="<?php echo $logoTipo[0]['LogoTipo'] ?>" alt="Logo" style="width: 100px; height: auto;">
            </div>
            <div class="dados-empresa">
                <div class="title">
                    <?php echo $nomeEmpresaFormatado ?>
                </div>
                <div class="status">
                    <span class="online">Aberto</span>
                </div>
            </div>
        </div> <!-- Navigation bar with logo and company details -->
        <div class="menu-opcoes">
            <ul class="lista" id="lista-categorias">

            </ul> <!-- lista -->
        </div>
    </div> <!-- Container for the digital menu content -->

    <div class="banner-promocoes">

    </div> <!-- Banner for promotions, can be filled with images or text -->

    <div class="cardapio" id="cardapio">

    </div> <!-- Cardapio section with products listed in cards -->

    <div class="pedido d-none" id="pedido">
        <div class="close-modal">&times;</div>
        <h2 class="title-pedido">Seus Pedidos</h2>
        <form id="pedidoForm">
        </form> <!-- Form for submitting the order -->

        <div class="totalizador">
            <p>Total do pedido: R$ <span class="vr-pedido"></span></p>
            <p>Taxa Entrega: R$ <span class="tx-entrega"></span></p>
            <p>Taxa maquininha: R$ <span class="tx-maquininha"></span></p>
            <p>Valor a pagar: R$ <span class="vr-pagar"></span></p>
        </div>

        <div class="metodo-pagamento">
            <h3>Forma Pagamento</h3>
            <select name="formaPgto" id="formaPgto">
                <option value="">--- selecione</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao">Cartao</option>
                <option value="pix">Pix</option>
            </select>
        </div>
        <div class="troco d-none">
            <h3>Deseja Troco?</h3>
            <select name="troco" id="troco">
                <option value="">--selecione</option>
                <option value="sim">Sim, desejo troco</option>
                <option value="nao">Não é preciso troco </option>
            </select>
        </div>
        <div class="valor-troco d-none">
            <textarea name="valor-troco" id="valor-troco" placeholder="Digite o valor do troco ex: troco para 100,00 "></textarea>
        </div>
        <div class="entrega">
            <h3>Entrega</h3>
            <select name="entrega" id="entrega">
                <option value="">--- selecione</option>
                <option value="retirar">Retirar no Local</option>
                <option value="entregar">Entregar no Endereço</option>
            </select>
            <div class="detalhe-endereco d-none">
                <textarea name="endereco" id="endereco" placeholder="Digite aqi seu endereco completo, bairro, endereco, numero, local"></textarea>
            </div>
        </div>
        <button type="button" id="enviar-pedido">Enviar Pedido</button>
    </div>

    <div class="sacola-compras d-none"><a href="#"><img src="app/assets/sacola.png" alt="sacola de compras" title="Sacola de Compras"></a></div>
</body>
<script src="app/js/constantes.js"></script>
<script src="app/js/acoes.js"></script>
<script>
    let verificado = false;
    document.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.classList.contains("minus") || event.target.classList.contains("plus")) {
            let container = event.target.closest(".informacoes-pedido");
            let input = container.querySelector(".quantidade");
            let campoValor = container.querySelector(".campo-valor");
            let campoQtd = campoValor.querySelector(".qtd");
            let valorUnitario = campoValor.querySelector(".vr");
            let valorUnitarioAttr = campoValor.querySelector(".vr").getAttribute("valor");
            let quantidade = parseInt(input.value);

            if (event.target.classList.contains("minus")) {
                quantidade = Math.max(1, quantidade - 1);
            } else {
                quantidade += 1;
            }
            input.value = quantidade;
            campoQtd.textContent = quantidade;
            valorUnitario.textContent = (valorUnitarioAttr * quantidade).toFixed(2).replace('.', ',');
            const vr = responsavelPeloValorQuantidade()
            atualizaValorPedido(vr[0], vr[1])
        }
    });
</script>

</html>