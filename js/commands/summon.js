import { SlashCommandBuilder } from '@discordjs/builders';
import { summonToVoice } from '../voice.js';
export let data = new SlashCommandBuilder().setName('summon').setDescription('Summons the bot to the user\'s current voice channel').setDMPermission(false);
export async function execute(interaction) {
    await summonToVoice(interaction);
}
