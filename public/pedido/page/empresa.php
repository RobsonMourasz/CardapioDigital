<?php
include_once __DIR__ . '/../../../vendor/autoload.php';
App\controllers\Seguranca::verificacao();
$_SESSION['dadosEmpresa'] = App\controllers\Empresa::RetornarDados();
?>
<div class="content">
    <div class="content-header">
        <h1>Empresa</h1>
    </div> <!-- content-header -->
    <div class="content-body">

        <div class="table">
            <table class="responsive">
                <thead>
                    <tr>
                        <th class="ocultar-responsivo">Imagem</th>
                        <th>Razao Social</th>
                        <th>Nome Fantasia</th>
                        <th>Cpf ou Cnpj</th>
                        <th>Acoes</th>
                    </tr>
                </thead>
                <tbody id="tbody-empresa">
                    <?php 
                        foreach ($_SESSION['dadosEmpresa'] as $empresa) {
                            ?>
                                <td class="ocultar-responsivo" ><img width="62" src="../../<?php echo $empresa['LogoTipo'] ?>" alt="<?php echo $empresa['NomeFantasia'] ?>"></td>
                                <td><?php echo $empresa['RazaoSocial'] ?></td>
                                <td><?php echo $empresa['NomeFantasia'] ?></td>
                                <td><?php echo $empresa['Cnpj'] ?></td>
                                <td><button class="btn btn-primary btn-sm" id-modal="modal-editar" attr="modal" id="btn-editar-dados" show="abrir">Editar</button></td>
                            <?php
                        }
                    ?>
                </tbody>
            </table>
        </div>
    </div> <!-- content-body -->

</div> <!-- content-->

<!-- Modal para EDITAR de novo produto -->

<div class="background-modal d-none">
    <div class="modal" id="modal-editar" attr="modal">
        <div class="modal-header">
            <h2>Ediçao dados Empresa</h2>
            <span attr="modal" id-modal="modal-editar" show="fechar" aria-hidden="true">&#x2715;</span>
        </div>
        <div class="modal-body">

            <div class="tabela-responsiva">
                <!-- Repetir isso para cada pedido -->
                <div class="pedido">
                    <div class="cabecalho">
                        <span class="comanda">Ediçao dados Empresa</span>
                    </div>
                    <div class="produtos">
                        <input type="number" hidden name="IdEmpresa" value="<?php echo $_SESSION['dadosEmpresa'][0]['IdEmpresa']?>">
                        <div class="group-input">
                            <label for="">RazaoSocial
                                <input name="RazaoSocial" type="text" value="<?php echo $_SESSION['dadosEmpresa'][0]['RazaoSocial']?>">
                            </label>
                        </div>

                        <div class="group-input">
                            <label for="">NomeFantasia
                                <input name="NomeFantasia" type="text" value="<?php echo $_SESSION['dadosEmpresa'][0]['NomeFantasia']?>">
                            </label>
                        </div>

                        <div class="group-input">
                            <label for="">Telefone
                                <input name="Telefone" type="text" value="<?php echo $_SESSION['dadosEmpresa'][0]['Telefone']?>">
                            </label>
                        </div>

                        <div class="group-input">
                            <label for="">Endereco
                                <input name="Endereco" type="text" value="<?php echo $_SESSION['dadosEmpresa'][0]['Endereco']?>">
                            </label>
                        </div>

                        <div class="group-input">
                            <label for="">Cidade
                                <input name="Cidade" type="text" value="<?php echo $_SESSION['dadosEmpresa'][0]['Cidade']?>">
                            </label>
                        </div>

                        <div class="group-input">
                            <label for="">Uf
                                <input name="Uf" type="text" value="<?php echo $_SESSION['dadosEmpresa'][0]['Uf']?>">
                            </label>
                        </div>

                        <div class="group-input">
                            <label for="">Cnpj
                                <input name="Cnpj" type="text" value="<?php echo $_SESSION['dadosEmpresa'][0]['Cnpj']?>">
                            </label>
                        </div>

                        <div class="group-input">
                            <div class="upload-area">
                                <input type="file" class="file-input" name="Imagem" accept="image/*" hidden>
                                <div class="upload-message">
                                    Arraste e solte uma imagem aqui<br>ou clique para selecionar
                                </div>
                                <img class="preview" src="" alt="Pré-visualização" style="display: none;">
                            </div>
                            <button class="remove-image-button btn" style="display:none;">Remover imagem</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer">
            <button class="btn btn-responsivo bg-success" onclick="enviarAlteracaoDados()" >Alterar</button>
            <button class="btn btn-responsivo bg-danger" id-modal="modal-editar" attr="modal" show="fechar">Cancelar</button>
        </div>
    </div>
</div>

<!-- FIM Modal para EDITAR de novo produto -->

<script src="../../app/js/acoes.empresa.js"></script>