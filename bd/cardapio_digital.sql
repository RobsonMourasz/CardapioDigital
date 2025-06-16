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

-- Copiando estrutura para tabela cardapio_digital.cadpedido
CREATE TABLE IF NOT EXISTS `cadpedido` (
  `idPedido` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ValorPedido` double(14,2) DEFAULT 0.00,
  `ValorEntrega` double(14,2) DEFAULT 0.00,
  `ValorAdicional` double(14,2) DEFAULT 0.00,
  `FormaPagamento` int(2) DEFAULT NULL,
  `Controle` varchar(255) NOT NULL,
  `IpCliente` varchar(255) DEFAULT NULL,
  `EnderecoEntrega` varchar(255) DEFAULT NULL,
  `ObservacaoPedido` varchar(255) DEFAULT NULL,
  `DataPedido` datetime DEFAULT NULL,
  PRIMARY KEY (`idPedido`),
  UNIQUE KEY `idPedido` (`idPedido`),
  KEY `idPedido2` (`idPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela cardapio_digital.cadpedido: ~2 rows (aproximadamente)
REPLACE INTO `cadpedido` (`idPedido`, `ValorPedido`, `ValorEntrega`, `ValorAdicional`, `FormaPagamento`, `Controle`, `IpCliente`, `EnderecoEntrega`, `ObservacaoPedido`, `DataPedido`) VALUES
	(1, 10.00, 10.00, 0.00, NULL, '1', NULL, NULL, NULL, NULL),
	(2, 10.00, 10.00, 0.00, NULL, '1', NULL, NULL, NULL, NULL);

-- Copiando estrutura para tabela cardapio_digital.cadprodutos
CREATE TABLE IF NOT EXISTS `cadprodutos` (
  `IdProduto` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `IdCategoria` int(10) unsigned NOT NULL DEFAULT 0,
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela cardapio_digital.cadprodutos: ~17 rows (aproximadamente)
REPLACE INTO `cadprodutos` (`IdProduto`, `IdCategoria`, `ProdAtivo`, `DescricaoProduto`, `Imagem`, `VrVenda`, `Estoque`, `Ingredientes`, `DataCadastro`, `DataAlteracao`, `UltimaMovimentacao`) VALUES
	(1, 2, 'S', 'X - TUDO', NULL, 26.00, 0.00, 'Hambúrguer, bacon, ovo, presunto, queijo (mussarela ou cheddar), alface, tomate, maionese, ketchup, mostarda, pão de hambúrguer.', '2025-06-10 15:18:09', '2025-06-10 15:18:11', '2025-06-10 18:18:11'),
	(2, 2, 'S', 'X - MODA', NULL, 25.00, 0.00, 'Pão, hambúrguer artesanal, mussarela, bacon, filé de frango, salsicha, ovo, alface, tomate, milho e batata palha.', '2025-06-10 15:18:24', '2025-06-10 15:18:25', '2025-06-10 18:18:26'),
	(3, 2, 'S', 'X- ESPECIAL', NULL, 24.00, 0.00, 'Pão, hambúrguer artesanal, mussarela, bacon, salsicha, ovo, alface, tomate, milho e batata palha.', '2025-06-10 15:18:38', '2025-06-10 15:18:39', '2025-06-10 18:18:40'),
	(4, 2, 'S', 'X - FRANGO', NULL, 22.00, 0.00, 'Pão, filé de frango, mussarela, bacon, ovo, alface, tomate, milho e batata palha.', '2025-06-10 15:18:52', '2025-06-10 15:18:52', '2025-06-10 18:18:53'),
	(5, 2, 'S', 'X - FILE', NULL, 23.00, 0.00, 'Pão, filé de vaca, mussarela, bacon, ovo, alface, tomate, milho e batata palha.', '2025-06-10 15:19:09', '2025-06-10 15:19:10', '2025-06-10 18:19:10'),
	(6, 2, 'S', 'X - BACON', NULL, 22.00, 0.00, 'Pão, hambúrguer artesanal, bacon, ovo, alface, tomate, milho e batata palha.', '2025-06-10 15:19:24', '2025-06-10 15:19:25', '2025-06-10 18:19:25'),
	(7, 2, 'S', 'X - SALADA', NULL, 21.00, 0.00, 'Pão, hambúrguer artesanal, mussarela, ovo, salsicha, alface, tomate, milho e batata palha.', '2025-06-10 15:19:35', '2025-06-10 15:19:37', '2025-06-10 18:19:38'),
	(8, 2, 'S', 'MISTO', NULL, 17.00, 0.00, 'Pão, hambúrguer artesanal, mussarela, alface, tomate, milho e batata palha.', '2025-06-10 15:19:50', '2025-06-10 15:19:51', '2025-06-10 18:19:52'),
	(9, 2, 'S', 'VEGETARIANO', NULL, 16.00, 0.00, 'Pão, ovo, mussarela, alface, tomate, milho e batata palha.', '2025-06-10 15:20:05', '2025-06-10 15:20:06', '2025-06-10 18:20:06'),
	(10, 1, 'S', 'COCA COLA 2,5 L', NULL, 13.00, 0.00, 'A bebida mais gelada da cidade, perfeita para refrescar seu dia! Venha experimentar e sentir o verdadeiro sabor da refrescância!', '2025-06-10 15:35:41', '2025-06-10 15:35:41', '2025-06-10 18:35:42'),
	(11, 1, 'S', 'COTUBA 2 L', NULL, 12.00, 0.00, 'A bebida mais gelada da cidade, perfeita para refrescar seu dia! Venha experimentar e sentir o verdadeiro sabor da refrescância!', '2025-06-10 15:35:56', '2025-06-10 15:35:56', '2025-06-10 18:35:56'),
	(12, 1, 'S', 'FANTA 2 L', NULL, 12.00, 0.00, 'A bebida mais gelada da cidade, perfeita para refrescar seu dia! Venha experimentar e sentir o verdadeiro sabor da refrescância!', '2025-06-10 15:36:10', '2025-06-10 15:36:11', '2025-06-10 18:36:11'),
	(13, 1, 'S', 'COCA COLA 2 L', NULL, 12.00, 0.00, 'A bebida mais gelada da cidade, perfeita para refrescar seu dia! Venha experimentar e sentir o verdadeiro sabor da refrescância!', '2025-06-10 15:36:26', '2025-06-10 15:36:26', '2025-06-10 18:36:27'),
	(14, 1, 'S', 'FANTA 1 L', NULL, 10.00, 0.00, 'A bebida mais gelada da cidade, perfeita para refrescar seu dia! Venha experimentar e sentir o verdadeiro sabor da refrescância!', '2025-06-10 15:36:44', '2025-06-10 15:36:45', '2025-06-10 18:36:46'),
	(15, 1, 'S', 'COCA COLA 1 L', NULL, 10.00, 0.00, 'A bebida mais gelada da cidade, perfeita para refrescar seu dia! Venha experimentar e sentir o verdadeiro sabor da refrescância!', '2025-06-10 15:37:00', '2025-06-10 15:37:01', '2025-06-10 18:37:01'),
	(16, 1, 'S', 'SUCO LARANJA1 L', NULL, 24.00, 0.00, 'A bebida mais gelada da cidade, perfeita para refrescar seu dia! Venha experimentar e sentir o verdadeiro sabor da refrescância!', '2025-06-10 15:37:36', '2025-06-10 15:37:36', '2025-06-10 18:37:37'),
	(17, 1, 'S', 'SUCO LARANJA 500 ML', NULL, 12.00, 0.00, 'A bebida mais gelada da cidade, perfeita para refrescar seu dia! Venha experimentar e sentir o verdadeiro sabor da refrescância!', '2025-06-10 15:38:00', '2025-06-10 15:38:00', '2025-06-10 18:38:01');

-- Copiando estrutura para tabela cardapio_digital.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `IdCategoria` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `DescricaoCategoria` varchar(50) NOT NULL,
  `Imagem` varchar(255) DEFAULT NULL,
  `CadAtivo` varchar(1) NOT NULL DEFAULT 'S',
  PRIMARY KEY (`IdCategoria`),
  UNIQUE KEY `IdCategoria` (`IdCategoria`),
  KEY `IdCategoria2` (`IdCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela cardapio_digital.categoria: ~6 rows (aproximadamente)
REPLACE INTO `categoria` (`IdCategoria`, `DescricaoCategoria`, `Imagem`, `CadAtivo`) VALUES
	(1, 'BEBIDA', 'app\\assets\\Categoria\\Bebidas.png', 'S'),
	(2, 'LANCHES', 'app\\assets\\Categoria\\Lanche.png', 'S'),
	(3, 'PORCOES', 'app\\assets\\Categoria\\Porcoes.png', 'S'),
	(4, 'ESPETOS', 'app\\assets\\Categoria\\Espetos.png', 'S'),
	(5, 'OUTRAS CATEGORIAS', NULL, 'N'),
	(6, 'TESTE', NULL, 'N'),
	(7, 'TESTE02', NULL, 'N');

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

-- Copiando dados para a tabela cardapio_digital.empresa: ~0 rows (aproximadamente)
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

-- Copiando dados para a tabela cardapio_digital.usuario: ~0 rows (aproximadamente)
REPLACE INTO `usuario` (`IdUsuario`, `NomeUsuario`, `Email`, `Senha`) VALUES
	(1, 'Robson Moura', 'robsoni10@gmail.com', '1234');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
