SELECT * FROM mvpedido a 
LEFT JOIN cadprodutos b ON a.IdProduto = b.IdProduto
LEFT JOIN categoria c ON b.IdCategoria = c.IdCategoria