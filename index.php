<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="app/css/style.css">
    <title>Cardápio Digital</title>
</head>

<body>
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
            <ul class="lista">
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


    <div class="title-cardapio">
        <h1>Bebidas</h1>
    </div>
    <div class="cardapio">
        <div class="card">
            <div class="sessao1">
                <img src="app/assets/Categoria/Bebidas.png" alt="bebidas">
            </div>
            <div class="sessao2">
                <h2>Coca Cola 2litros</h2>
                <p>Coca cola gelada, a melhor da região</p>
                <small>R$ 12,00</small>
            </div>
        </div>

        <div class="card">
            <div class="sessao1">
                <img src="app/assets/Categoria/Bebidas.png" alt="bebidas">
            </div>
            <div class="sessao2">
                <h2>Coca Cola 2litros</h2>
                <p>Coca cola gelada, a melhor da região</p>
                <small>R$ 12,00</small>
            </div>
        </div>

        <div class="card">
            <div class="sessao1">
                <img src="app/assets/Categoria/Bebidas.png" alt="bebidas">
            </div>
            <div class="sessao2">
                <h2>Coca Cola 2litros</h2>
                <p>Coca cola gelada, a melhor da região</p>
                <small>R$ 12,00</small>
            </div>
        </div>

        <div class="card">
            <div class="sessao1">
                <img src="app/assets/Categoria/Bebidas.png" alt="bebidas">
            </div>
            <div class="sessao2">
                <h2>Coca Cola 2litros</h2>
                <p>Coca cola gelada, a melhor da região</p>
                <small>R$ 12,00</small>
            </div>
        </div>
        <div class="card">
            <div class="sessao1">
                <img src="app/assets/Categoria/Bebidas.png" alt="bebidas">
            </div>
            <div class="sessao2">
                <h2>Coca Cola 2litros</h2>
                <p>Coca cola gelada, a melhor da região</p>
                <small>R$ 12,00</small>
            </div>
        </div>

    </div>

    <div class="title-cardapio">
        <h1>Espetos</h1>
    </div>
    <div class="cardapio">
        <div class="card">
            <div class="sessao1">
                <img src="app/assets/Categoria/Espetos.png" alt="bebidas">
            </div>
            <div class="sessao2">
                <h2>Espeto de Carne</h2>
                <p>Carne de vaca</p>
                <small>R$ 10,00</small>
            </div>
        </div>

        <div class="card">
            <div class="sessao1">
                <img src="app/assets/Categoria/Espetos.png" alt="bebidas">
            </div>
            <div class="sessao2">
                <h2>Espeto de coração</h2>
                <p>Coração de frango</p>
                <small>R$ 10,00</small>
            </div>
        </div>

        <div class="card">
            <div class="sessao1">
                <img src="app/assets/Categoria/Espetos.png" alt="bebidas">
            </div>
            <div class="sessao2">
                <h2>Espetode Porco</h2>
                <p>Espeto feito da carne do porco</p>
                <small>R$ 12,00</small>
            </div>
        </div>

        <div class="card">
            <div class="sessao1">
                <img src="app/assets/Categoria/Espetos.png" alt="bebidas">
            </div>
            <div class="sessao2">
                <h2>Espeto Franbacon</h2>
                <p>Feito com carne de frango mais bacon de porco</p>
                <small>R$ 12,00</small>
            </div>
        </div>

    </div>

    <div class="pedido" id="pedido">
        <div class="close-modal">&times;</div>
        <h2>Seus Pedidos</h2>
        <form id="pedidoForm">
            <div class="item-pedido">
                <input type="number" id_produto="id_produto" name="id_produto" hidden>
                <div class="icone">
                    <img src="app/assets/Categoria/Lanche.png" alt="icone pedido" title="icone do item pedido">
                </div>
                <div class="descricao">
                    <p class="Produto">X -TUDO </p>
                </div>
                <div class="informacoes-pedido">
                    <label for="quantidade">Quantidade:</label>
                    <input type="number" id="quantidade" name="quantidade" min="1" value="1">
                    <p class="campo-valor">1 x R$ 32,00</p>
                    <label for="observacao">Observação:</label>
                    <textarea id="observacao" name="observacao" rows="4"></textarea>
                </div>
            </div>

            <div class="item-pedido">
                <input type="number" id_produto="id_produto" name="id_produto" hidden>
                <div class="icone">
                    <img src="app/assets/Categoria/Bebidas.png" alt="icone pedido" title="icone do item pedido">
                </div>
                <div class="descricao">
                    <p class="Produto">Coca Cola 2 Litross </p>
                </div>
                <div class="informacoes-pedido">
                    <label for="quantidade">Quantidade:</label>
                    <input type="number" id="quantidade" name="quantidade" min="1" value="1">
                    <p class="campo-valor">1 x R$ 12,00</p>
                    <label for="observacao">Observação:</label>
                    <textarea id="observacao" name="observacao" rows="4"></textarea>
                </div>
            </div>


            <button type="submit">Enviar Pedido</button>
        </form>
        <div id="mensagem"></div>
    </div>

    <div class="sacola-compras d-none"><a href="#"><img src="app/assets/sacola.png" alt="sacola de compras" title="Sacola de Compras"></a></div>
</body>
<script src="app/js/acoes.js"></script>
</html>