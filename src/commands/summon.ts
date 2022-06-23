import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction, GuildMember } from 'discord.js';
import { summonToVoice } from '../voice.js';

export let data = new SlashCommandBuilder().setName('summon').setDescription('Summons the bot to the user\'s current voice channel').setDMPermission(false);

export async function execute(interaction: CommandInteraction<CacheType>) {
    await summonToVoice(interaction);
}