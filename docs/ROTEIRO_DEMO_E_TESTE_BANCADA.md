# BRINDA — roteiro da demo e teste de bancada

**Status:** proposta; executar somente depois dos gates aprovados
**Referências:** [especificação do MVP](SPECS_MVP_HACKBRASIL.md) e [decisões e gates](DECISOES_E_GATES_HACKBRASIL.md)

## Objetivo da demonstração

Mostrar que a operação compartilha o estado de um pedido do recebimento à retirada e que o cliente tem dois caminhos de aviso: sinalização por piscar e vibrar quando houver kit associado, e consulta pelo código/estado como fallback.

Não demonstrar pagamentos, dados pessoais reais, venda de ingressos, rastreamento de pessoas, previsão validada de espera ou ganhos medidos de eficiência.

## Preparação do cenário sintético

1. Carregar os pontos Bar A, Bar B e Cozinha Central.
2. Garantir que ao menos dois kits estejam identificados como disponíveis.
3. Abrir as telas de participante, preparo e retirada em dispositivos/janelas separados.
4. Criar uma lista curta de itens sintéticos sem preço.
5. Confirmar que a consulta por código e a retirada manual funcionam antes de iniciar o roteiro.
6. Registrar o início da rodada de teste e a pessoa/papel que opera cada tela, sem dados pessoais reais.

## Roteiro de apresentação proposto

| Momento | Ação | Evidência que deve aparecer |
| --- | --- | --- |
| 1. Pedido | Participante cria um pedido no Bar A. | Código público e estado `received` no navegador. |
| 2. Fila | Preparo abre a fila do Bar A. | Mesmo código visível na fila correta. |
| 3. Preparo | Operação inicia o preparo. | Estado muda para `preparing` em todas as telas relevantes. |
| 4. Associação | Responsável associa um kit disponível ao pedido. | Kit passa a `assigned`; histórico registra a associação. |
| 5. Pronto | Preparo marca o pedido como pronto. | Estado `ready`, solicitação de alerta e kit correto pisca/vibra. |
| 6. Retirada | Participante apresenta o código; operação confirma a entrega. | Estado `collected`, alerta encerrado e kit liberado. |
| 7. Fallback | Simular um pedido sem kit ou uma falha declarada de alerta. | Código/estado permite confirmar a retirada sem sinalizador. |

## Casos de teste de bancada

| ID | Cenário | Passos resumidos | Resultado esperado |
| --- | --- | --- | --- |
| TB-01 | Fluxo completo com kit | Criar → preparar → associar → pronto → retirar. | Kit correto alerta; retirada encerra alerta e libera kit. |
| TB-02 | Pedido sem kit | Criar → preparar → pronto → retirar por código. | Pedido conclui sem depender de sinalização. |
| TB-03 | Falha de alerta | Associar → pronto → registrar falha → retirar por código. | Kit fica em atenção; pedido conclui pelo fallback. |
| TB-04 | Retirada antecipada | Criar ou preparar → tentar retirar. | Sistema bloqueia a ação e mantém o estado. |
| TB-05 | Cancelamento antes de pronto | Criar/preparar → cancelar. | Pedido finalizado; kit é liberado se estava associado. |
| TB-06 | Cancelamento durante alerta | Associar → pronto → cancelar. | Alerta é encerrado; não há alerta posterior. |
| TB-07 | Ação duplicada | Reenviar criação, alerta ou retirada com a mesma chave. | Apenas um pedido, um alerta e uma retirada são registrados. |
| TB-08 | Kit errado | Tentar associar um kit ocupado ou corrigir associação. | Associação inválida é bloqueada; correção fica auditável. |
| TB-09 | Fila por ponto | Criar pedidos em pontos distintos. | Cada pedido aparece somente na fila do ponto selecionado. |
| TB-10 | Consulta em outra tela | Informar código de pedido existente. | Exibe estado, ponto e instrução sem dados pessoais. |

## Registro de 20 ciclos

Preencher uma linha por ciclo. As metas servem para avaliar a bancada, não para fazer alegações sobre impacto de mercado.

| Ciclo | Kit | Caminho final | Kit correto | Alerta em até 3 s | Alerta encerrado | Fallback usado | Observação |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 |  | retirada/cancelamento |  |  |  |  |  |
| 2 |  | retirada/cancelamento |  |  |  |  |  |
| 3 |  | retirada/cancelamento |  |  |  |  |  |
| 4 |  | retirada/cancelamento |  |  |  |  |  |
| 5 |  | retirada/cancelamento |  |  |  |  |  |
| 6 |  | retirada/cancelamento |  |  |  |  |  |
| 7 |  | retirada/cancelamento |  |  |  |  |  |
| 8 |  | retirada/cancelamento |  |  |  |  |  |
| 9 |  | retirada/cancelamento |  |  |  |  |  |
| 10 |  | retirada/cancelamento |  |  |  |  |  |
| 11 |  | retirada/cancelamento |  |  |  |  |  |
| 12 |  | retirada/cancelamento |  |  |  |  |  |
| 13 |  | retirada/cancelamento |  |  |  |  |  |
| 14 |  | retirada/cancelamento |  |  |  |  |  |
| 15 |  | retirada/cancelamento |  |  |  |  |  |
| 16 |  | retirada/cancelamento |  |  |  |  |  |
| 17 |  | retirada/cancelamento |  |  |  |  |  |
| 18 |  | retirada/cancelamento |  |  |  |  |  |
| 19 |  | retirada/cancelamento |  |  |  |  |  |
| 20 |  | retirada/cancelamento |  |  |  |  |  |

## Critérios propostos para encerrar a bancada

- Todos os 20 ciclos têm resultado registrado.
- Nenhum ciclo mantém alerta depois de retirada ou cancelamento.
- Todo ciclo sem kit ou com falha de alerta pode terminar pelo fallback manual.
- Qualquer alerta no kit errado bloqueia a apresentação até ser explicado e repetido com sucesso.
- Metas sugeridas: 20 alertas no kit correto e 19 alertas em até três segundos. Se não forem atingidas, registrar a falha sem transformar o resultado em promessa.
