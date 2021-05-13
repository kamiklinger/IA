----------
Melhorias para V2:

Transformar o main em uma classe;
Adicionar os métodos "darDanoMelee", "darDanoRanged" no mapa de estados;
Para que possam virar estados, alterar os metodos que recebem parâmetros ;
Melhorar as interações entre os estados de forma geral, pra que a ordem de execução não crie problemas que travem a experiência (como o "patrol" que prende o herói ao inimigo toda vez que checa a vida dele), uma possível solução é fazer o herói verificar a vida do inimigo antes de mudar para algum estado de ataque. 
----
Na V2, transformamos o main.js em uma classe estática, tornamos o colisor um metodo comum entre agentes, adicionamos os metodos de dano ao mapa, porém não conseguimos corrigir os erros com os parâmetros então comentamos esses estados para prosseguir com a matéria

Iniciamos a implementar o Waypoint, desenhando na tela as coordenadas

-----------
Para a V3: 
Fazer a patrulha entre os pontos, e iniciar a implementação do flocking
----
Na V3 implementamos o Waypoints e organizamos o código separado por "sessões" (feitas com comentarios ) pois estava ficando absurdamente grande e impossível de se encontrar

----------
Para V4 
Implementar Flocking, talvez arrumar os estados de ataque para que eles funcionem direito

----