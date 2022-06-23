import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { token } = require('../config.json');
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { Client, Collection, Intents, CacheType, Interaction } from 'discord.js';
import { SlashCommandBuilder } from "@discordjs/builders";

export interface ExtendedClient extends Client {
    commands: Collection<string, CommandModule>
}

export interface CommandModule {
    data: SlashCommandBuilder,
    execute(interaction: Interaction<CacheType>): Promise<void>
}

export interface EventModule {
    name: string,
    once: boolean,
    execute(...args: any): void
}

const client = <ExtendedClient>new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = <CommandModule>await import("file://" + filePath);
	client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = <EventModule>await import("file://" + filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);