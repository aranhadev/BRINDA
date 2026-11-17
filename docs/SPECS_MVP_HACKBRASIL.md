# BRINDA — especificação do MVP para o Hack Brasil

**Status:** rascunho para aprovação de produto — não autoriza início de implementação
**Atualizado em:** 17 de novembro de 2026
**Fonte principal:** briefing de planejamento do BRINDA para o Hack Brasil

## 1. Objetivo e limite deste documento

Este documento especifica o MVP demonstrável do BRINDA para a trilha **Logística & Automação** do Hack Brasil. Ele cobre a jornada operacional completa:

```text
pedido recebido → fila/preparo → pedido pronto → alerta do kit → retirada confirmada
```

Ele é um plano de produto e de desenvolvimento para o **Aranha Studio**. Não cria código, não escolhe componentes de hardware e não autoriza criar a pasta/repositório da submissão.

As definições abaixo usam estes rótulos:

- **Confirmado:** decisão já registrada no briefing.
- **Proposta:** recorte detalhado para aprovação; não deve virar código como se fosse decisão.
- **Em aberto:** escolha que ainda depende de aprovação de produto ou validação técnica.

### Separação do produto mais amplo

O repositório também contém documentos de descoberta do BRINDA com Pix, credenciamento, cashback, comandas e fechamento. Eles descrevem uma visão/piloto mais amplo e **não entram neste MVP de competição**. Neste recorte, pagamentos e finanças permanecem fora de escopo, mesmo que apareçam em documentação anterior.

## 2. Escopo de produto

### Confirmado

- O BRINDA organiza pedidos, fila e retirada para bares, restaurantes e eventos.
- A demo demonstra pedido recebido, fila/preparo, pronto e retirada confirmada.
- Ao ficar pronto, o kit/comanda/tag associado ao pedido **pisca e vibra** para avisar o cliente.
- Existe fallback no webapp/painel com número e estado do pedido e confirmação manual de retirada.
- A demo usa somente dados sintéticos.
- Não fazem parte do MVP: pagamento, Pix, finanças, venda de ingresso, caução, gorjeta, rastreamento automático de pessoas ou dados pessoais reais.

### Proposta de cenário de demonstração

Um evento sintético tem três pontos fixos de retirada: **Bar A**, **Bar B** e **Cozinha Central**. Cada um recebe pedidos, organiza uma fila própria e entrega no próprio balcão.

O participante cria um pedido no navegador, recebe um código de pedido e acompanha seu estado. A equipe de preparo conduz o pedido pela fila. Quando o pedido fica pronto, a operação aciona o alerta do kit associado; o participante recebe o sinal visual/tátil e a equipe confirma a retirada. Se o kit falhar ou não estiver disponível, o código e o estado no navegador permitem concluir a retirada manualmente.

Essa proposta usa três pontos apenas para dar legibilidade à demo. Não representa validação de demanda, ETA ou operação em tempo real.

### Fora do escopo

- Cardápio comercial completo, preço, desconto, cobrança, Pix, cartão, cashback, saldo ou conciliação.
- Cadastro de clientes, login persistente, telefone, e-mail, CPF ou qualquer dado pessoal real.
- Venda de ingressos, check-in de convidados ou controle de acesso.
- Otimização automática de fila, previsão de preparo ou promessa de ETA validada.
- Localização/rastreamento automático de clientes, kits ou equipe.
- Firmware, escolha, compra ou montagem de hardware antes da prova física aprovada.
- Integrações externas e uso em evento real.

## 3. Pessoas e responsabilidades

| Papel | Objetivo na jornada | Capacidades propostas |
| --- | --- | --- |
| Participante | Criar e acompanhar o pedido; localizar a retirada | Criar pedido sintético, ver código, ponto, estado e instrução de retirada |
| Operação de preparo | Tornar a fila visível e atualizar o preparo | Ver a fila do ponto, iniciar preparo e marcar como pronto |
| Operação de retirada | Confirmar que o pedido foi entregue e liberar o kit | Consultar código/estado, confirmar retirada ou cancelar pedido |
| Responsável da demo | Preparar o cenário e tratar exceções | Criar dados sintéticos, associar/liberar kit e consultar o histórico |

**Em aberto:** para a demo, os papéis de preparo, retirada e responsável podem usar uma sessão simples de demonstração ou acessos distintos. Não há decisão de autenticação enquanto não houver definição da stack e da forma de operação.

## 4. Fluxo principal e exceções

### Fluxo principal proposto

1. O participante abre o webapp e seleciona o ponto de retirada.
2. Ele monta um pedido sintético com itens e quantidades e o envia.
3. O sistema gera um código legível, associa o pedido ao ponto selecionado e mostra o estado **Recebido**.
4. A equipe visualiza o pedido na fila, inicia o preparo e o estado passa a **Em preparo**.
5. A equipe marca o pedido como **Pronto**.
6. Se houver kit associado e funcional, a operação emite o alerta para aquele kit: piscar e vibrar.
7. O participante consulta o código/estado e vai ao ponto de retirada.
8. A operação confirma a retirada; o alerta é encerrado, o pedido fica **Retirado** e o kit retorna a **Disponível**.

### Exceções obrigatórias

| Situação | Comportamento esperado |
| --- | --- |
| Kit não associado ou indisponível | O pedido continua rastreável por código e estado; a retirada pode ser confirmada manualmente. |
| Falha de alerta | A operação pode registrar a falha, orientar pelo número do pedido e concluir manualmente. O sistema não deve afirmar que o participante foi alertado. |
| Retirada antes de pronto | A confirmação é bloqueada e explica que o pedido ainda não está disponível. |
| Pedido cancelado | O alerta é encerrado/não pode ser iniciado; o kit, se houver, é liberado. |
| Repetição de ação por clique ou rede | Atualizações críticas precisam ser idempotentes: a mesma solicitação não pode criar outro pedido, disparar um segundo alerta nem confirmar duas retiradas. |
| Kit associado ao pedido errado | Somente o responsável pode desfazer a associação antes da retirada, com registro do motivo. |

## 5. Estados que devem existir

### Pedido

| Estado | Significado | Transições permitidas propostas |
| --- | --- | --- |
| `received` | Pedido criado e aguardando atendimento | `queued`, `cancelled` |
| `queued` | Pedido posicionado na fila do ponto | `preparing`, `cancelled` |
| `preparing` | Equipe iniciou o preparo | `ready`, `cancelled` |
| `ready` | Pedido apto para retirada; alerta pode estar ativo | `collected`, `cancelled` |
| `collected` | Retirada confirmada; estado final | nenhuma |
| `cancelled` | Pedido encerrado sem retirada; estado final | nenhuma |

**Proposta:** a interface pode simplificar `received` e `queued` visualmente como “Na fila”, mas o histórico preserva as duas mudanças quando ocorrerem.

### Kit sinalizador

| Estado | Significado | Regra proposta |
| --- | --- | --- |
| `available` | Pode ser associado a um novo pedido | Não pode ter alerta ativo. |
| `assigned` | Reservado para um pedido ainda não pronto | Não pode ser associado a outro pedido. |
| `alerting` | Piscar e vibrar solicitados para o pedido pronto | Deve ser encerrado ao retirar ou cancelar. |
| `attention_required` | Operação declarou falha ou incerteza no kit | Pedido segue pelo fallback manual; kit não é reutilizado até avaliação. |

**Em aberto:** se o sinalizador será parte da comanda ou uma peça acoplável; quem o entrega/carrega; e se todos os pedidos terão kit ou apenas uma parcela da demonstração.

## 6. Telas e comportamentos a desenvolver

### 6.1 Webapp do participante

**Proposta de telas mínimas**

1. **Novo pedido**
   - Seleção do ponto de retirada.
   - Lista curta de itens sintéticos e controle de quantidade.
   - Resumo do pedido e ação “Enviar pedido”.
   - Sem preço, pagamento ou identificação pessoal.

2. **Acompanhamento do pedido**
   - Código legível do pedido.
   - Ponto de retirada.
   - Estado atual em linguagem simples: “Recebido”, “Na fila”, “Em preparo”, “Pronto para retirar”, “Retirado” ou “Cancelado”.
   - Instrução para apresentar o código no balcão quando pronto.
   - Aviso de fallback: o estado da tela é a referência caso o sinalizador não seja percebido.

3. **Consulta de pedido**
   - Campo para informar o código do pedido em outro celular/tela.
   - Exibe apenas o estado, ponto e instrução; não expõe dados de outra pessoa.

### 6.2 Painel de preparo

- Filtro por ponto de retirada.
- Fila ordenada por recebimento, com código e itens do pedido.
- Ações compatíveis com o estado: assumir/iniciar preparo, marcar pronto e cancelar.
- Indicação separada de kit “associado”, “alertando” ou “sem kit/fallback”.
- Não exibe dados pessoais, pagamentos ou métricas não validadas.

### 6.3 Painel de retirada

- Busca direta pelo código do pedido.
- Confirma o ponto e o estado antes de liberar a ação de retirada.
- Ação “Confirmar retirada” disponível somente em `ready`.
- Ação “Cancelar pedido” com confirmação e motivo operacional simples.
- Ao concluir, mostra que o pedido foi retirado e que o kit foi liberado ou marcado para atenção.

### 6.4 Controle de kits para a demo

- Lista de kits sintéticos/identificadores físicos e seu estado.
- Associação manual de um kit disponível a um pedido aberto.
- Registro de alerta solicitado, confirmado pela operação ou com falha.
- Liberação automática na retirada/cancelamento, exceto se tiver sido marcada falha.

**Em aberto:** NFC ou QR deve ser definido como uma forma de associação apenas depois da avaliação de viabilidade. O MVP precisa funcionar por seleção manual/código mesmo sem leitor.

## 7. Requisitos funcionais

| ID | Requisito | Prioridade |
| --- | --- | --- |
| RF-01 | Criar pedido sintético com ponto, itens e quantidades, retornando código único legível. | Essencial |
| RF-02 | Exibir o pedido do participante por código, com ponto e estado atual. | Essencial |
| RF-03 | Mostrar filas separadas por ponto de retirada. | Essencial |
| RF-04 | Permitir à equipe mudar o pedido por estados válidos e manter o histórico. | Essencial |
| RF-05 | Impedir transições inválidas, como confirmar retirada antes de o pedido estar pronto. | Essencial |
| RF-06 | Associar no máximo um kit disponível a cada pedido ativo. | Essencial, se houver kit |
| RF-07 | Ao marcar um pedido associado como pronto, solicitar que o kit correto pisque e vibre. | Essencial, se houver kit |
| RF-08 | Encerrar ou impedir alerta após retirada ou cancelamento. | Essencial, se houver kit |
| RF-09 | Permitir retirada manual pelo código/estado caso o alerta ou kit falhe. | Essencial |
| RF-10 | Registrar eventos de criação, mudança de estado, associação, alerta, retirada, cancelamento e falha. | Essencial |
| RF-11 | Carregar cenário sintético com três pontos de retirada e pedidos demonstráveis. | Essencial |
| RF-12 | Mostrar posição na fila e uma faixa de espera somente se definida como informação estimada/manual. | Opcional; proposta |
| RF-13 | Atualizar os painéis sem recarga manual, por evento/polling aprovado na stack. | Desejável |

## 8. Modelo lógico de dados proposto

O modelo abaixo descreve responsabilidades de dados; nomes de tabelas, tecnologia de banco e persistência dependem da stack aprovada.

| Entidade | Campos mínimos | Finalidade |
| --- | --- | --- |
| `event` | `id`, `name`, `mode` | Delimita o cenário sintético de demonstração. |
| `pickup_point` | `id`, `event_id`, `name`, `status` | Representa Bar A, Bar B ou Cozinha Central. |
| `order` | `id`, `public_code`, `pickup_point_id`, `status`, `created_at`, `updated_at` | Representa o pedido sem identidade pessoal ou pagamento. |
| `order_item` | `id`, `order_id`, `name`, `quantity` | Registra os itens sintéticos solicitados. |
| `signal_kit` | `id`, `display_code`, `status`, `last_seen_at` | Representa a tag/comanda/sinalizador em uso na demo. |
| `kit_assignment` | `id`, `order_id`, `signal_kit_id`, `assigned_at`, `released_at`, `release_reason` | Garante a relação entre um pedido e um kit. |
| `operation_event` | `id`, `order_id`, `kit_id`, `type`, `actor_role`, `occurred_at`, `reason` | Trilha operacional auditável, sem dados pessoais. |

### Invariantes

- Um `public_code` identifica somente um pedido dentro do evento.
- Um pedido ativo tem no máximo um kit com associação aberta.
- Um kit em `assigned` ou `alerting` não pode ser associado a outro pedido.
- `collected` e `cancelled` são finais.
- Nenhum alerta pode permanecer ativo quando o pedido está `collected` ou `cancelled`.
- Eventos históricos não são reescritos; correções devem adicionar novo evento com motivo.

## 9. Contratos de integração propostos

Estes contratos descrevem comportamento esperado, não definem ainda URLs finais, framework ou transporte.

| Operação | Entrada mínima | Saída/efeito esperado |
| --- | --- | --- |
| Criar pedido | ponto, itens, chave de idempotência | pedido, código público e estado `received` |
| Consultar pedido | código público | estado, ponto, itens e histórico público mínimo |
| Atualizar preparo | pedido, estado-alvo, papel da operação | novo estado e evento de auditoria |
| Associar kit | pedido, kit disponível | associação única e kit `assigned` |
| Solicitar alerta | pedido pronto, kit associado | evento de alerta e comando para piscar/vibrar |
| Registrar resultado do alerta | kit/pedido, sucesso ou falha | kit `alerting` ou `attention_required` |
| Confirmar retirada | pedido pronto | pedido `collected`, alerta encerrado e kit liberado/retido |
| Cancelar pedido | pedido ativo, motivo | pedido `cancelled`, alerta encerrado e kit liberado/retido |

### Contrato mínimo com o sinalizador

**Confirmado:** a função visível deve ser piscar e vibrar o kit correto quando seu pedido estiver pronto.

**Proposta de mensagens mínimas:**

- `alert.start`: identificador opaco do kit, identificador do pedido, instante e chave de idempotência.
- `alert.stop`: identificador opaco do kit, identificador do pedido, motivo (`collected` ou `cancelled`).
- `alert.result`: identificador do kit, resultado (`accepted`, `failed` ou `unknown`) e instante.

O protocolo físico, conectividade, confirmação real do dispositivo e escolha entre NFC, QR, BLE ou outra tecnologia estão **em aberto** e exigem análise de viabilidade antes de qualquer implementação de hardware. Não guardar dados de clientes, credenciais de pagamento ou segredos no kit.

## 10. Segurança, privacidade e resiliência

- Popular a demo exclusivamente com nomes de itens, pontos e códigos sintéticos.
- Não solicitar nem persistir dados pessoais, de pagamento ou de localização.
- Usar identificadores opacos para pedido e kit; o código público deve ser curto o bastante para operação, mas não revelar informação pessoal.
- Restringir ações de preparo, retirada, cancelamento e kit ao painel operacional que for aprovado.
- Registrar quem/qual papel realizou uma ação operacional, sem exigir identificação real na demo.
- Tratar comando duplicado e reconexão de forma idempotente.
- O webapp e os painéis devem permanecer suficientes para finalizar a jornada quando o sinalizador falhar.

## 11. Critérios de aceite da demo

O MVP estará pronto para demonstrar quando um avaliador puder, com dados sintéticos:

1. Criar um pedido em um dos três pontos e receber seu código.
2. Ver o pedido entrar na fila correta.
3. Atualizar o pedido de recebido para preparo e pronto, sem saltar etapas proibidas.
4. Ver o estado atualizado no acompanhamento do participante.
5. Para um pedido com kit válido, observar o kit correto piscar e vibrar ao ficar pronto.
6. Confirmar a retirada no painel e verificar que o alerta foi encerrado e o kit liberado.
7. Simular ausência/falha de kit e ainda concluir a retirada pelo código e estado do pedido.
8. Cancelar um pedido ativo e verificar que não há alerta posterior nem kit preso em uso.
9. Consultar o histórico operacional mínimo de uma jornada completa.

### Prova de bancada proposta

Antes da apresentação, executar ao menos 20 ciclos de:

```text
pedido → associação → pronto → alerta → retirada ou cancelamento
```

Metas sugeridas para aprovação posterior: 20/20 alertas no kit correto, 19/20 em até três segundos e nenhum alerta após retirada/cancelamento. Elas são **metas de teste**, não resultado alegado nem requisito já validado.

## 12. Sequência de desenvolvimento proposta

| Etapa | Entrega | Dependência |
| --- | --- | --- |
| 0. Aprovação | Cenário, telas, associação, fallback, prova física e stack aprovados | Decisão de produto |
| 1. Base da demo | Cenário sintético, pontos e pedidos criáveis/consultáveis | Etapa 0 |
| 2. Operação | Fila, transições válidas, retirada e histórico | Etapa 1 |
| 3. Sinalização | Associação de kit, iniciar/parar alerta e fallback | Etapa 2 e viabilidade física aprovada |
| 4. Ensaio | Roteiro da demo, casos de falha e 20 ciclos de bancada | Etapa 3 |

Não iniciar a implementação da submissão nem criar sua pasta/repositório antes de concluir a etapa 0. O código da competição deverá nascer separado deste repositório de planejamento, com Git próprio.

## 13. Decisões necessárias antes de implementar

1. Aprovar ou ajustar o cenário proposto de três pontos fixos, papéis e telas.
2. Decidir quem carrega a comanda e se o sinalizador é integrado ou acoplável.
3. Definir como o kit é associado ao pedido, disponibilizado, devolvido e liberado.
4. Fechar a prova física, o fallback definitivo e o que conta como falha de alerta.
5. Aprovar o critério de “pedido pronto” e as permissões mínimas da operação.
6. Aprovar a stack no Aranha Studio e a estratégia de atualização entre telas.
7. Após as decisões acima, criar a pasta/repositório separado da submissão.

## 14. Questões de validação que não podem virar promessa

- A lista de filas, posição e possíveis faixas de espera é uma proposta de interface; não deve ser apresentada como previsão ou tempo real validado sem fonte de dados e teste.
- A hipótese de que pedidos e retiradas se perdem/atrasam pela falta de estado compartilhado ainda precisa de evidência com operadores.
- O sinalizador é um comportamento de demo confirmado; seu protocolo, energia, alcance, conectividade e taxa de sucesso exigem validação de viabilidade.
- Não alegar redução de tempo de espera, eficiência ou impacto comercial antes de medir em um teste apropriado.
