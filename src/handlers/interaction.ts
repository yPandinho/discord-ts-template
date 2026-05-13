import { Events, type Interaction } from 'discord.js';
import client from '../index.js';

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = client.slash_commands.get(interaction.commandName);
        if (!command) return;
        return execute(interaction.commandName, () => command.run(client, interaction));
    }

    if (interaction.isUserContextMenuCommand()) {
        const command = client.user_commands.get(interaction.commandName);
        if (!command) return;
        return execute(interaction.commandName, () => command.run(client, interaction))
    }

    if (interaction.isMessageContextMenuCommand()) {
        const command = client.message_commands.get(interaction.commandName);
        if (!command) return;
        return execute(interaction.commandName, () => command.run(client, interaction));
    }
});

async function execute(commandName: string , run: () => Promise<void>): Promise<void> {
    try {
        await run();
    } catch (err) {
        console.error(`[Interaction] Erro ao executar ${commandName}:`, err);
    }
}