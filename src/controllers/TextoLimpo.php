<?php 
namespace App\controllers;

class TextoLimpo {

    public static function limpar($texto) {
        // Substitui os acentos por letras simples
        $semAcentos = iconv('UTF-8', 'ASCII//TRANSLIT', $texto);

        // Remove caracteres especiais, mantendo apenas letras e números
        $limpo = preg_replace('/[^a-zA-Z0-9 .,]/', '', $semAcentos);

        return $limpo;
    }
    
}
