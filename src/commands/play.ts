import { SlashCommandBuilder } from '@discordjs/builders';
import { getVoiceConnection } from '@discordjs/voice';
import { CacheType, CommandInteraction, GuildMember } from 'discord.js';
import { savedGuildData } from '../data.js';
import { summonToVoice, createSong, playSong } from '../voice.js';

export let data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays the specified audio')
    .setDMPermission(false)
    .addStringOption(option => option
        .setName("audio")
        .setDescription("The audio to be played; Can be a direct URL, YouTube video/playlist link, or YouTube search query")
        .setRequired(true)
    );

export async function execute(interaction: CommandInteraction<CacheType>) {
    const audio = interaction.options.getString("audio");
    let summoned = false;
    let connection = getVoiceConnection(interaction.guildId);
    if (!connection) {
        if (!await summonToVoice(interaction)) return;
        connection = getVoiceConnection(interaction.guildId);
        summoned = true;
    }
    else await interaction.deferReply();
    
    const songs = await createSong(audio);
    const savedData = savedGuildData.get(interaction.guildId);
    savedData.queue = savedData.queue.concat(songs);
    await playSong(savedData.queue[0], connection);

    let reply = `Added to queue: ${songs[0].title}`;
    if (songs.length > 1) reply = `Added ${songs.length} songs to queue`;

    if (summoned) {
        await interaction.followUp(reply);
    }
    else {
        await interaction.editReply(reply);
    }
}