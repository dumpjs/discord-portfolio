# Portfólio Discord

Um site de portfólio **moderno, bonito e dinâmico**, exibindo seu status do Discord em tempo real, atividades atuais e informações profissionais.  
Desenvolvido com **Next.js**, **TailwindCSS** e a **API Lanyard**.

![Prévia](https://imgur.com/a/h0aakUJ)

## ✨ Recursos

- 🎮 Integração em tempo real com seu status do Discord
- 🎵 Exibição da música atual do Spotify
- 🎯 Monitoramento de atividades em jogos
- 💻 Vitrine de habilidades personalizável
- ☁️ Seção de experiência em plataformas de nuvem
- 🌙 Otimizado para modo escuro
- 🎨 Animações e transições suaves
- 📱 Design 100% responsivo

---

## 🚀 Primeiros Passos

1. Clone o repositório:
```bash
git clone https://github.com/dumpjs/discord-portfolio.git
cd discord-portfolio
```

2. Instale as dependências:
```bash
npm install
```

3. Crie seu arquivo de ambiente:
```bash
cp .env.example .env
```

4. Configure suas variáveis no `.env`:
```env
# ID do seu usuário Discord
NEXT_PUBLIC_DISCORD_ID="seu_id_do_discord"

# Informações pessoais
NEXT_PUBLIC_NAME="Seu Nome"
NEXT_PUBLIC_BIO="Sua descrição ou bio"

# Links sociais
NEXT_PUBLIC_GITHUB_URL="https://github.com/seuusuario"
NEXT_PUBLIC_DISCORD_URL="https://discord.com/users/seu_id_do_discord"

# Suas habilidades (separadas por vírgula)
NEXT_PUBLIC_SKILLS="React,TypeScript,Node.js"

# Plataformas de nuvem (separadas por vírgula)
NEXT_PUBLIC_PLATFORMS="AWS,Azure,Google Cloud"
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## ⚙️ Configurações de Ambiente

### ID do Discord
Para obter seu ID:
1. Abra o Discord
2. Acesse Configurações > Avançado
3. Ative o Modo Desenvolvedor
4. Clique com o botão direito no seu perfil e selecione **"Copiar ID"**

### Habilidades (Skills)
Liste suas habilidades separadas por vírgula. Algumas suportadas:
- React
- JavaScript
- TypeScript
- Node.js
- Python
- C#
- Next.js
- TailwindCSS
- Vue.js
- Angular
- Java
- PHP
- Go
- Ruby
- Rust
- Docker

### Plataformas de Nuvem
Liste sua experiência em plataformas de nuvem:
- AWS
- Azure
- Google Cloud
- Vercel
- DigitalOcean
- Heroku

---

## 🎨 Personalização

### Adicionar novas habilidades
Atualize o `iconMap` e o `colorMap` no arquivo `lib/config.ts`:

```typescript
const iconMap: { [key: string]: string } = {
  'SuaHabilidade': 'SiSuaHabilidade',
  // ...
};

const colorMap: { [key: string]: string } = {
  'SuaHabilidade': '#HEXCOLOR',
  // ...
};
```

### Adicionar novas plataformas
Atualize o `serviceMap`, `iconMap` e `colorMap` em `lib/config.ts`:

```typescript
const serviceMap: { [key: string]: string[] } = {
  'SuaPlataforma': ['Serviço 1', 'Serviço 2'],
  // ...
};
```

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas!  
Sinta-se à vontade para abrir uma Pull Request.

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🙌 Agradecimentos

- [API Lanyard](https://github.com/Phineas/lanyard) — integração com status do Discord
- [TailwindCSS](https://tailwindcss.com) — estilização moderna
- [Framer Motion](https://www.framer.com/motion/) — animações fluidas
- [shadcn/ui](https://ui.shadcn.com) — componentes de interface
- [lanyard](https://api.lanyard.rest/) — API Lanyard (TEM QUE ESTAR NO SERVIDOR: https://discord.gg/Es4Kunk7Gf PARA FUNCIONAR!)
