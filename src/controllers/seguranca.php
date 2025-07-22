<?php 
namespace App\controllers;
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


    private static function InformaIdPerfil (?int $IdUsuario){
        return \App\local\Conexao::getPesquisaBD('SELECT IdPerfil FROM usuario WHERE IdUsuario IN(?) ','i',[$IdUsuario]);
    }

    public static function VerificarPermissao(?int $IdUsuario ){
        $Perfil = self::InformaIdPerfil($IdUsuario);
        return \App\local\Conexao::getPesquisaBD('SELECT a.IdPerfil, b.Tela, b.Componente, a.Liberado FROM permissaoperfil a LEFT JOIN permissoes b ON a.IdPermissao = b.IdPermissao WHERE a.IdPerfil IN(?)','i',[$Perfil[0]['IdPerfil']]) ;
    }

}
