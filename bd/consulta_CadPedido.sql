SELECT * FROM cadpedido a 
LEFT JOIN situacao b ON a.idSituacao = b.IdSituacao
WHERE b.DescriacaoSituacao <> 'Cancelado'
AND a.idPedido IN(2);

