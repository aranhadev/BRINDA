# BRINDA — Cashback do estabelecimento

**Status:** decisão de produto para o MVP · 15 de novembro de 2026

## Decisão

O primeiro cashback do BRINDA é um **crédito promocional do estabelecimento de origem**. Ele é concedido após uma compra paga e confirmada, e só pode reduzir uma compra futura no mesmo estabelecimento.

Exemplo: uma pessoa recebe R$ 8,00 de cashback no Bar Aurora. Esse crédito aparece como “R$ 8,00 para usar no Bar Aurora”, com prazo e condições visíveis. Ele não pode ser usado em outro bar, sacado, transferido, enviado por Pix ou convertido em dinheiro.

## Por que começa assim

- Faz o benefício ter significado claro para o cliente e para o estabelecimento que o financiou.
- Incentiva retorno sem prometer uma rede de parceiros antes de ela existir.
- Evita que o MVP trate dinheiro de cliente como saldo livre ou carteira.
- Mantém a regra de uso fácil de explicar na tela e fácil de auditar.

## Pagamento pelo BRINDA

O cliente deve poder pagar dentro da experiência do BRINDA, começando por Pix gerado por um provedor de pagamento habilitado. O BRINDA apresenta o QR, acompanha a confirmação e registra o pedido; não guarda cartão, não recebe depósito do usuário e não mantém saldo de dinheiro.

O crédito promocional não é pagamento pré-pago aportado pelo usuário. O Banco Central define moeda eletrônica como recursos em reais armazenados que permitem transações de pagamento. O desenho do BRINDA precisa preservar essa separação e receber revisão jurídica antes de escalar o programa. Ver [Banco Central: moeda eletrônica](https://www.bcb.gov.br/meubc/faqs/p/moeda-eletronica) e [instituições de pagamento](https://www.bcb.gov.br/estabilidadefinanceira/instituicaopagamento).

## Regras do MVP

1. O cashback é criado apenas quando o pagamento tem estado `settled`/confirmado.
2. Cada crédito pertence a um participante e a um estabelecimento (`merchant_id`).
3. O crédito só pode ser aplicado a pedido com o mesmo `merchant_id`.
4. Um cancelamento, estorno ou chargeback da compra que gerou o benefício reverte o crédito ainda disponível.
5. O crédito não é transferível, sacável nem conversível em Pix ou dinheiro.
6. A campanha define percentual ou valor, prazo, teto por compra e valor mínimo de uso.
7. A tela informa valor, estabelecimento, expiração e motivo de qualquer reversão.
8. O estabelecimento assume o custo do benefício e aprova as regras da campanha.

## Estados e trilha de auditoria

Não guardar apenas um campo `balance` editável. O sistema registra eventos imutáveis em um ledger e calcula o saldo disponível a partir deles.

```text
pending → available → held → redeemed
                     ↘ reversed
available → expired
```

Cada evento precisa conter, no mínimo:

```text
id
participant_id
merchant_id
source_payment_id
redemption_order_id
campaign_id
amount_cents
status
idempotency_key
created_at
expires_at
rule_version
```

A mesma chave de idempotência não pode criar dois créditos nem consumir o mesmo crédito duas vezes. No checkout, a reserva (`held`) e o resgate precisam acontecer na mesma transação do pedido.

## Experiência do participante

### Ao receber

> Você ganhou R$ 8,00 para usar no Bar Aurora até 30 de novembro.

O benefício só vira disponível após o pagamento confirmado. A pessoa vê a origem e o prazo, sem a impressão de que possui dinheiro livre no aplicativo.

### Ao pagar novamente

> Você tem R$ 8,00 disponíveis neste estabelecimento.

O checkout mostra quanto será usado, o que sobra e o valor final. A pessoa escolhe aplicar ou não o crédito quando isso fizer sentido para a campanha.

### Ao tentar usar em outro local

> Este benefício é válido apenas no Bar Aurora.

A regra deve aparecer antes da confirmação de pagamento, sem erro surpresa ao final.

## Evolução futura: dois tipos de benefício

O modelo deve nascer com um campo de escopo, mesmo que o MVP ative somente o primeiro tipo:

| Tipo | Escopo | Financiador | Situação |
| --- | --- | --- | --- |
| Cashback do estabelecimento | `merchant` | estabelecimento de origem | MVP |
| Crédito BRINDA | `network` | BRINDA, patrocinador ou campanha conjunta | hipótese futura |

O crédito de rede exige regras comerciais, liquidação entre parceiros, política de expiração e revisão jurídica específicas. Ele não entra no piloto.

## Perguntas que o piloto precisa responder

1. Qual percentual ou valor gera retorno sem prejudicar a margem do estabelecimento?
2. O participante prefere cashback para próxima visita, desconto imediato ou os dois?
3. Qual prazo é percebido como justo?
4. A regra “somente neste estabelecimento” é entendida sem suporte humano?
5. O cashback aumenta retorno ou apenas reduz receita de quem já voltaria?

## Critério de sucesso

O cashback continua depois do piloto se aumentar retorno mensurável e mantiver baixa a taxa de dúvida, contestação e uso manual pelo operador. A métrica deve comparar participantes elegíveis com grupo de controle quando houver volume suficiente.