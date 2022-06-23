import { ExtendedClient } from "../main";

export let name = 'ready';
export let once = true;
export function execute(client: ExtendedClient) {
    console.log('Logged in as ' + client.user.tag);
}