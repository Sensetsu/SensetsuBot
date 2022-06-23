import { SlashCommandBuilder } from '@discordjs/builders';
export let data = new SlashCommandBuilder().setName('serverinfo').setDescription('Replies with server info!');
export async function execute(interaction) {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
}
