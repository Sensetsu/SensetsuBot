import { CommandInteraction, CacheType, GuildMember } from 'discord.js';
import { createAudioPlayer, createAudioResource, VoiceConnection } from '@discordjs/voice';
import { joinVoiceChannel } from '@discordjs/voice';
import { msToHMS, validURL } from './util.js';
import { GetListByKeyword } from 'youtube-search-api';
import { createRequire } from "module";
import { videoInfo } from 'ytdl-core'
const require = createRequire(import.meta.url);
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

export interface Song {
    title: string,
    url: string
}

export async function summonToVoice(interaction: CommandInteraction<CacheType>) {
    const voiceChannel = (<GuildMember>interaction.member).voice.channel;
    if (voiceChannel === null) {
        await interaction.reply({content: "You must be in a voice channel to use this command!", ephemeral: true});
        return false;
    }
    joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator
    });
    await interaction.reply(`Joined ${voiceChannel.name}!`);
    return true;
}

export async function createSong(audio: string): Promise<Song[]> {
    if (!validURL(audio)) {
        const songInfo = await GetListByKeyword(audio);
        return [{
            title: songInfo.items[0].title,
            url: "https://youtube.com/watch?v=" + songInfo.items[0].id
        }];
    }
    else if (audio.includes("&list=") && (audio.includes("youtube.com") || audio.includes("youtu.be"))) {
        const songInfo = await ytpl(audio);;
        let songList: Song[] = [];

        for (let i = songInfo.items.length - 1; i > -1; i--) {
            songList[i] = {
                title: songInfo.items[i].title,
                url: songInfo.items[i].shortUrl
            };
        }

        return songList;
    }
    else if (audio.includes("youtube.com") || audio.includes("youtu.be")) {
        const songInfo = <videoInfo>await ytdl.getInfo(audio);
        return [{
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
        }];
    }
    else {
        return [{ title: "URL", url: audio}]
    }
}

export async function playSong(song: Song, connection: VoiceConnection) {
    let songUrl = song.url;
    if (songUrl.includes("youtube.com") || songUrl.includes("youtu.be")) { songUrl = ytdl(songUrl, { filter: 'audioonly', quality: 'highestaudio'}); }

    const player = createAudioPlayer();
    const resource = createAudioResource(songUrl);
    player.play(resource);
    player.on('error', error => {
        console.error(`Error: ${error.message} with resource ${error.resource.metadata}`);
    });
    connection.subscribe(player);
}