import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction, PresenceStatusData } from 'discord.js';

export let data = new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Accesses commands restricted to bot admins')
    .addSubcommand(subcommand => subcommand
        .setName('status')
        .setDescription('Sets the bot\'s status')
        .addStringOption(option => option
            .setName('status')
            .setDescription('The status to use')
            .setRequired(true)
            .setChoices(
                { name: "Online", value: "online" },
                { name: "Idle", value: "idle" },
                { name: "Do Not Disturb", value: "dnd" },
                { name: "Invisible", value: "invisible" }
            )
        )
    )
    .addSubcommand(subcommand => subcommand
        .setName('activity')
        .setDescription('Sets the bot\'s activity presence')
        .addStringOption(option => option
            .setName('activity')
            .setDescription('The name of the activity')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('type')
            .setDescription('The type of activity')
            .setRequired(true)
            .setChoices(
                { name: "Competing", value: "COMPETING" },
                { name: "Listening", value: "LISTENING" },
                { name: "Playing", value: "PLAYING" },
                { name: "Streaming", value: "STREAMING" },
                { name: "Watching", value: "WATCHING" }
            )
        )
    );

export async function execute(interaction: CommandInteraction<CacheType>) {
    if (interaction.options.getSubcommand() === "status") {
        const status = interaction.options.getString("status");
        interaction.client.user.setStatus(<PresenceStatusData>status);
        interaction.reply({ content: "Set the bot's status!", ephemeral: true });
    }
    else if (interaction.options.getSubcommand() === "activity") {
        const activity = interaction.options.getString("activity");
        const type = <any>interaction.options.getString("type");
        interaction.client.user.setActivity(activity, { type });
        interaction.reply({ content: "Set the bot's activity presence!", ephemeral: true });
    }
}