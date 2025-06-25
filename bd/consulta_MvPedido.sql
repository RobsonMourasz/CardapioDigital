SELECT * FROM mvpedido a 
LEFT JOIN cadprodutos b ON a.IdProduto = b.IdProduto
LEFT JOIN categoria c ON b.IdCategoria = c.IdCategoria
WHERE a.NumPedido IN ( SELECT Controle FROM cadpedido a 
LEFT JOIN situacao b ON a.idSituacao = b.IdSituacao
WHERE b.DescriacaoSituacao <> "Cancelado" AND b.DescriacaoSituacao <> "Concluido" )