<?php
if (!isset($_SESSION)) {
    session_start();
}

if (isset($_GET['url'])) {

    if (file_exists('page/' . $_GET['url'] . '.php')) {
        $_SESSION['aviso'] = '';
    } else {
        $_SESSION['aviso'] = 'Página não encontrada';
    }
} else {
    $_SESSION['aviso'] = '';
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../app/css/stylePedido.css">
    <title>Bem vindo</title>
</head>

<body>
    <audio id="meuAudio" src="../../app/assets/blip-131856.mp3"></audio>
    <div class="politica-dados d-none">
        <p>Atenção devido as politicas apresentadas pela Microsoft para que todos os componentes funcionem é preciso que clique em aceitar </p>
        <button class="btn bg-success aceitar-termos">Aceitar</button>
    </div>
    <?php
    if (isset($_SESSION['aviso']) && $_SESSION['aviso'] == '') {
        echo '<div class="carregando"></div>';
    } else {
        echo '<div class="carregando d-none"></div>';
    }
    ?>
    <div class="avisos d-none .fade-out" id="avisos"></div>
    <div class="conteudo">
        <header>

            <div class="toggle-menu">
                <i class="bi bi-list"></i>
            </div>

            <div class="logo-tipo">
                <img src="../../app/assets/logo.png" alt="">

            </div>

            <div class="informacoes-sistema">
                Bem vindo ao sistema
            </div>

            <div class="inf">
                <div class="inf-img">

                    <img src="../../app/assets/bell-fill.svg" alt=""> <span id="qtd-pedido-aberto"></span>

                </div>
            </div>

        </header>

        <main>
            <nav>
                <div class="menu-itens">
                    <ul class="lista-itens">
                        <li class="item"><a href="pedidos">Pedidos</a></li>
                        <li class="item"><a href="vendas">Vendas</a></li>
                        <li class="item"><a href="produtos">Produtos</a></li>
                        <li class="item"><a href="categoria">Categorias</a></li>
                    </ul>
                </div>
            </nav>

            <section>
                <?php

                if (isset($_GET['url'])) {
                    if ($_GET['url'] == 'logoff') {
                        die(header("Location: ../src/logoff.php"));
                    }
                    if (file_exists('page/' . $_GET['url'] . '.php')) {
                        include 'page/' . $_GET['url'] . '.php';
                    } else {
                        include 'page/404.php';
                    }
                } else {
                    include 'page/pedidos.php';
                }

                ?>
            </section>
        </main>

        <footer>

        </footer>
    </div>

    <script src="../../app/js/pedido.index.js"></script>
    <script>
        function limparParametrosURL() {
            window.history.replaceState({}, "", window.location.pathname);
        }
        document.addEventListener("DOMContentLoaded", limparParametrosURL);
    </script>
</body>

</html>