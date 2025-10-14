# 🎯 killtarget.ai

> AI-powered World of Warcraft arena kill target analyzer

**killtarget.ai** helps World of Warcraft arena players make strategic decisions by analyzing team compositions and recommending optimal kill targets with detailed tactical reasoning.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Mantine](https://img.shields.io/badge/Mantine-8.3.0-339af0)

## ✨ Features

- **🤖 AI-Powered Analysis**: Uses advanced language models to analyze arena compositions
- **📊 Strategic Recommendations**: Get detailed kill target suggestions with tactical reasoning
- **🎮 Multi-Bracket Support**: Supports 2v2 and 3v3 arena formats
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🌙 Dark/Light Mode**: Toggle between themes for optimal viewing
- **⚡ Real-time Processing**: Fast analysis using modern AI infrastructure

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Framework**: Mantine UI with custom components
- **AI Integration**: LangChain with Groq (Llama 3.1)
- **Styling**: CSS Modules with responsive design
- **Package Manager**: pnpm
- **Build Tools**: Turbopack for fast development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Groq API key (free tier available)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/killtargetai.git
   cd killtargetai
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env.local file
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

1. **Select Game Mode**: Choose between 2v2 or 3v3 arena format
2. **Build Your Team**: Select your class and specialization
3. **Add Teammates**: Choose your partners' classes and specs
4. **Set Opponents**: Input the enemy team composition
5. **Get Analysis**: Review your setup and submit for AI analysis
6. **View Results**: Receive detailed kill target recommendation with strategic reasoning

## 🧠 AI Analysis

The AI considers multiple factors when recommending kill targets:

- **Survivability**: Defensive cooldowns, self-healing, mobility
- **Threat Level**: Damage potential and crowd control abilities
- **Role Priority**: Strategic importance (healers > DPS > tanks)
- **Team Synergy**: How well targets work with their teammates
- **Meta Considerations**: Current patch strength and matchups
- **Your Team's Strengths**: What your composition counters effectively

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   │   ├── agent.ts       # AI analysis logic
│   │   └── setup/         # Setup data processing
│   ├── setup/             # Setup flow pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js configuration
- CSS Modules for component styling
- Consistent naming conventions

## 🚀 Deployment

The app is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📡 API Reference

### POST /api/setup

Analyzes team composition and returns kill target recommendation.

**Request Body:**

```typescript
{
  gameMode: GameMode,
  player: Player,
  teammates: Player[],
  opponents: Player[]
}
```

**Response:**

```typescript
{
  target: {
    class: string,
    spec: string,
    reasoning: string
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

This is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

## 🙏 Acknowledgments

- World of Warcraft community for strategic insights
- Groq for providing excellent AI infrastructure
- Mantine team for the beautiful UI components
- Next.js team for the amazing framework

## 📞 Support

For support, questions, or feature requests:

- Open an issue on GitHub
- Contact: [your-email@example.com]

---

Made with ❤️ for the WoW arena community
