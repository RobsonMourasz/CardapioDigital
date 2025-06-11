<?php

namespace src\class;

include_once __DIR__.'/database.php';

use mysqli;

class Conexao
{
    private $host;
    private $user;
    private $pass;
    private $db;
    private $port;
    private $conexao;

    public function __construct()
    {
        // Configurações do banco de dados LOCAL
         $this->host = DB_HOST_LOCAL;
         $this->user = DB_USER_LOCAL;
         $this->pass = DB_PASS_LOCAL;
         $this->db = DB_NAME_LOCAL;
         $this->port = DB_PORT_LOCAL;
        $this->conexao = new mysqli($this->host, $this->user, $this->pass, $this->db, $this->port);
        if ($this->conexao->connect_error) {
            die("Erro de conexão: " . $this->conexao->connect_error);
        }
    }


    public static function getPesquisaBD(?string $sql, string $types, array $params)
    {
        $conexao = new Conexao();
        $stmt = $conexao->conexao->prepare($sql);

        if ($stmt === false) {
            die("Erro na preparação da consulta: " . $conexao->conexao->error);
        }

        // Verifica se há parâmetros para vincular
        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }

        if ($stmt->execute()) {
            $result = $stmt->get_result();
            return $result ? $result->fetch_all(MYSQLI_ASSOC) : [];
        } else {
            return false;
        }
    }

    public static function insertBD(?string $sql, string $types, array $params)
    {
        $conexao = new Conexao();
        $stmt = $conexao->conexao->prepare($sql);

        if ($stmt === false) {
            die("Erro na preparação da consulta: " . $conexao->conexao->error);
        }

        // Verifica se há parâmetros para vincular
        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public static function deleteBD(?string $tabela, string $coluna, int $id)
    {
        $conexao = new Conexao();
        $sql = "DELETE FROM $tabela WHERE $coluna = ?";
        $stmt = $conexao->conexao->prepare($sql);
        $stmt->bind_param('i', $id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

    }
}
