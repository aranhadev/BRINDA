# BRINDA — decisões e gates do MVP Hack Brasil

**Status:** rascunho para aprovação
**Referência de escopo:** [especificação do MVP](SPECS_MVP_HACKBRASIL.md)

## Regra de avanço

O BRINDA permanece em planejamento até todos os gates abaixo estarem aprovados. Não criar a pasta/repositório da submissão nem iniciar código novo de competição antes disso. Quando aprovado, o código nasce separado deste repositório, com Git próprio.

O registro de cada gate deve usar apenas `confirmado`, `proposta` ou `em aberto`. Uma proposta não se torna decisão por aparecer neste arquivo.

## Gate 1 — cenário, papéis e telas

| Campo | Registro |
| --- | --- |
| Status | Em aberto |
| Decisão necessária | Confirmar a jornada e as telas mínimas da demo. |
| Proposta | Evento sintético com Bar A, Bar B e Cozinha Central; telas de pedido, acompanhamento, fila/preparo, retirada e controle de kit. |
| Alternativas | Um único ponto para uma demo mais curta; ou três pontos para evidenciar filas independentes. |
| Critério de aprovação | Uma pessoa consegue descrever a jornada inteira, seus papéis e o que cada tela permite fazer. |
| Consequência se não aprovar | Não é possível fechar os requisitos funcionais nem preparar o roteiro da demo. |

## Gate 2 — quem carrega a comanda e formato do sinalizador

| Campo | Registro |
| --- | --- |
| Status | Em aberto |
| Decisão necessária | Definir se a pessoa leva uma comanda/tag e se o sinalizador é integrado ou acoplável. |
| Proposta | O fluxo deve funcionar sem depender do formato: a associação e a retirada manual são obrigatórias. |
| Alternativas | Kit entregue ao participante; kit que fica no balcão; sinalizador integrado à comanda; sinalizador acoplado. |
| Critério de aprovação | Há uma resposta clara para entrega, uso, devolução e higienização/reuso do kit na demo. |
| Consequência se não aprovar | Não há como definir associação, disponibilidade ou prova física. |

## Gate 3 — associação, disponibilidade e encerramento do alerta

| Campo | Registro |
| --- | --- |
| Status | Em aberto |
| Decisão necessária | Fechar como pedido e kit são associados, quando o kit fica disponível e quem inicia/encerra o alerta. |
| Proposta | Operação associa manualmente um kit disponível ao pedido; ao ficar pronto, o sistema solicita alerta; retirada ou cancelamento encerra o alerta e libera o kit. |
| Alternativas | Associação por QR, NFC ou fluxo manual; liberação automática ou confirmada pela operação. |
| Critério de aprovação | Cada estado do kit tem responsável e não existe possibilidade de reutilizar um kit em alerta. |
| Consequência se não aprovar | O contrato do sinalizador e os testes de exceção ficam indefinidos. |

## Gate 4 — prova física, métrica e fallback

| Campo | Registro |
| --- | --- |
| Status | Em aberto |
| Decisão necessária | Definir a prova mínima de bancada e o fallback final quando o sinalizador não funciona. |
| Proposta | Dois ou mais kits, 20 ciclos de pedido → associação → pronto → alerta → retirada/cancelamento e retirada manual por código/estado. |
| Metas sugeridas | 20/20 alertas no kit correto; 19/20 em até três segundos; nenhum alerta após retirada/cancelamento. São metas de teste, não promessas. |
| Critério de aprovação | O teste é repetível, registra êxito/falha e permite concluir a jornada sem o kit. |
| Consequência se não aprovar | Não há evidência mensurável de que a demonstração física funciona. |

## Gate 5 — critério de “pronto” e permissões operacionais

| Campo | Registro |
| --- | --- |
| Status | Em aberto |
| Decisão necessária | Definir quem pode marcar pronto, cancelar e confirmar retirada. |
| Proposta | Preparo marca pronto; retirada confirma entrega; responsável da demo corrige associação de kit e trata falhas. |
| Alternativas | Uma única operação na demo; ou papéis separados para demonstrar passagem de bastão. |
| Critério de aprovação | Cada ação crítica tem um papel permitido e a tela impede transições fora de ordem. |
| Consequência se não aprovar | Os fluxos e testes de permissão não podem ser fechados. |

## Gate 6 — stack e atualização entre telas

| Campo | Registro |
| --- | --- |
| Status | Em aberto |
| Decisão necessária | Aprovar a stack no Aranha Studio, persistência, transporte de atualização e contrato com o sinalizador. |
| Proposta | Usar a base nativa existente somente após aprovação; tratar atualização por eventos ou polling como decisão técnica explícita. |
| Limite fixo | Nenhum dado de pagamento, dado pessoal real ou segredo no frontend, no kit ou no repositório. |
| Critério de aprovação | A stack suporta criação de pedido, atualização de estado, histórico, idempotência e fallback manual. |
| Consequência se não aprovar | Não há autorização para iniciar a implementação da submissão. |

## Registro de aprovação

| Gate | Decisão aprovada | Data | Responsável | Observações |
| --- | --- | --- | --- | --- |
| 1 |  |  |  |  |
| 2 |  |  |  |  |
| 3 |  |  |  |  |
| 4 |  |  |  |  |
| 5 |  |  |  |  |
| 6 |  |  |  |  |
