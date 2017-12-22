export function hentValgteAlternativ() {
    return Array.from(document.getElementsByName(`alternativ`) as NodeListOf<HTMLInputElement>)
        .reduce((acc, curr, i) => curr.checked ? (i + 1).toString() : acc, '-1');
}

export function uncheckRadioButtons() {
    Array.from(document.getElementsByName(`alternativ`) as NodeListOf<HTMLInputElement>)
        .forEach(input => input.checked = false);
}

/*
* ConfigSpmPrSide
* key = sideurl
* value = sporsmål id
* */
export const configSpmPrSide = {
    1: ['1'],
    2: ['2', '3', '4'],
    3: ['5']
};