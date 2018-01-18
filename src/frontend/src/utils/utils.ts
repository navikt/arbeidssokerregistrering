export function hentFornavn(name: string | undefined) {
    return name ? name.split(' ')[0] : '';
}

export function getIntlMessage(messages: { [id: string]: string }, id: string): string {
    return messages[id] || id;
}