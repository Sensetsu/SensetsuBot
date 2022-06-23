import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction } from 'discord.js';

export let data = new SlashCommandBuilder().setName('userinfo').setDescription('Replies with user info!');

export async function execute(interaction: CommandInteraction<CacheType>) {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
}