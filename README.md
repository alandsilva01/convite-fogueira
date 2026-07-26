# Encontro de Pais & Filhos - Família P7 Church

Convite interativo estático, otimizado para celular e pronto para Netlify, Vercel ou GitHub Pages.

## Como publicar no Netlify Drop

1. Acesse https://app.netlify.com/drop
2. Arraste esta pasta inteira para a página.
3. Aguarde o Netlify gerar o link público.
4. Envie o link aos convidados.

## Como publicar no GitHub Pages

1. Crie um repositório público no GitHub.
2. Envie `index.html`, `style.css`, `script.js` e a pasta `assets`.
3. Abra **Settings > Pages**.
4. Em **Branch**, selecione `main` e pasta `/ (root)`.
5. Aguarde alguns minutos até o link ficar disponível.

## Ja configurado

- Evento: Encontro de Pais & Filhos.
- Data: 15/08/2026.
- Horário exibido: 18h, sem horário de término na página.
- Local: Família P7 Church, Av. Adriano Bertozzi, 383 - Itaquera, São Paulo - SP, 08265-000.
- Botão de localização: abre Google Maps.
- Botão de confirmação: abre o formulário do Google.
- Botão de agenda: baixa um arquivo `.ics` com início às 18h.
- Musica desativada: existe apenas um template reservado no HTML para audio futuro.
- Imagens locais em `assets/images/`.

## Onde trocar o formulário

Abra `script.js` e altere a constante `FORM_URL` na primeira linha.

## Arquivos principais

- `index.html`: estrutura do convite.
- `style.css`: visual, responsividade e animações.
- `script.js`: links, revelação ao rolar e arquivo de agenda.
- `assets/images/`: logo e fotos do convite.
