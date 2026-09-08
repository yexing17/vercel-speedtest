# Vercel Speed Test

[English](README.md) · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [日本語](README.ja.md) · **Português**

Um teste de velocidade de internet de código aberto e focado em privacidade, executado **inteiramente na Vercel**. Ele mede latência, jitter, download e upload entre o navegador e o deployment da Vercel que está servindo a página.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yexing17/vercel-speedtest)

## Recursos

- Arquitetura Vercel pura — sem Cloudflare, Speedtest.net, VPS externo, banco de dados ou serviço externo de medição.
- Medição de ping e jitter.
- Testes de download e upload com múltiplos fluxos.
- Exibição da região da Vercel.
- Duração, concorrência, tamanho dos blocos e limites de tráfego configuráveis.
- Aviso do consumo máximo antes do teste e limites rígidos de download/upload.
- Temas claro e escuro, detecção do tema do sistema e preferência salva.
- Interface responsiva para desktop e dispositivos móveis.
- Sem armazenamento persistente dos resultados e sem analytics de terceiros.
- Frontend estático sem etapa de build + Vercel Functions.

## Como funciona

O navegador acessa somente endpoints no mesmo deployment da Vercel:

```text
Browser
  ├─ /api/ping      latência + jitter
  ├─ /api/download  blocos binários
  ├─ /api/upload    blocos POST binários
  └─ /api/info      região do deployment
```

O cliente usa várias requisições pequenas, sujeitas a um limite de tempo e a um orçamento de tráfego. Cada fase termina quando qualquer um desses limites é atingido, permitindo medir throughput com consumo previsível.

## Deploy

Use o botão **Deploy with Vercel** acima. Nenhuma variável de ambiente é necessária.

Também é possível usar a CLI:

```bash
git clone https://github.com/yexing17/vercel-speedtest.git
cd vercel-speedtest
npx vercel
```

## Observações sobre precisão

O projeto mede o caminho entre o navegador do usuário e a infraestrutura da Vercel que atende o deployment atual. Ele não pretende reproduzir exatamente Ookla, Cloudflare Speed Test, testes de laboratório de provedores ou uma medição direta contra um VPS específico. Agendamento do navegador, localização das Functions, cold starts, congestionamento, limites do plano e roteamento da Vercel podem afetar os resultados.

Para resultados mais estáveis, faça vários testes usando as mesmas configurações.

## Uso e tráfego da Vercel

Testes de velocidade transferem uma quantidade significativa de dados. Antes do início, a interface informa os limites máximos de download, upload e tráfego total. O mecanismo aplica esses limites, encerrando cada fase quando o limite de tráfego ou de tempo é atingido.

O perfil padrão permite até **128 MiB de download + 32 MiB de upload = 160 MiB de payload por teste**. O uso real pode ser menor. Operadores de instâncias públicas devem acompanhar o Usage da Vercel e escolher limites adequados ao seu plano.

## Privacidade

O aplicativo não armazena resultados, não exige conta e não inclui analytics de terceiros. Apenas a preferência de tema é armazenada localmente no navegador. A Vercel ainda pode processar metadados normais de requisições como parte da operação da plataforma.

## Contribuindo

Issues e Pull Requests são bem-vindos. Boas áreas para contribuição incluem precisão, acessibilidade, localização, UX móvel, perfis de teste, controles contra abuso e visualização das regiões da Vercel.

## Licença

MIT © yexing17
