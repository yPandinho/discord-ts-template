import { ApplicationCommandType, Client, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { SlashCommand, UserCommand, MessageCommand } from '../types/index.js';
import { guilds } from '../config.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

export async function loadCommands(client: Client): Promise<void> {
    const commandsPath = join(__dirname, '../commands');
    const categories = readdirSync(commandsPath);
    const commandsData = [];

    for (const category of categories) {
        const categoryPath = join(commandsPath, category);
        const files = readdirSync(categoryPath).filter(f => f.endsWith('.js'));

        for (const file of files) {
            const module = await import(`${categoryPath}/${file}`);
            const command: SlashCommand | UserCommand | MessageCommand = module.default;

            if ('options' in command || command.type === ApplicationCommandType.ChatInput) {
                client.slash_commands.set(command.name, command as SlashCommand);
            } else if (command.type === ApplicationCommandType.User) {
                client.user_commands.set(command.name, command as UserCommand);
            } else if (command.type === ApplicationCommandType.Message) {
                client.message_commands.set(command.name, command as MessageCommand);
            }

            const { run, ...data } = command;
            commandsData.push(data);
        }
    }

    const rest = new REST().setToken(process.env.TOKEN!);

    for (const guildId of guilds) {
        await rest.put(
            Routes.applicationGuildCommands(client.user!.id, guildId),
            { body: commandsData },
        );
        console.log(`[Commands] Registrados na guilda ${guildId}`);
    }
}