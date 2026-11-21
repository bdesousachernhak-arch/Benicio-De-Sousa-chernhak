# Video Vendas

Aplicativo Android em português para preparar projetos de vídeos promocionais de qualquer produto. Interface minimalista construída com React Native e Expo.

## O que já funciona

- Tela inicial responsiva em português.
- Campo para nome ou link do produto.
- Seleção de até cinco imagens da galeria.
- Opções de estilo (Oferta, Review e Unboxing) e duração (15, 30 ou 60 segundos).
- Validação básica e resumo do projeto criado.

## Rodar no Android

1. Instale o **Expo Go** no celular pela Play Store.
2. Instale Node.js em um computador e clone este repositório.
3. No terminal, dentro da pasta do projeto, rode:

   ```bash
   npm install
   npx expo start
   ```

4. Com o computador e o celular na mesma rede Wi-Fi, leia o QR code exibido pelo terminal com o Expo Go.

## Importante

Esta é a primeira versão da interface e do fluxo de criação. O botão prepara um resumo do projeto, mas **ainda não renderiza nem exporta um vídeo MP4**. Para isso, será necessário integrar um serviço de geração/edição de vídeo, narração e armazenamento. A extração automática de dados de links de produtos também depende de uma integração autorizada com a plataforma correspondente.
