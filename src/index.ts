// Template Discord Bot
// Developed by yPandinho

import 'dotenv/config';
import { ActivityType, Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { channels } from './config.js';
import type { SlashCommand, UserCommand, MessageCommand } from './types/index.js';
import { loadCommands } from './handlers/command.js';
import './handlers/interaction.js';

const client = new Client({ intents: Object.values(GatewayIntentBits) as number[] });
client.slash_commands = new Collection<string, SlashCommand>();
client.user_commands = new Collection<string, UserCommand>();
client.message_commands = new Collection<string, MessageCommand>();

export default client;

client.once(Events.ClientReady, async () => {
    await loadCommands(client);
    client.user!.setPresence({ activities: [{ name: 'by yPandinho', type: ActivityType.Playing }], status: 'online' });
    console.log(`[Bot] Online como ${client.user!.username}`);
});

process.on('unhandledRejection', (err) => sendError('unhandledRejection', err));
process.on('uncaughtException', (err) => sendError('uncaughtException', err));
client.on('error', (err) => sendError('clientError', err));

function sendError(label: string, error: unknown): void {
    console.error(`[${label}]`, error);
    const channel = client.channels.cache.get(channels.error);
    if (!channel || !('send' in channel)) return;
    channel.send({ content: `${error}` }).catch(console.error);
}

client.login(process.env.TOKEN);
