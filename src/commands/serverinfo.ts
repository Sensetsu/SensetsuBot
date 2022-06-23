import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction } from 'discord.js';

export let data = new SlashCommandBuilder().setName('serverinfo').setDescription('Replies with server info!');

export async function execute(interaction: CommandInteraction<CacheType>) {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
}