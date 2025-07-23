<?php 
class PathConfig
{
    public static string $root;

    public static function init(): void
    {   
        $local = dirname(__DIR__, 1);
        self::$root = $local.'/CARDAPIODIGITAL/'; // Ajuste conforme a estrutura do seu projeto
    }
}
