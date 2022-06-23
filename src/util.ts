export function msToHMS(ms: number) {
    // 1- Convert to seconds:
    let seconds = Math.round(ms / 1000);
    // 2- Extract hours:
    let hours = Math.floor(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    let minutes = Math.floor(seconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    let minutes_str = minutes.toString();
    let seconds_str = seconds.toString();
    if (minutes < 10) { minutes_str = "0" + minutes_str; }
    if (seconds < 10) { seconds_str = "0" + seconds_str; }

    return hours + ":" + minutes_str + ":" + seconds_str;
}

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function validURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

export function validImageURL(str: string) {
    if (!validURL(str))
        return false;

    let shortext = str.slice(-4);
    let longext = str.slice(-5);
    let extlist = [".png", ".jpg", ".jpeg", ".gif", ".bmp"];

    for (let i = 0; i < extlist.length; i++) {
        if (shortext == extlist[i] || longext == extlist[i])
            return true;
    }

    return false;
}