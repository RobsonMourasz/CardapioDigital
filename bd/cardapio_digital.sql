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
  `idSituacao` int(10) NOT NULL DEFAULT 0,
  `ValorPedido` double(14,2) DEFAULT 0.00,
  `ValorEntrega` double(14,2) DEFAULT 0.00,
  `ValorAdicional` double(14,2) DEFAULT 0.00,
  `FormaPagamento` varchar(50) DEFAULT NULL,
  `Controle` varchar(255) NOT NULL,
  `IpCliente` varchar(255) DEFAULT NULL,
  `EnderecoEntrega` varchar(255) DEFAULT NULL,
  `ObservacaoPedido` varchar(255) DEFAULT NULL,
  `DataPedido` datetime DEFAULT NULL,
  PRIMARY KEY (`idPedido`),
  UNIQUE KEY `idPedido` (`idPedido`),
  KEY `idPedido2` (`idPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela cardapio_digital.cadpedido: ~50 rows (aproximadamente)
REPLACE INTO `cadpedido` (`idPedido`, `idSituacao`, `ValorPedido`, `ValorEntrega`, `ValorAdicional`, `FormaPagamento`, `Controle`, `IpCliente`, `EnderecoEntrega`, `ObservacaoPedido`, `DataPedido`) VALUES
	(1, 8, 65.00, 0.00, 0.00, 'pix', '6852b2d9b898c', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-18 12:06:41'),
	(2, 8, 78.00, 2.00, 2.00, 'cartao', '6855a076bedd0', '::1', 'Rua José do ó, 332 Jd Bela vista ', 'Não é preciso de troco', '2025-06-20 05:06:02'),
	(3, 8, 67.00, 2.00, 2.00, 'cartao', '6855a11661b3c', '::1', 'Av sergipe 357 centro', 'Não é preciso de troco', '2025-06-20 05:06:42'),
	(4, 8, 68.00, 2.00, 2.00, 'cartao', '6855a182b13cb', '::1', 'Av sergipe 357 centro', 'Não é preciso de troco', '2025-06-20 05:06:30'),
	(5, 8, 26.00, 0.00, 0.00, 'pix', '6855a75baf558', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 06:06:27'),
	(6, 8, 65.00, 0.00, 0.00, 'pix', '6855a812a0c0f', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 06:06:30'),
	(7, 8, 26.00, 0.00, 0.00, 'pix', '6855ac7f449a1', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 06:06:23'),
	(8, 8, 26.00, 0.00, 0.00, 'pix', '6855acd2c1965', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 06:06:46'),
	(9, 8, 26.00, 0.00, 0.00, 'pix', '6855ad724095d', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 06:06:26'),
	(10, 8, 26.00, 0.00, 0.00, 'pix', '6855ad9e0d1e8', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 06:06:10'),
	(11, 8, 26.00, 0.00, 0.00, 'pix', '6855add21d5ec', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 06:06:02'),
	(12, 8, 26.00, 0.00, 0.00, 'pix', '6855ae524cec7', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 06:06:10'),
	(13, 8, 26.00, 0.00, 0.00, 'pix', '6855ae7d4b043', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 06:06:53'),
	(14, 8, 26.00, 0.00, 0.00, 'pix', '6855aec085d42', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 06:06:00'),
	(15, 8, 26.00, 0.00, 0.00, 'pix', '6855aedbd8a55', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 06:06:27'),
	(16, 8, 26.00, 0.00, 0.00, 'pix', '6855af08dcd2b', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 06:06:12'),
	(17, 3, 26.00, 0.00, 0.00, 'pix', '6855afcc89b7f', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:28'),
	(18, 8, 26.00, 0.00, 0.00, 'pix', '6855b02adbee4', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:02'),
	(19, 3, 26.00, 0.00, 0.00, 'pix', '6855b04dcc52d', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:37'),
	(20, 8, 26.00, 0.00, 0.00, 'pix', '6855b0a14be35', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:01'),
	(21, 3, 26.00, 0.00, 0.00, 'pix', '6855b0d3adc10', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:51'),
	(22, 3, 26.00, 0.00, 0.00, 'pix', '6855b1219bd36', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:09'),
	(23, 3, 26.00, 0.00, 0.00, 'pix', '6855b14790c5f', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:47'),
	(24, 3, 26.00, 0.00, 0.00, 'pix', '6855b15caaa7f', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:08'),
	(25, 8, 26.00, 0.00, 0.00, 'pix', '6855b20a077ef', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:02'),
	(26, 3, 51.00, 0.00, 0.00, 'pix', '6855b242eeeb6', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:58'),
	(27, 3, 26.00, 0.00, 0.00, 'pix', '6855b2a8336a0', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:40'),
	(28, 3, 51.00, 0.00, 0.00, 'pix', '6855b2c428661', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:08'),
	(29, 3, 50.00, 0.00, 0.00, 'pix', '6855b3697df7b', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:53'),
	(30, 3, 38.00, 0.00, 0.00, 'pix', '6855b3c93bf80', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:29'),
	(31, 3, 51.00, 0.00, 0.00, 'pix', '6855b449bb4d3', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:37'),
	(32, 3, 51.00, 0.00, 0.00, 'pix', '6855b540bb8e9', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:44'),
	(33, 3, 26.00, 0.00, 0.00, 'pix', '6855b56de2d65', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:29'),
	(34, 3, 26.00, 0.00, 0.00, 'pix', '6855b5928b3f0', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:06'),
	(35, 3, 26.00, 0.00, 0.00, 'pix', '6855b5d443f74', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 07:06:12'),
	(36, 8, 41.00, 2.00, 0.00, 'pix', '6855b609d5de4', '::1', 'Entregar aqui em casa ', 'Não é preciso de troco', '2025-06-20 07:06:05'),
	(37, 3, 41.00, 2.00, 0.00, 'dinheiro', '6855bf9a07360', '::1', 'Rua sergipe 357 centro', 'troco para 100,00', '2025-06-20 08:06:54'),
	(38, 3, 52.00, 2.00, 0.00, 'dinheiro', '6855c08abe4c0', '::1', 'Av sergipe 357 centro', 'Troco para 100,00', '2025-06-20 08:06:54'),
	(39, 3, 39.00, 0.00, 0.00, 'pix', '6855c14501aca', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 08:06:01'),
	(40, 3, 26.00, 0.00, 0.00, 'pix', '6855c1625f841', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 08:06:30'),
	(41, 3, 26.00, 0.00, 0.00, 'pix', '6855c1921ef11', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 08:06:18'),
	(42, 3, 26.00, 0.00, 0.00, 'pix', '6855c1dcc48da', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 08:06:32'),
	(43, 3, 47.00, 0.00, 0.00, 'pix', '6855c1f740236', '::1', 'retirada no local.', 'Não é preciso de troco', '2025-06-20 08:06:59'),
	(44, 3, 41.00, 2.00, 0.00, 'dinheiro', '6855c2f200c10', '::1', 'Rua sergipe 357 centro', 'Troco para 100,00', '2025-06-20 08:06:10'),
	(45, 3, 28.00, 2.00, 0.00, 'dinheiro', '6855c3a148a6f', '::1', 'tesasdasdasdasdasd', 'troco para 100', '2025-06-20 08:06:05'),
	(46, 3, 68.00, 2.00, 2.00, 'cartao', '6855c57d381f0', '::1', 'Entregar aqui em casa', 'Não é preciso de troco', '2025-06-20 08:06:01'),
	(47, 3, 65.00, 0.00, 0.00, 'dinheiro', '6855c651dda81', '::1', 'retirada no local.', 'Troco para 100,00', '2025-06-20 08:06:33'),
	(48, 3, 43.00, 2.00, 2.00, 'cartao', '6855c781220fe', '::1', 'Avenida Sergipe 357 centro', 'Não é preciso de troco', '2025-06-20 08:06:37'),
	(49, 0, 67.00, 2.00, 0.00, 'pix', '685c0ab8d7b1a', '::1', 'rua sergipe 357 centro', 'Não é preciso de troco', '2025-06-25 02:06:00'),
	(50, 3, 66.00, 2.00, 0.00, 'pix', '685c0baaf2cd4', '::1', 'Avenida sergipe 357 centro', 'Não é preciso de troco', '2025-06-25 02:06:02');

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

-- Copiando estrutura para tabela cardapio_digital.mvpedido
CREATE TABLE IF NOT EXISTS `mvpedido` (
  `NumPedido` varchar(255) DEFAULT NULL,
  `IdProduto` int(10) NOT NULL,
  `Qtd` double NOT NULL DEFAULT 0,
  `ObsProduto` varchar(255) NOT NULL,
  `DataLancemento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- Copiando dados para a tabela cardapio_digital.mvpedido: ~66 rows (aproximadamente)
REPLACE INTO `mvpedido` (`NumPedido`, `IdProduto`, `Qtd`, `ObsProduto`, `DataLancemento`) VALUES
	('6852b2d9b898c', 1, 2, '', '2025-06-18'),
	('6852b2d9b898c', 10, 1, '', '2025-06-18'),
	('6855a076bedd0', 1, 2, 'Sem brócolis ', '2025-06-20'),
	('6855a076bedd0', 16, 1, '', '2025-06-20'),
	('6855a11661b3c', 1, 2, 'Sem brócolis', '2025-06-20'),
	('6855a11661b3c', 10, 1, '', '2025-06-20'),
	('6855a182b13cb', 1, 2, 'Sem alho', '2025-06-20'),
	('6855a182b13cb', 17, 1, '', '2025-06-20'),
	('6855a75baf558', 1, 1, '', '2025-06-20'),
	('6855a812a0c0f', 1, 2, '', '2025-06-20'),
	('6855a812a0c0f', 10, 1, '', '2025-06-20'),
	('6855ac7f449a1', 1, 1, '', '2025-06-20'),
	('6855acd2c1965', 1, 1, '', '2025-06-20'),
	('6855ad724095d', 1, 1, '', '2025-06-20'),
	('6855ad9e0d1e8', 1, 1, '', '2025-06-20'),
	('6855add21d5ec', 1, 1, '', '2025-06-20'),
	('6855ae524cec7', 1, 1, '', '2025-06-20'),
	('6855ae7d4b043', 1, 1, '', '2025-06-20'),
	('6855aec085d42', 1, 1, '', '2025-06-20'),
	('6855aedbd8a55', 1, 1, '', '2025-06-20'),
	('6855af08dcd2b', 1, 1, '', '2025-06-20'),
	('6855afcc89b7f', 1, 1, '', '2025-06-20'),
	('6855b02adbee4', 1, 1, '', '2025-06-20'),
	('6855b04dcc52d', 1, 1, '', '2025-06-20'),
	('6855b0a14be35', 1, 1, '', '2025-06-20'),
	('6855b0d3adc10', 1, 1, '', '2025-06-20'),
	('6855b1219bd36', 1, 1, '', '2025-06-20'),
	('6855b14790c5f', 1, 1, '', '2025-06-20'),
	('6855b15caaa7f', 1, 1, '', '2025-06-20'),
	('6855b20a077ef', 1, 1, '', '2025-06-20'),
	('6855b242eeeb6', 1, 1, '', '2025-06-20'),
	('6855b242eeeb6', 2, 1, '', '2025-06-20'),
	('6855b2a8336a0', 1, 1, '', '2025-06-20'),
	('6855b2c428661', 1, 1, '', '2025-06-20'),
	('6855b2c428661', 2, 1, '', '2025-06-20'),
	('6855b3697df7b', 1, 1, '', '2025-06-20'),
	('6855b3697df7b', 16, 1, '', '2025-06-20'),
	('6855b3c93bf80', 2, 1, '', '2025-06-20'),
	('6855b3c93bf80', 10, 1, '', '2025-06-20'),
	('6855b449bb4d3', 1, 1, '', '2025-06-20'),
	('6855b449bb4d3', 2, 1, '', '2025-06-20'),
	('6855b540bb8e9', 1, 1, '', '2025-06-20'),
	('6855b540bb8e9', 2, 1, '', '2025-06-20'),
	('6855b56de2d65', 1, 1, '', '2025-06-20'),
	('6855b5928b3f0', 1, 1, '', '2025-06-20'),
	('6855b5d443f74', 1, 1, '', '2025-06-20'),
	('6855b609d5de4', 1, 1, '', '2025-06-20'),
	('6855b609d5de4', 10, 1, '', '2025-06-20'),
	('6855bf9a07360', 1, 1, 'Sem cebola ', '2025-06-20'),
	('6855bf9a07360', 10, 1, '', '2025-06-20'),
	('6855c08abe4c0', 1, 1, 'Sem cebola', '2025-06-20'),
	('6855c08abe4c0', 16, 1, '', '2025-06-20'),
	('6855c14501aca', 1, 1, '', '2025-06-20'),
	('6855c14501aca', 10, 1, '', '2025-06-20'),
	('6855c1625f841', 1, 1, '', '2025-06-20'),
	('6855c1921ef11', 1, 1, '', '2025-06-20'),
	('6855c1dcc48da', 1, 1, '', '2025-06-20'),
	('6855c1f740236', 1, 1, '', '2025-06-20'),
	('6855c1f740236', 7, 1, '', '2025-06-20'),
	('6855c2f200c10', 1, 1, 'Sem cebola', '2025-06-20'),
	('6855c2f200c10', 10, 1, '', '2025-06-20'),
	('6855c3a148a6f', 1, 1, '', '2025-06-20'),
	('6855c57d381f0', 1, 2, 'Sem alho', '2025-06-20'),
	('6855c57d381f0', 11, 1, '', '2025-06-20'),
	('6855c651dda81', 1, 2, 'Sem alho', '2025-06-20'),
	('6855c651dda81', 10, 1, '', '2025-06-20'),
	('6855c781220fe', 1, 1, 'Sem cebola', '2025-06-20'),
	('6855c781220fe', 10, 1, '', '2025-06-20'),
	('685c0ab8d7b1a', 1, 2, '', '2025-06-25'),
	('685c0ab8d7b1a', 10, 1, '', '2025-06-25'),
	('685c0baaf2cd4', 1, 2, 'Sem pao', '2025-06-25'),
	('685c0baaf2cd4', 12, 1, '', '2025-06-25');

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
