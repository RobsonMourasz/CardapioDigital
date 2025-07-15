<?php 
include_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json; charset=utf-8');
if(!isset($_SESSION)){session_start();}

    if ( $_SERVER['REQUEST_METHOD'] === 'POST') {
        $login = strtolower($_POST['usuario']);
        $pass = $_POST['password'];
        $user = src\class\Conexao::getPesquisaBD('SELECT * FROM usuario WHERE (NomeUsuario IN(?) OR Email in(?)) AND UserAtivo = "S" ','ss',[$login, $login]);

        if (!empty($user)){
            $contagem = 0;
            foreach ($user as $qtd) {
                if (is_array($qtd)) {
                    $contagem++;
                }
            }
            if ($contagem > 1){
                foreach ($user  as $usuario) {
                    if ($usuario['Senha'] === $pass){
                        http_response_code(200);
                        $_SESSION['CnpjEmpresaResponsavel'] = $usuario['CnpjEmpresaResponsavel'];
                        $_SESSION['IdUsuario'] = $usuario['IdUsuario'];
                        $_SESSION['Usuario'] = $usuario['NomeUsuario'];
                        die(json_encode(['status' => 'success', 'result' => 'Aceitado']));
                    }
                }
            }
            if ($user[0]['Senha'] == $pass){
                $_SESSION['CnpjEmpresaResponsavel'] = $user[0]['CnpjEmpresaResponsavel'];
                $_SESSION['IdUsuario'] = $user[0]['IdUsuario'];
                $_SESSION['Usuario'] = $user[0]['NomeUsuario'];
                $_SESSION['IdPerfil'] = $user[0]['IdPerfil'];
                http_response_code(200);
                die(json_encode(['status' => 'success', 'result' => 'Aceitado']));
            }else{
                http_response_code(401);
                die(json_encode(['status' => 'error', 'result' => 'Senha incorreta']));
            }

        }else{
            http_response_code(401);
            die(json_encode(['status' => 'error', 'result' => 'Usuario não localizado']));   
        }
    }else{
        http_response_code(401);
        die(json_encode(['status' => 'error', 'result' => 'Method não aceitado']));
    }