-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           11.6.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para cardapio_digital
CREATE DATABASE IF NOT EXISTS `cardapio_digital` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci */;
USE `cardapio_digital`;

-- Copiando estrutura para tabela cardapio_digital.cadpagamento
CREATE TABLE IF NOT EXISTS `cadpagamento` (
  `IdPagamento` int(10) NOT NULL AUTO_INCREMENT,
  `PrazoPagamento` int(11) NOT NULL DEFAULT 1,
  `DescricaoPagamento` varchar(50) NOT NULL,
  `PagAtivo` varchar(1) NOT NULL DEFAULT 'S',
  PRIMARY KEY (`IdPagamento`),
  UNIQUE KEY `IdPagamento` (`IdPagamento`),
  KEY `IdPagamento2` (`IdPagamento`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela cardapio_digital.cadpagamento: ~4 rows (aproximadamente)
REPLACE INTO `cadpagamento` (`IdPagamento`, `PrazoPagamento`, `DescricaoPagamento`, `PagAtivo`) VALUES
	(1, 0, 'Dinheiro', 'S'),
	(2, 1, 'Cartao Debito', 'S'),
	(3, 30, 'Cartao Credito', 'S'),
	(4, 0, 'Pix', 'S');

-- Copiando estrutura para tabela cardapio_digital.cadprodutos
CREATE TABLE IF NOT EXISTS `cadprodutos` (
  `IdProduto` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ProdAtivo` char(1) NOT NULL DEFAULT 'S',
  `DescricaoProduto` varchar(100) NOT NULL,
  `Imagem` varchar(255) DEFAULT NULL,
  `VrVenda` double(14,2) NOT NULL DEFAULT 0.00,
  `Estoque` double(14,2) NOT NULL DEFAULT 0.00,
  `Ingredientes` longtext DEFAULT NULL,
  `DataCadastro` datetime NOT NULL,
  `DataAlteracao` datetime NOT NULL,
  `UltimaMovimentacao` timestamp NOT NULL,
  PRIMARY KEY (`IdProduto`),
  UNIQUE KEY `IdProduto` (`IdProduto`),
  KEY `IdProduto2` (`IdProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela cardapio_digital.cadprodutos: ~2 rows (aproximadamente)
REPLACE INTO `cadprodutos` (`IdProduto`, `ProdAtivo`, `DescricaoProduto`, `Imagem`, `VrVenda`, `Estoque`, `Ingredientes`, `DataCadastro`, `DataAlteracao`, `UltimaMovimentacao`) VALUES
	(1, 'S', 'COCA COLA', NULL, 12.00, 10.00, NULL, '2025-06-09 17:25:38', '2025-06-09 17:25:40', '2025-06-09 20:25:42'),
	(2, 'S', 'X-TUDO', NULL, 30.00, 0.00, NULL, '2025-06-09 17:26:02', '2025-06-09 17:26:03', '2025-06-09 20:26:04');

-- Copiando estrutura para tabela cardapio_digital.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `IdCategoria` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `DescricaoCategoria` varchar(50) NOT NULL,
  `Imagem` varchar(255) DEFAULT NULL,
  `CadAtivo` varchar(1) NOT NULL DEFAULT 'S',
  PRIMARY KEY (`IdCategoria`),
  UNIQUE KEY `IdCategoria` (`IdCategoria`),
  KEY `IdCategoria2` (`IdCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela cardapio_digital.categoria: ~4 rows (aproximadamente)
REPLACE INTO `categoria` (`IdCategoria`, `DescricaoCategoria`, `Imagem`, `CadAtivo`) VALUES
	(1, 'BEBIDA', 'C:\\wamp64\\www\\PROJETOS\\CardapioDigital\\app\\assets\\Categoria\\Bebidas.png', 'S'),
	(2, 'LANCHES', 'C:\\wamp64\\www\\PROJETOS\\CardapioDigital\\app\\assets\\Categoria\\Espetos.png', 'S'),
	(3, 'PORCOES', 'C:\\wamp64\\www\\PROJETOS\\CardapioDigital\\app\\assets\\Categoria\\Lanche.png', 'S'),
	(4, 'ESPETOS', 'C:\\wamp64\\www\\PROJETOS\\CardapioDigital\\app\\assets\\Categoria\\Porcoes.png', 'S');

-- Copiando estrutura para tabela cardapio_digital.empresa
CREATE TABLE IF NOT EXISTS `empresa` (
  `IdEmpresa` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `RazaoSocial` varchar(100) NOT NULL,
  `NomeFantasia` varchar(100) NOT NULL,
  `Telefone` varchar(20) DEFAULT NULL,
  `Endereco` varchar(100) DEFAULT NULL,
  `Cidade` varchar(20) DEFAULT NULL,
  `Uf` varchar(2) DEFAULT NULL,
  `Cnpj` varchar(15) DEFAULT NULL,
  `EmpAtiva` varchar(2) DEFAULT 'S',
  PRIMARY KEY (`IdEmpresa`),
  UNIQUE KEY `IdEmpresa` (`IdEmpresa`),
  KEY `IdEmpresa2` (`IdEmpresa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela cardapio_digital.empresa: ~1 rows (aproximadamente)
REPLACE INTO `empresa` (`IdEmpresa`, `RazaoSocial`, `NomeFantasia`, `Telefone`, `Endereco`, `Cidade`, `Uf`, `Cnpj`, `EmpAtiva`) VALUES
	(1, 'Robson Moura', 'Robson Moura', '34 3453-1490', 'Av. Sergipe 357, São Joao', 'Limeira do oeste', 'MG', '45052914806', 'S');

-- Copiando estrutura para tabela cardapio_digital.situacao
CREATE TABLE IF NOT EXISTS `situacao` (
  `IdSituacao` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `DescriacaoSituacao` varchar(20) NOT NULL,
  `Tela` varchar(10) NOT NULL,
  `SituacaoAtivo` char(1) NOT NULL DEFAULT 'S',
  PRIMARY KEY (`IdSituacao`),
  UNIQUE KEY `IdSituacao` (`IdSituacao`),
  KEY `IdSituacao2` (`IdSituacao`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela cardapio_digital.situacao: ~9 rows (aproximadamente)
REPLACE INTO `situacao` (`IdSituacao`, `DescriacaoSituacao`, `Tela`, `SituacaoAtivo`) VALUES
	(1, 'Pago', 'Venda', 'S'),
	(2, 'Em Entrega', 'Venda', 'S'),
	(3, 'Aguardando', 'Venda', 'S'),
	(4, 'Fazendo Lanche', 'Venda', 'S'),
	(5, 'Cancelado', 'Venda', 'S'),
	(6, 'Entregue', 'Venda', 'S'),
	(7, 'Pagou', 'Venda', 'S'),
	(8, 'Concluido', 'Venda', 'S'),
	(9, 'Outro', 'Venda', 'S');

-- Copiando estrutura para tabela cardapio_digital.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `IdUsuario` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `NomeUsuario` varchar(20) NOT NULL DEFAULT '0',
  `Email` varchar(100) NOT NULL DEFAULT '0',
  `Senha` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdUsuario`),
  UNIQUE KEY `IdUsuario` (`IdUsuario`),
  KEY `IdUsuario2` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela cardapio_digital.usuario: ~1 rows (aproximadamente)
REPLACE INTO `usuario` (`IdUsuario`, `NomeUsuario`, `Email`, `Senha`) VALUES
	(1, 'Robson Moura', 'robsoni10@gmail.com', '1234');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
