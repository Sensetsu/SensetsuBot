import { SlashCommandBuilder } from '@discordjs/builders';
export let data = new SlashCommandBuilder().setName('userinfo').setDescription('Replies with user info!');
export async function execute(interaction) {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
}
