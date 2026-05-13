import type { ApplicationCommandType, Client, Collection, ChatInputCommandInteraction, UserContextMenuCommandInteraction, MessageContextMenuCommandInteraction } from 'discord.js';

export interface SlashCommand {
    name: string;
    description: string;
    type: ApplicationCommandType.ChatInput,
    options?: any[];
    run : (client: Client, interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface UserCommand {
    name: string;
    type: ApplicationCommandType.User;
    run: (client: Client, interaction: UserContextMenuCommandInteraction) => Promise<void>;
}

export interface MessageCommand {
    name: string;
    type: ApplicationCommandType.Message;
    run: (client: Client, interaction: MessageContextMenuCommandInteraction) => Promise<void>;
}

declare module 'discord.js' {
    interface Client {
        slash_commands: Collection<string, SlashCommand>;
        user_commands: Collection<string, UserCommand>;
        message_commands: Collection<string, MessageCommand>;
    }
}