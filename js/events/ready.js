export let name = 'ready';
export let once = true;
export function execute(client) {
    console.log('Logged in as ' + client.user.tag);
}
