<?php 
class PathConfig
{
    public static string $root;

    public static function init(): void
    {
        self::$root = dirname(__DIR__, 1); // Ajuste conforme a estrutura do seu projeto
    }
}
