# BRINDA — contrato do sinalizador e viabilidade física

**Status:** especificação de comportamento; tecnologia e hardware em aberto
**Referências:** [especificação do MVP](SPECS_MVP_HACKBRASIL.md) e [decisões e gates](DECISOES_E_GATES_HACKBRASIL.md)

## Decisão de comportamento confirmada

Quando um pedido associado a um kit fica pronto, o **kit correto deve piscar e vibrar** para avisar o cliente. A retirada ou o cancelamento deve encerrar esse alerta. O webapp e o painel de retirada devem permitir finalizar a jornada pelo código/estado se o kit estiver ausente, sem bateria, desconectado ou com falha.

Esta decisão não escolhe componente, protocolo, conectividade ou forma de fixação do sinalizador.

## Limites do dispositivo

- O kit usa apenas identificador opaco; não armazena nome, contato, pagamento, saldo, segredo ou credencial.
- O kit não decide a situação financeira nem o estado final do pedido.
- A fonte de verdade do pedido é a aplicação aprovada para o MVP.
- A demonstração não afirma localização automática, rastreamento de pessoa ou garantia de entrega do alerta.

## Estados e comandos mínimos propostos

| Elemento | Valor | Regra |
| --- | --- | --- |
| Kit | `available` | Pode receber uma associação. |
| Kit | `assigned` | Está reservado para um pedido ainda não pronto. |
| Kit | `alerting` | Recebeu solicitação de piscar e vibrar para o pedido associado. |
| Kit | `attention_required` | Falhou, está incerto ou exige avaliação antes de ser reutilizado. |
| Comando | `alert.start` | Aceito somente para pedido `ready` associado ao kit correto. |
| Comando | `alert.stop` | Enviado ao retirar ou cancelar; deve ser seguro repetir. |
| Evento | `alert.result` | Registra `accepted`, `failed` ou `unknown`; não inventa confirmação que não ocorreu. |

## Regras de segurança operacional

1. Um kit em `assigned` ou `alerting` não pode ser associado a outro pedido.
2. Uma repetição de `alert.start` com a mesma chave de idempotência não deve criar uma segunda sessão de alerta.
3. `alert.stop` pode ser repetido sem restaurar o alerta.
4. Pedido `collected` ou `cancelled` nunca pode iniciar alerta.
5. Falha ou incerteza do alerta marca o kit para atenção e direciona a operação ao fallback manual.
6. A aplicação registra pedido, kit, hora, resultado e motivo de cada comando; não registra dados pessoais.

## Interface de mensagens proposta

| Mensagem | Campos mínimos | Resultado esperado |
| --- | --- | --- |
| `alert.start` | `kit_id`, `order_id`, `requested_at`, `idempotency_key` | O kit inicia piscar e vibrar ou devolve falha/incerteza. |
| `alert.stop` | `kit_id`, `order_id`, `reason`, `idempotency_key` | O kit encerra a sinalização. |
| `alert.result` | `kit_id`, `order_id`, `result`, `occurred_at`, `reason` opcional | A aplicação atualiza o estado operacional do kit. |

O formato de transporte, autenticação técnica e confirmação de entrega ficam em aberto até a análise de viabilidade. As mensagens não devem conter dados de pagamento, dados pessoais nem segredos.

## Perguntas obrigatórias para a análise de viabilidade

| Tema | Pergunta a responder antes de escolher hardware |
| --- | --- |
| Energia | Quanto tempo o kit precisa operar, como será recarregado e como a bateria baixa é detectada? |
| Conectividade | A demo depende de Wi-Fi, Bluetooth, cabo ou outro meio? Qual é o comportamento sem conexão? |
| Alcance | Qual distância e quais obstáculos o ambiente de bancada precisa suportar? |
| Associação | QR, NFC, Bluetooth ou seleção manual melhor atende à entrega e devolução do kit? |
| Identidade | Como o identificador opaco é gravado/lido sem guardar informação de pessoa? |
| Confirmação | O que significa `accepted`, `failed` e `unknown` para o dispositivo escolhido? |
| Alerta | Piscar e vibrar são percebidos no ambiente-alvo sem provocar confusão com outros kits? |
| Reuso | Como o kit é liberado, higienizado, recarregado e marcado para atenção? |
| Teste | Como medir o kit correto, a latência até o alerta e a ausência de alerta pós-retirada/cancelamento? |

## Critério para seguir para prova física

A prova física pode começar quando as perguntas acima tiverem resposta registrada, o caminho de fallback estiver testável e houver um teste de bancada aprovado com pelo menos dois kits. Até então, esta especificação não autoriza compra, montagem ou desenvolvimento de firmware.
