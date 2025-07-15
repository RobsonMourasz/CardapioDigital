<?php 
namespace src\controllers;
include_once __DIR__.'/../../vendor/autoload.php';
class Seguranca {

    public static function verificacao (){
        if (!isset($_SESSION)) {
            session_start();
        }

        if (!isset($_SESSION['CnpjEmpresaResponsavel']) || empty($_SESSION['CnpjEmpresaResponsavel'])) {
            session_destroy();
            header('Location: ../../');
            exit(); // Importante para parar a execução depois do redirecionamento
        }
    }

}

class Permissao {

    private static function InformaIdPermissao(?string $Tela, string $Componente) {

        return \src\class\Conexao::getPesquisaBD('SELECT IdPermissao FROM permissoes WHERE Tela LIKE ? AND Componente LIKE ? ','ss',['%'.$Tela.'%', '%'.$Componente.'%']);
        
    }

    private static function InformaIdPerfil (?int $IdUsuario){
        return \src\class\Conexao::getPesquisaBD('SELECT IdPerfil FROM usuario WHERE IdUsuario IN(?) ','i',[$IdUsuario]);
    }

    public static function VerificarPermissao(?int $IdUsuario, string $Tela,string $Componente){
        $Permissao = self::InformaIdPermissao($Tela, $Componente);
        $Perfil = self::InformaIdPerfil($IdUsuario);
        return \src\class\Conexao::getPesquisaBD('SELECT Liberado FROM permissaoperfil WHERE IdPerfil IN(?) AND IdPermissao IN(?)','ii',[$Perfil[0]['IdPerfil'], $Permissao[0]['IdPermissao']]);
    }

}
