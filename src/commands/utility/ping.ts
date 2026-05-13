import { ApplicationCommandType, Client, ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommand } from '../../types/index.js';

export default {
    name: 'ping',
    description: 'Veja o ping do bot!',
    type: ApplicationCommandType.ChatInput,
    
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        await interaction.reply({ content: `🏓 Pong! \`${client.ws.ping}ms\`` });
    },
} satisfies SlashCommand;