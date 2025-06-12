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
    <div class="container">
        <div class="nav">
            <div class="logo-tipo">
                <img src="app/assets/logo.png" alt="Logo" style="width: 100px; height: auto;">
            </div>
            <div class="dados-empresa">
                <div class="title">
                    Empresa Demonstracao
                </div>
                <div class="status">
                    <span class="online">Aberto</span>
                </div>
            </div>
        </div> <!-- Navigation bar with logo and company details -->
        <div class="menu-opcoes">
            <ul class="lista" id="lista-categorias">
                <li class="item"><a href="">Bebidas</a></li>
                <li class="item"><a href="">Espetos</a></li>
                <li class="item"><a href="">Lanches</a></li>
                <li class="item"><a href="">Porcoes</a></li>
                <li class="item"><a href="">Outros</a></li>
                <li class="item"><a href="">Outros</a></li>

            </ul>
        </div>
    </div> <!-- Container for the digital menu content -->

    <div class="banner-promocoes">

    </div> <!-- Banner for promotions, can be filled with images or text -->

    <div class="cardapio" id="cardapio">

    </div> <!-- Cardapio section with products listed in cards -->

    <div class="pedido d-none" id="pedido">
        <div class="close-modal">&times;</div>
        <h2>Seus Pedidos</h2>
        <form id="pedidoForm">
        </form> <!-- Form for submitting the order -->

        
        <div class="metodo-pagamento">
            <h3>Forma Pagamento</h3>
            <select name="formaPgto" id="formaPgto">
                <option value="">--- selecione</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao">Cartao</option>
                <option value="pix">Pix</option>
            </select>
        </div>
        <div class="entrega">
            <h3>Entrega</h3>
            <select name="entrega" id="entrega">
                <option value="">--- selecione</option>
                <option value="retirar">Retirar no Local</option>
                <option value="entregar">Entregar no Endereço</option>
            </select>
            <div class="detalhe-endereco">
                <textarea name="endereco" id="endereco" placeholder="Digite aqi seu endereco completo, bairro, endereco, numero, local"></textarea>
            </div>
        </div>
        <div id="mensagem"></div>

        <button type="submit">Enviar Pedido</button>
    </div>

    <div class="sacola-compras d-none"><a href="#"><img src="app/assets/sacola.png" alt="sacola de compras" title="Sacola de Compras"></a></div>
</body>
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
        console.log(campoQtd);
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
    }
});



</script>
</html>
.