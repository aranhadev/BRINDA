# BRINDA — Product Discovery

**Status:** hipótese de produto em validação · 15 de novembro de 2026

## A hipótese em uma frase

O BRINDA reduz filas, perdas e incerteza no fechamento de eventos presenciais de pequeno e médio porte ao reunir credenciamento, consumo, pagamento individual via Pix e visão operacional ao vivo em um único fluxo leve.

Esta frase é uma hipótese. Ela só vira posicionamento definitivo após conversas com operadores e um piloto real.

## O problema

Em eventos com bar, alimentação ou consumo controlado, a jornada costuma quebrar em ferramentas e processos independentes: lista de convidados ou ingresso na entrada, papel ou memória no consumo, cobrança no caixa e planilhas no fechamento. O resultado é fila no pico, consumo não registrado, erro de identificação, reconciliação manual e pouca visibilidade para decidir durante o evento.

O problema não é apenas pagamento. É a falta de uma trilha operacional confiável entre **pessoa → acesso → consumo → pagamento → fechamento**.

## Público-alvo inicial

### Cliente comprador

Organizador, proprietário de espaço ou responsável pela operação de um evento fechado e recorrente, com aproximadamente 100 a 1.000 participantes, que controla diretamente o bar, alimentação, consumação ou venda de produtos.

Esse recorte é inicial porque reúne dor operacional alta, necessidade de controle e uma implantação menor que a de grandes festivais.

### Pessoas que usam o produto

| Papel | Trabalho que precisa concluir | Dor atual |
| --- | --- | --- |
| Responsável pelo evento | Acompanhar acesso, venda, fila e caixa enquanto o evento acontece | Descobre perdas e divergências tarde demais |
| Recepção | Identificar convidado e liberar entrada sem parar a fila | Busca manual, lista fragmentada e identificação ambígua |
| Bar ou caixa | Localizar a conta certa, lançar consumo e registrar pagamento | Digitação, comanda perdida e retrabalho |
| Participante | Entrar, consumir e pagar sem esforço ou surpresa | Filas, falta de transparência e cobrança lenta |

## Valor que precisa ser provado

1. Menos tempo de atendimento na entrada e no bar.
2. Menos consumo sem registro e menos divergência de caixa.
3. Estado do evento disponível para quem decide, durante a operação.
4. Implantação possível sem contratar uma operação cashless completa.

A métrica de valor não será “usuários cadastrados”. Para cada piloto, o BRINDA deve medir tempo de atendimento, pedidos ou consumos sem identificação, divergência de fechamento e adoção real pela equipe.

## Tese de experiência do consumidor

O BRINDA precisa resolver uma dor do consumidor final, além da dor operacional do estabelecimento: consumo sem clareza e experiências fragmentadas. Uma cobrança duplicada ou uma comanda que só aparece no fechamento deixa a pessoa sem prova, sem controle e sem caminho simples de correção.

A hipótese de experiência é: **uma identidade de consumo voluntária e contínua permite entrar, consumir e pagar com mais clareza em diferentes locais que usam BRINDA, sem instalar um aplicativo novo a cada visita.**

O cadastro único é uma conveniência, não uma autorização ampla para compartilhar dados. Cada evento ou estabelecimento deve explicar o que usa, para qual finalidade e por quanto tempo. O participante deve conseguir usar um modo convidado quando não quiser uma conta persistente.

### Princípios de CX

1. **Sem download obrigatório:** o primeiro acesso abre no navegador/PWA por link ou QR; a instalação é opcional.
2. **Conta transparente em tempo real:** cada item mostra nome, valor, hora e estado; a pessoa vê a comanda antes do fechamento.
3. **Correção simples:** um lançamento suspeito, como uma duplicidade, pode ser sinalizado na própria tela; o operador recebe o caso com o histórico da transação.
4. **Identidade portátil com controle:** telefone, passkey, QR pessoal ou NFC podem reconhecer a pessoa, mas a informação compartilhada é mínima e contextual.
5. **Consentimento legível:** termos e privacidade não podem ficar escondidos no fluxo; a pessoa precisa entender quando está criando uma conta BRINDA e quando está apenas participando de um evento.
6. **Alternativa humana:** recepção e caixa precisam resolver exceções sem exigir que toda pessoa tenha smartphone, bateria ou familiaridade digital.

### O ganho para cada lado

| Participante | Estabelecimento |
| --- | --- |
| Vê o consumo antes de pagar | Tem menos contestação e retrabalho no caixa |
| Não precisa instalar um app por local | Reconhece retornos sem redigitar cadastro |
| Consegue questionar uma duplicidade com contexto | Tem trilha auditável para corrigir o lançamento |
| Usa uma experiência familiar em novos parceiros | Aumenta confiança, conversão e recorrência |

### MVP dessa tese

No piloto, a conta do participante deve mostrar uma comanda ao vivo e um recibo após o pagamento. O BRINDA pode reconhecer um participante que optou por criar conta, mas não deve depender de uma rede de parceiros para funcionar. A promessa de “uma conta em todo lugar” só deve ser comunicada quando houver locais suficientes e uma política de dados consolidada.
## O que já existe como referência funcional

O projeto Wappler original demonstra que a jornada desejada inclui:

- área do cliente e PWA;
- recepção e credenciamento;
- operação de bar e cardápio;
- pedidos, fila e entrega;
- identificação por NFC;
- Pix;
- painel do proprietário com alertas, vendas e ocupação.

Esses itens são referências de capacidade, não confirmação de que todos pertencem ao primeiro MVP.

## Mercado e alternativas

| Categoria | O que cobre | Espaço para o BRINDA |
| --- | --- | --- |
| Cashless completo para festivais | Ingresso, pulseira, recarga, consumo e operação assistida | É completo e depende de hardware e operação especializada; não é a primeira disputa do BRINDA |
| Gestão de acesso e comanda | Check-in, pulseira, PDV, consumo e relatórios | Confirma a dor, mas o BRINDA precisa ser mais simples de implantar para o recorte inicial |
| Pedido por QR para restaurantes | Cardápio e pedido pelo celular | Resolve apenas o pedido; não une credenciamento e fechamento do evento |
| PSP de Pix | Criação e confirmação de pagamento | É infraestrutura de pagamento, não a operação do evento |

Referências pesquisadas:

- [TOTUSPASS](https://www.totuspass.com.br/) apresenta uma operação completa de ingresso, pulseira NFC, recarga e bar.
- [acesso4](https://acesso4.com.br/promo) reúne credenciamento, pulseira RFID/NFC, comanda, PDV e dashboard.
- [Ingresse + Billfold](https://sobre.ingresse.com/ingresse-billfold) combina pulseira RFID e consumo cashless.
- [Goomer](https://goomer.com.br/blog/omnichannel-para-restaurantes) representa o pedido por QR/tablet focado em restaurante.
- [Stripe Pix](https://support.stripe.com/questions/how-to-enable-pix-as-a-payment-method-in-brazil?locale=pt-BR) representa a camada de pagamento por QR Pix e confirmação.

As promessas comerciais dessas empresas não são prova de resultado para o BRINDA. Elas mostram que o problema é real e que a concorrência é ampla.

## Posição de produto para validar

O BRINDA não deve começar como uma plataforma financeira cashless nem como fornecedor de hardware para grandes festivais. A primeira aposta é uma camada de operação para eventos com consumo controlado:

- identificação por QR ou NFC como chave operacional;
- comanda e lançamento de consumo vinculados à pessoa;
- Pix individual e confirmação registrada;
- painel em tempo real para operação e fechamento;
- PWA para reduzir instalação e facilitar treinamento;
- alternativa manual para situações em que o leitor NFC não estiver disponível.

A pulseira ou tag identifica a conta; ela não armazena saldo, dados de cartão ou segredo. O primeiro pagamento deve ser processado por um provedor habilitado e associado ao pedido no BRINDA.

## Escopo do primeiro piloto

### Inclui

1. Configurar um evento, cardápio e equipe.
2. Credenciar participante por nome, código ou NFC.
3. Abrir ou localizar a comanda correta.
4. Lançar um consumo pelo operador.
5. Criar e confirmar um Pix individual.
6. Exibir fila, vendas e comandas abertas no painel.
7. Fechar o evento com relatório auditável.

### Fica fora por enquanto

- venda pública de ingressos;
- saldo pré-pago, carteira própria ou reembolso automático;
- estoque completo e ERP;
- integração com várias adquirentes;
- hardware próprio ou firmware como requisito do piloto;
- analytics preditivo e IA;
- suporte a eventos de grande escala.

## Hardware e firmware C

O firmware é uma trilha de produto, não a premissa do MVP. Antes de construir hardware, é preciso definir qual problema ele resolve melhor que um celular ou leitor comercial: leitura NFC mais rápida, operação sem internet, totem, sinalização ou outra função específica.

Quando houver necessidade comprovada, o repositório mantém `firmware/` separado do frontend e da API. O dispositivo deve falar com a API por um contrato versionado e publicar apenas eventos mínimos. Nenhuma credencial de pagamento, chave privada ou base de clientes deve ficar no firmware.

## Plano de validação

### Entrevistas de descoberta

Fazer 10 entrevistas, sem demonstrar o produto no início:

- 4 organizadores ou produtores de eventos;
- 3 responsáveis por bar, caixa ou alimentação;
- 3 proprietários de espaços ou casas de evento.

Perguntas de partida:

1. Conte sobre o último evento em que houve bar ou consumo controlado.
2. Onde a fila travou e quanto tempo durou?
3. Como a equipe sabia a quem pertencia cada consumo?
4. Qual foi a maior divergência no fechamento e como foi encontrada?
5. Que ferramentas, equipamentos e pessoas foram necessários?
6. O que já foi tentado para resolver isso? Por que não ficou?
7. O que precisaria acontecer para trocar o processo atual em um evento piloto?
8. Qual parte do fluxo exige internet, e qual precisa continuar mesmo sem ela?

Registrar fatos, termos usados pelo entrevistado, fluxo atual, custo operacional aproximado e evidências. Não registrar dados pessoais desnecessários.

### Critério para avançar ao piloto

Avançar quando ao menos 6 de 10 entrevistados relatarem uma dor recorrente de fila, perda ou fechamento; 3 aceitarem participar de piloto; e houver um fluxo comum que possa ser atendido sem criar carteira de saldo ou hardware próprio.

### Métricas do piloto

- tempo mediano entre identificação e lançamento de consumo;
- percentual de consumos sem vínculo com participante;
- diferença entre total lançado e total pago no fechamento;
- quantidade de intervenções manuais por 100 atendimentos;
- tempo para treinar uma pessoa da equipe;
- satisfação da operação após o evento.

Definir uma linha de base no processo atual antes de prometer metas.

## Decisões de segurança e conformidade desde o início

- Dados mínimos: coletar somente o necessário para a jornada do evento.
- Pagamentos: usar provedor de pagamento; o BRINDA não guarda dados de cartão nem saldo de cliente.
- NFC: gravar apenas um identificador opaco ligado à conta no servidor.
- Acesso: separar permissões de proprietário, recepção, bar e caixa.
- Auditoria: registrar criação, cancelamento, pagamento e ajuste com hora e operador.
- Segredos: somente em ambiente seguro; nunca em frontend, firmware ou Git.

## Próxima decisão

Escolher um parceiro de entrevista e um evento real para observar. A descoberta termina quando houver evidência de uma dor repetida e um fluxo mínimo que o parceiro aceite testar.