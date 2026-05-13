# discord-ts-template

A simple and clean Discord bot template built with TypeScript, discord.js v14, and ESModules.

## Features

- Slash Commands, User Commands and Message Commands support
- Automatic command loading from categorized folders
- Global error handling
- ESModules + TypeScript

## Installation

```bash
git clone https://github.com/yPandinho/discord-ts-template
cd discord-ts-template
npm install
```

## Configuration

Create a `.env` file in the root directory:

```env
TOKEN=your_bot_token_here
```

Then configure `src/config.ts` with your guild IDs and channel IDs.

## Usage

```bash
npm run dev
```

## Project Structure

```
src/
├── commands/
│   ├── admin/
│   └── utility/
│       └── ping.ts
├── handlers/
│   ├── command.ts
│   └── interaction.ts
├── types/
│   └── index.ts
├── config.ts
└── index.ts
```

## License

This project is licensed under the ISC License.