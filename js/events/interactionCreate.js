import { createSavedGuildDataEntry, savedGuildData } from "../data.js";
export let name = 'interactionCreate';
export async function execute(interaction) {
    if (!savedGuildData.has(interaction.guildId))
        savedGuildData.set(interaction.guildId, createSavedGuildDataEntry());
    if (!interaction.isCommand())
        return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command)
        return;
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}
