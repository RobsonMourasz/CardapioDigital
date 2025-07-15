<?php 
namespace src\controllers;

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
