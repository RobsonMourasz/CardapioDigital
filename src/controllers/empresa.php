<?php 
namespace App\controllers;
include_once __DIR__.'/../../vendor/autoload.php';

class Empresa{

    public static function RetornarDados() {
        return \App\class\Conexao::getPesquisaBD('SELECT * FROM empresa WHERE EmpAtiva = "S" ','',[]);
    }

}