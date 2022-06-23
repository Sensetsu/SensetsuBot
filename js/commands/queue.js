import { SlashCommandBuilder } from '@discordjs/builders';
import { savedGuildData } from '../data.js';
export let data = new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Lists all songs in the queue')
    .setDMPermission(false);
export async function execute(interaction) {
    const queue = savedGuildData.get(interaction.guildId).queue;
    let output = "Queue:";
    for (let i = 0; i < queue.length; i++) {
        output = `${output}\n${i + 1}.) ${queue[i].title}`;
    }
    interaction.reply(output);
}
