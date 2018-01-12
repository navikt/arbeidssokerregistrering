export function hentFornavn(name: string | undefined) {
    return name ? name.split(' ')[0] : '';
}